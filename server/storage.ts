import { type DownloadHistoryItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  addDownloadHistory(item: Omit<DownloadHistoryItem, 'id'>): Promise<DownloadHistoryItem>;
  getDownloadHistory(): Promise<DownloadHistoryItem[]>;
  clearDownloadHistory(): Promise<void>;
}

export class MemStorage implements IStorage {
  private downloadHistory: Map<string, DownloadHistoryItem>;

  constructor() {
    this.downloadHistory = new Map();
  }

  async addDownloadHistory(item: Omit<DownloadHistoryItem, 'id'>): Promise<DownloadHistoryItem> {
    const id = randomUUID();
    const historyItem: DownloadHistoryItem = { ...item, id };
    this.downloadHistory.set(id, historyItem);
    return historyItem;
  }

  async getDownloadHistory(): Promise<DownloadHistoryItem[]> {
    return Array.from(this.downloadHistory.values()).sort((a, b) => b.timestamp - a.timestamp);
  }

  async clearDownloadHistory(): Promise<void> {
    this.downloadHistory.clear();
  }
}

export const storage = new MemStorage();
