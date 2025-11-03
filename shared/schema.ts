import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const therapistProfiles = pgTable("therapist_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  homeBase: text("home_base").notNull(),
  experience: integer("experience").notNull(),
  techniques: jsonb("techniques").$type<string[]>().notNull(),
  amenities: jsonb("amenities").$type<string[]>().notNull(),
  affiliations: jsonb("affiliations").$type<string[]>().notNull(),
  availability: text("availability").notNull(),
  services: text("services").notNull(),
  gallery: jsonb("gallery").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const travelSchedule = pgTable("travel_schedule", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  therapistId: varchar("therapist_id").references(() => therapistProfiles.id).notNull(),
  location: text("location").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isCurrent: integer("is_current").notNull().default(0),
}, (table) => ({
  therapistScheduleIdx: index('idx_therapist_schedule').on(table.therapistId),
}));

export const pricing = pgTable("pricing", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  therapistId: varchar("therapist_id").references(() => therapistProfiles.id).notNull(),
  duration: integer("duration").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  isRecommended: integer("is_recommended").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  therapistId: varchar("therapist_id").references(() => therapistProfiles.id).notNull(),
  clientInitials: text("client_initials").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  serviceType: text("service_type").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
}, (table) => ({
  therapistTestimonialsIdx: index('idx_therapist_testimonials').on(table.therapistId),
}));

export const specials = pgTable("specials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  therapistId: varchar("therapist_id").references(() => therapistProfiles.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  validUntil: timestamp("valid_until").notNull(),
  isActive: integer("is_active").notNull().default(1),
}, (table) => ({
  therapistSpecialsIdx: index('idx_therapist_specials').on(table.therapistId),
}));

export const insertTherapistProfileSchema = createInsertSchema(therapistProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertTravelScheduleSchema = createInsertSchema(travelSchedule).omit({
  id: true,
});

export const insertPricingSchema = createInsertSchema(pricing).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertSpecialSchema = createInsertSchema(specials).omit({
  id: true,
});

export type InsertTherapistProfile = z.infer<typeof insertTherapistProfileSchema>;
export type InsertTravelSchedule = z.infer<typeof insertTravelScheduleSchema>;
export type InsertPricing = z.infer<typeof insertPricingSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertSpecial = z.infer<typeof insertSpecialSchema>;

export type TherapistProfile = typeof therapistProfiles.$inferSelect;
export type TravelSchedule = typeof travelSchedule.$inferSelect;
export type Pricing = typeof pricing.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Special = typeof specials.$inferSelect;
