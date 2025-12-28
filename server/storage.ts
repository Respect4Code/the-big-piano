import { db } from "./db";
import {
  songs,
  type Song,
  type InsertSong
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSongs(): Promise<Song[]>;
  getSong(id: number): Promise<Song | undefined>;
  createSong(song: InsertSong): Promise<Song>;
}

export class DatabaseStorage implements IStorage {
  async getSongs(): Promise<Song[]> {
    return await db.select().from(songs);
  }

  async getSong(id: number): Promise<Song | undefined> {
    const [song] = await db.select().from(songs).where(eq(songs.id, id));
    return song;
  }

  async createSong(insertSong: InsertSong): Promise<Song> {
    const [song] = await db.insert(songs).values(insertSong).returning();
    return song;
  }
}

export const storage = new DatabaseStorage();
