import { config } from "dotenv";
config();

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { type Newsletter, type InsertNewsletter, type Consultation, type InsertConsultation, newsletters, consultations } from "@shared/schema";
import { type IStorage } from "./storage";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export class DatabaseStorage implements IStorage {
  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const result = await db.select().from(newsletters).where(eq(newsletters.email, email)).limit(1);
    return result[0];
  }

  async createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const result = await db.insert(newsletters).values({
      ...newsletter,
      subscribed: true,
      createdAt: new Date()
    }).returning();
    return result[0];
  }

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const result = await db.insert(consultations).values({
      ...consultation,
      status: "pending",
      createdAt: new Date()
    }).returning();
    return result[0];
  }

  async getConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations).orderBy(consultations.createdAt);
  }
}