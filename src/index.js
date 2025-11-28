const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs").promises;
const input = require("./utils/input.js");
const dotenv = require("dotenv").config({ path: "configuration files/.env" });
const TARGET_CHANNEL = process.env.TARGET_CHANNEL;
const keywords = require("./utils/keywords.js");
const { sendToChannel } = require("./utils/sendToChannel");
const { SearchGroups } = require("./utils/search");

(async () => {
  const SESSION_FILE = process.env.SESSION_FILE;
  let stringSession = new StringSession(process.env.SESSION || "");

  // Load session from file if available
  try {
    const savedSession = await fs.readFile(SESSION_FILE, "utf8");
    stringSession = new StringSession(savedSession);
  } catch (e) {
    console.log("Session file not found (new login required)");
  }

  const client = new TelegramClient(
    stringSession,
    parseInt(process.env.API_ID, 10),
    process.env.API_HASH,
    { connectionRetries: 5 }
  );

  // Login
  console.log("🔗 Connecting to Telegram... 🔗");
  await client.start({
    phoneNumber: async () => process.env.PHONE_NUMBER,
    password: async () => "",
    phoneCode: async () => {
      console.log("\n📲 Check Telegram for the 5-digit login code.");
      return await input.text("Enter code: ");
    },
    onError: (err) => {
      console.error("💥 Login failed:", err.message);
      process.exit(1);
    },
  });

  // Save session
  const newSession = client.session.save();
  if (typeof newSession === "string") {
    await fs.writeFile(SESSION_FILE, newSession);
    console.log(
      `✅ Session saved. Logged in as: ${(await client.getMe()).username}`
    );
  } else {
    console.error("❌ Failed to save session.");
  }
  try {
    await client.sendMessage(TARGET_CHANNEL, {
      message: "start",
    });
  } catch (e) {
    console.error(e);
  }

  await SearchGroups(client, keywords, Api);

  await client.disconnect();
  console.log("👋 Session closed. Good luck with your purchases!");
})();
