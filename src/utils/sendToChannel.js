const { message } = require("telegram/client");

module.exports.sendToChannel = async function (
  client,
  targetChannel,
  fullObject,
  score
) {
  if (!client || !targetChannel) {
    console.error("Client or Target channel is not set.");
    return;
  }

  // Extract title and username from the internal chats array
  const channelInfo = fullObject.chats ? fullObject.chats[0] : null;

  if (!channelInfo || !channelInfo.title || !channelInfo.username) {
    console.warn(
      "⚠️ Cannot send: Channel info (title/username) is missing in the 'full' object."
    );
    return;
  }

  try {
    await client.sendMessage(targetChannel, {
      message: `Title: ${channelInfo.title} \nUsername: @${channelInfo.username}\n ${score}`,
    });

    console.log(
      `✅ A new group (${channelInfo.title}) sent to ${targetChannel}`
    );
  } catch (err) {
    // Log the full error object for definitive troubleshooting
    console.error(
      "❌ Cannot send message to channel (API Error). Full Error:",
      err
    );
  }
};
