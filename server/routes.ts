import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Handle OPTIONS requests for CORS preflight
  app.options("/api/contact", (req, res) => {
    res.status(200).end();
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const sanitizedData = {
        name: validatedData.name.trim().slice(0, 100),
        email: validatedData.email.trim().toLowerCase().slice(0, 100),
        phone: validatedData.phone.replace(/[^\d+\-\s()]/g, '').slice(0, 20),
        subject: validatedData.subject.trim().slice(0, 50),
        message: validatedData.message.trim().slice(0, 1000),
      };
      const message = await storage.createContactMessage(sanitizedData);
      res.status(201).json({ success: true, id: message.id });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ success: false, error: "Invalid form data" });
    }
  });

  return httpServer;
}
