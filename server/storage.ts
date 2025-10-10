import { 
  type TherapistProfile, 
  type InsertTherapistProfile,
  type TravelSchedule,
  type InsertTravelSchedule,
  type Pricing,
  type InsertPricing,
  type Testimonial,
  type InsertTestimonial,
  type Special,
  type InsertSpecial
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Therapist Profiles
  getTherapistProfile(id: string): Promise<TherapistProfile | undefined>;
  createTherapistProfile(profile: InsertTherapistProfile): Promise<TherapistProfile>;
  
  // Travel Schedule
  getTravelSchedule(therapistId: string): Promise<TravelSchedule[]>;
  createTravelSchedule(schedule: InsertTravelSchedule): Promise<TravelSchedule>;
  
  // Pricing
  getPricing(therapistId: string): Promise<Pricing[]>;
  createPricing(pricing: InsertPricing): Promise<Pricing>;
  
  // Testimonials
  getTestimonials(therapistId: string): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Specials
  getSpecials(therapistId: string): Promise<Special[]>;
  createSpecial(special: InsertSpecial): Promise<Special>;
}

export class MemStorage implements IStorage {
  private therapistProfiles: Map<string, TherapistProfile>;
  private travelSchedules: Map<string, TravelSchedule>;
  private pricings: Map<string, Pricing>;
  private testimonials: Map<string, Testimonial>;
  private specials: Map<string, Special>;

  constructor() {
    this.therapistProfiles = new Map();
    this.travelSchedules = new Map();
    this.pricings = new Map();
    this.testimonials = new Map();
    this.specials = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Create Bruno's profile
    const brunoId = "bruno-massage-therapist";
    const bruno: TherapistProfile = {
      id: brunoId,
      name: "Male Massage by Bruno",
      title: "Professional Massage Therapist",
      bio: "I'm Bruno, a massage therapist from Ipanema, Brazil.\n\nWith over 12 years of experience, I specialize in Swedish, deep tissue, and sports massage, creating sessions that ease tension, reduce stress, and restore balance.\n\nMy approach is professional, client-focused, and LGBTQ+ inclusive.\n\nI offer in-studio and mobile massage, bringing authentic Brazilian-inspired care to you.\n\nDiscover the benefits of Brazilian-inspired massage—book your session today",
      phone: "(762) 334-5300",
      location: "San Antonio, TX",
      homeBase: "Ipanema, Rio de Janeiro, BR",
      experience: 12,
      techniques: ["Deep Tissue", "Shiatsu", "Swedish"],
      amenities: ["Bottled Water", "Hot Towels", "Private Restroom", "Shower"],
      affiliations: ["National Association of Massage Therapists"],
      availability: "7 a.m. - 11 p.m. every day",
      services: "In-studio & mobile services",
      gallery: [
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=900",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        "https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
      ],
      createdAt: new Date(),
    };
    this.therapistProfiles.set(brunoId, bruno);

    // Travel Schedule
    const currentSchedule: TravelSchedule = {
      id: randomUUID(),
      therapistId: brunoId,
      location: "San Antonio, TX",
      startDate: "Oct. 8",
      endDate: "Oct. 10",
      isCurrent: 1,
    };
    this.travelSchedules.set(currentSchedule.id, currentSchedule);

    // Pricing
    const pricing60: Pricing = {
      id: randomUUID(),
      therapistId: brunoId,
      duration: 60,
      price: 150,
      description: "Perfect for targeted relief and relaxation",
      isRecommended: false,
    };
    const pricing90: Pricing = {
      id: randomUUID(),
      therapistId: brunoId,
      duration: 90,
      price: 220,
      description: "Full-body deep tissue experience",
      isRecommended: true,
    };
    this.pricings.set(pricing60.id, pricing60);
    this.pricings.set(pricing90.id, pricing90);

    // Testimonials
    const testimonialData = [
      {
        clientInitials: "JD",
        date: "July 02, 2025",
        location: "Dallas, TX (in-studio)",
        content: "I've been seeing Bruno here in Dallas for almost a year now, and he's hands-down the best massage therapist I've ever found. He's incredibly skilled at deep tissue and relaxation massage, and one of the sweetest and most charming people you'll ever meet."
      },
      {
        clientInitials: "MC",
        date: "April 02, 2025",
        location: "Dallas, TX (in-studio)",
        content: "One word: AMAZING! Bruno is such an amazing guy. His place is clean and centrally located. His massage skills are second to none, coupled with his relaxed and cheery personality. I felt 10 years younger when I left!"
      },
      {
        clientInitials: "RJ",
        date: "Jan. 04, 2025",
        location: "Rio de Janeiro, BR",
        content: "Yesterday I had an amazing massage from this incredibly nice and sweet man. He greeted me with a great smile and warm hug. He's an incredible masseur—kind, friendly, knowledgeable, super sweet and very handsome with a beautiful smile."
      },
      {
        clientInitials: "TM",
        date: "Sept. 30, 2024",
        location: "San Jose, CA",
        content: "Oh man! This guy knows how to massage and found knots and tight muscles I never knew existed! This was a real proper full-on massage that left me shattered but light-headed. I went home and just crashed out for the rest of the day!"
      },
      {
        clientInitials: "DP",
        date: "July 02, 2024",
        location: "Dallas, TX",
        content: "Bruno is super calm and explains what he's doing. It's very relaxing & exciting all at the same time. He has exceptional massage skills but what he's doing is so imaginative & creative. This is a super deluxe experience—Bruno is in a league of his own."
      },
      {
        clientInitials: "WH",
        date: "March 05, 2024",
        location: "Dallas, TX",
        content: "I had a relaxing and invigorating massage yesterday and today I feel like a new man. Bruno is a professional from the first text message until you leave. Communication was prompt and thorough. Surreal massage, the best I've ever had. Bruno is my new go-to guy!"
      }
    ];

    testimonialData.forEach(data => {
      const testimonial: Testimonial = {
        id: randomUUID(),
        therapistId: brunoId,
        clientInitials: data.clientInitials,
        date: data.date,
        location: data.location,
        serviceType: "in-studio",
        rating: 5,
        content: data.content,
      };
      this.testimonials.set(testimonial.id, testimonial);
    });

    // Special
    const special: Special = {
      id: randomUUID(),
      therapistId: brunoId,
      title: "THIS WEEK (until Oct. 11)",
      description: "$30 Outcall Fee - Mobile massage available throughout San Antonio",
      validUntil: "Oct. 11",
      isActive: true,
    };
    this.specials.set(special.id, special);
  }

  async getTherapistProfile(id: string): Promise<TherapistProfile | undefined> {
    return this.therapistProfiles.get(id);
  }

  async createTherapistProfile(insertProfile: InsertTherapistProfile): Promise<TherapistProfile> {
    const id = randomUUID();
    const profile: TherapistProfile = { 
      ...insertProfile, 
      id, 
      createdAt: new Date() 
    };
    this.therapistProfiles.set(id, profile);
    return profile;
  }

  async getTravelSchedule(therapistId: string): Promise<TravelSchedule[]> {
    return Array.from(this.travelSchedules.values()).filter(
      schedule => schedule.therapistId === therapistId
    );
  }

  async createTravelSchedule(insertSchedule: InsertTravelSchedule): Promise<TravelSchedule> {
    const id = randomUUID();
    const schedule: TravelSchedule = { ...insertSchedule, id };
    this.travelSchedules.set(id, schedule);
    return schedule;
  }

  async getPricing(therapistId: string): Promise<Pricing[]> {
    return Array.from(this.pricings.values()).filter(
      pricing => pricing.therapistId === therapistId
    );
  }

  async createPricing(insertPricing: InsertPricing): Promise<Pricing> {
    const id = randomUUID();
    const pricing: Pricing = { ...insertPricing, id };
    this.pricings.set(id, pricing);
    return pricing;
  }

  async getTestimonials(therapistId: string): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      testimonial => testimonial.therapistId === therapistId
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getSpecials(therapistId: string): Promise<Special[]> {
    return Array.from(this.specials.values()).filter(
      special => special.therapistId === therapistId && special.isActive
    );
  }

  async createSpecial(insertSpecial: InsertSpecial): Promise<Special> {
    const id = randomUUID();
    const special: Special = { ...insertSpecial, id };
    this.specials.set(id, special);
    return special;
  }
}

export const storage = new MemStorage();
