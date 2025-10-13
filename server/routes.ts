import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { youtubeRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/youtube/fetch", async (req, res) => {
    try {
      const { url } = youtubeRequestSchema.parse(req.body);
      
      const apiUrl = `https://yt-dl.officialhectormanuel.workers.dev/?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: "Failed to fetch video data" 
        });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid request" 
      });
    }
  });

  app.post("/api/download-history", async (req, res) => {
    try {
      const historyItem = await storage.addDownloadHistory({
        title: req.body.title,
        thumbnail: req.body.thumbnail,
        quality: req.body.quality,
        downloadUrl: req.body.downloadUrl,
        timestamp: Date.now(),
      });
      res.json(historyItem);
    } catch (error) {
      console.error("Error adding to download history:", error);
      res.status(500).json({ error: "Failed to add to history" });
    }
  });

  app.get("/api/download-history", async (_req, res) => {
    try {
      const history = await storage.getDownloadHistory();
      res.json(history);
    } catch (error) {
      console.error("Error fetching download history:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  app.delete("/api/download-history", async (_req, res) => {
    try {
      await storage.clearDownloadHistory();
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing download history:", error);
      res.status(500).json({ error: "Failed to clear history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
