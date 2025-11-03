import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import { CustomError } from './types/errors.ts';
import { logger } from './utils/logger.ts';
import { cache } from './utils/cache.ts';

export async function registerRoutes(app: Express): Promise<Server> {
  // Get therapist profile with all related data
  app.get("/api/therapist/:id", cache(300), async (req, res) => {
    try {
      const { id } = req.params;
      
      const profile = await storage.getTherapistProfile(id);
      if (!profile) {
        return res.status(404).json({ message: "Therapist not found" });
      }

      const [travelSchedule, pricing, testimonials, specials] = await Promise.all([
        storage.getTravelSchedule(id),
        storage.getPricing(id),
        storage.getTestimonials(id),
        storage.getSpecials(id),
      ]);

      res.json({
        profile,
        travelSchedule,
        pricing,
        testimonials,
        specials,
      });
    } catch (error) {
      logger.error('Error fetching therapist profile:', error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get testimonials for a therapist
  app.get("/api/therapist/:id/testimonials", async (req, res) => {
    try {
      const { id } = req.params;
      const testimonials = await storage.getTestimonials(id);
      res.json(testimonials);
    } catch (error) {
      logger.error('Error fetching testimonials:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
