import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { Api } from "telegram/tl";
import * as input from "input";

export class TelegramService {
  private client: TelegramClient;
  private apiId: number;
  private apiHash: string;
  private sessionString: string;

  constructor() {
    this.apiId = parseInt(process.env.TELEGRAM_API_ID || "0", 10);
    this.apiHash = process.env.TELEGRAM_API_HASH || "";
    this.sessionString = process.env.TELEGRAM_SESSION || "";

    const stringSession = new StringSession(this.sessionString);
    this.client = new TelegramClient(stringSession, this.apiId, this.apiHash, {
      connectionRetries: 5,
    });
  }

  async initialize(): Promise<void> {
    if (!this.sessionString) {
      await this.client.start({
        phoneNumber: async () => await input.text("Enter your phone number: "),
        phoneCode: async () =>
          await input.text("Enter the code you received: "),
        password: async () => await input.text("Enter your 2FA password: "),
        onError: (err) => console.error(err),
      });
      console.log("Session generated successfully!");
      console.log("Your Session String:", this.client.session.save());
    } else {
      await this.client.connect();
      console.log(
        "Telegram Client connected securely using stored session. 🤖",
      );
    }
  }

  async searchChannels(
    query: string,
  ): Promise<
    Array<{ channelId: string; username: string | null; title: string }>
  > {
    try {
      const result = await this.client.invoke(
        new Api.contacts.Search({
          q: query,
          limit: 50,
        }),
      );

      const channelsList: Array<{
        channelId: string;
        username: string | null;
        title: string;
      }> = [];

      if (result && result.chats) {
        for (const chat of result.chats) {
          if (chat instanceof Api.Channel) {
            channelsList.push({
              channelId: chat.id.toString(),
              username: chat.username || null,
              title: chat.title || "No Title",
            });
          }
        }
      }

      return channelsList;
    } catch (error) {
      console.error("Telegram Search API Error:", error);
      throw error;
    }
  }
}
