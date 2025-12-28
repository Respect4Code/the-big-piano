import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.songs.list.path, async (req, res) => {
    const songs = await storage.getSongs();
    res.json(songs);
  });

  app.get(api.songs.get.path, async (req, res) => {
    const song = await storage.getSong(Number(req.params.id));
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  });

  app.post(api.songs.create.path, async (req, res) => {
    try {
      const input = api.songs.create.input.parse(req.body);
      const song = await storage.createSong(input);
      res.status(201).json(song);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  return httpServer;
}
