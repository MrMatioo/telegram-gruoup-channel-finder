const { sendToChannel } = require("./sendToChannel");
const TARGET_CHANNEL = process.env.TARGET_CHANNEL;

async function SearchGroups(client, keywords, Api) {
  for (const keyword of keywords) {
    console.log(`\n🔍 Searching for: "${keyword}"`);
    try {
      const res = await client.invoke(
        new Api.contacts.Search({ q: keyword, limit: 20 })
      );

      for (const chat of res.chats || []) {
        // Filter for public channels with username
        if (!chat.className === "Chat" || !chat.username) continue;

        try {
          const full = await client.invoke(
            new Api.channels.GetFullChannel({ channel: chat })
          );

          const members = full.fullChat.participantsCount || 0;

          // Simplified scoring logic (Removed inaccurate lastPostTs/daysAgo logic)
          let score = 0;
          if (members <= 25) score += 60;
          if (full.fullChat.about === "گروه") score += 20; // Simple check for description
          if (full.fullChat.adminsCount > 1) score += 20;

          if (score >= 10) {
            const jsn = {
              title: chat.title,
              username: `@${chat.username}`,
              members: members,
              score: score,
            };
          }
          await sendToChannel(client, TARGET_CHANNEL, full, score);
        } catch (e) {
          // Skip errors (e.g., private/deleted channels, or API errors on GetFullChannel)
          console.warn(
            `⚠️ Error processing channel: ${chat.title || "Unknown"}. Error: ${
              e.message
            }`
          );
        }

        await new Promise((r) => setTimeout(r, 1000)); // Avoid flood wait
      }
    } catch (e) {
      console.warn(`⚠️ Skipped search for "${keyword}". Error: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
}

module.exports = { SearchGroups };
console.log(typeof SearchGroups);
