import { Request, Response } from "express";
import { TelegramService } from "../services/telegram.services";
import { CacheService } from "../services/cache.service";
import { ChannelService } from "../services/ChannelService";
import { AppDataSource } from "../config/data-source";
import { Channels } from "../entities/Channels";

export class SearchController {
  private telegramService: TelegramService;
  private cacheService: CacheService;
  private channelService: ChannelService;
  private channelRepository = AppDataSource.getRepository(Channels);

  constructor(telegramService: TelegramService) {
    this.telegramService = telegramService;
    this.cacheService = new CacheService();
    this.channelService = new ChannelService();
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;

      if (!query || query.trim() === "") {
        res.status(400).json({ error: "Query parameter 'q' is required" });
        return;
      }

      const keyword = query.trim().toLowerCase();
      const isCached = await this.cacheService.isKeywordCached(keyword);

      if (isCached) {
        const localChannels = await this.channelRepository
          .createQueryBuilder("channel")
          .where(
            "LOWER(channel.username) LIKE :keyword OR LOWER(channel.title) LIKE :keyword",
            { keyword: `%${keyword}%` },
          )
          .getMany();

        res.json({
          source: "cache",
          count: localChannels.length,
          results: localChannels,
        });
        return;
      }

      const telegramChannels =
        await this.telegramService.searchChannels(keyword);

      if (telegramChannels.length > 0) {
        await this.channelService.saveMultipleChannels(telegramChannels);
      }
      await this.cacheService.saveKeyword(keyword, telegramChannels.length);

      res.json({
        source: "telegram_api",
        count: telegramChannels.length,
        results: telegramChannels,
      });
    } catch (error: any) {
      console.error("Search Handler Exception:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
}
