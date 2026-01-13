import type { Express } from "express";
import type { Server } from "http";
import express from "express";
import path from "path";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // This app is frontend-only - recordings are stored in IndexedDB
  // No API routes needed for the core functionality
  
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Serve static HTML pages from public folder
  const publicPath = path.resolve(process.cwd(), "public");
  app.use(express.static(publicPath));

  return httpServer;
}
