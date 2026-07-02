import { AppDataSource } from "../config/data-source";
import { Channels } from "../entities/Channels";

export class ChannelService {
  private channelRepository = AppDataSource.getRepository(Channels);

  async saveMultipleChannels(
    channels: Array<{
      channelId: string;
      username: string | null;
      title: string;
    }>,
  ): Promise<void> {
    for (const channel of channels) {
      try {
        let existing = await this.channelRepository.findOne({
          where: { channelId: channel.channelId },
        });

        if (existing) {
          existing.username = channel.username;
          existing.title = channel.title;
          await this.channelRepository.save(existing);
        } else {
          const newChannel = this.channelRepository.create(channel);
          await this.channelRepository.save(newChannel);
        }
      } catch (error) {
        console.error(`Failed to save channel ${channel.channelId}:`, error);
      }
    }
  }
}
