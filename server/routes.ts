import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema, insertConsultationSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }
      const newsletterData = result.data;
      
      // Check if email already exists
      const existing = await storage.getNewsletterByEmail(newsletterData.email);
      if (existing) {
        return res.status(400).json({ message: "Email già registrata nella newsletter" });
      }

      const newsletter = await storage.createNewsletter(newsletterData);
      res.json({ message: "Iscrizione completata con successo!", newsletter });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Errore durante l'iscrizione" });
    }
  });

  // Consultation request endpoint
  app.post("/api/consultation", async (req, res) => {
    try {
      const result = insertConsultationSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }
      const consultationData = result.data;
      
      const consultation = await storage.createConsultation(consultationData);
      res.json({ message: "Richiesta di consulenza inviata con successo!", consultation });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Errore durante l'invio della richiesta" });
    }
  });

  // Get consultations (admin endpoint)
  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getConsultations();
      res.json(consultations);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Errore nel recupero delle consulenze" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
