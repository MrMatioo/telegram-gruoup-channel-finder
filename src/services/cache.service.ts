import { AppDataSource } from "../config/data-source";
import { Keywords } from "../entities/Keywords";

export class CacheService {
  private keywordRepository = AppDataSource.getRepository(Keywords);

  async isKeywordCached(keyword: string): Promise<boolean> {
    const cleanedKeyword = keyword.trim().toLowerCase();
    const found = await this.keywordRepository.findOne({
      where: { keyword: cleanedKeyword },
    });
    return !!found;
  }

  async saveKeyword(keyword: string, count: number): Promise<Keywords> {
    const cleanedKeyword = keyword.trim().toLowerCase();

    let cachedItem = await this.keywordRepository.findOne({
      where: { keyword: cleanedKeyword },
    });
    if (cachedItem) {
      cachedItem.resultCount = count;
      return await this.keywordRepository.save(cachedItem);
    }

    const newItem = this.keywordRepository.create({
      keyword: cleanedKeyword,
      resultCount: count,
    });
    return await this.keywordRepository.save(newItem);
  }
}
