import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ImageGallery from "@/components/image-gallery";
import TestimonialCard from "@/components/testimonial-card";
import PriceCard from "@/components/price-card";
import { Phone, MessageSquare, Heart, Star, MapPin, Clock, User, Shield } from "lucide-react";

interface TherapistProfileProps {
  therapistId?: string;
}

export default function TherapistProfile({ therapistId: propTherapistId }: TherapistProfileProps) {
  const params = useParams();
  const therapistId = propTherapistId || params.id || "bruno-massage-therapist";
  const [isSaved, setIsSaved] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/therapist", therapistId],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background cosmic-grid flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background cosmic-grid flex items-center justify-center">
        <div className="text-xl text-destructive">Error loading therapist profile</div>
      </div>
    );
  }

  const { profile, travelSchedule, pricing, testimonials, specials } = data;
  const currentLocation = travelSchedule.find((s: any) => s.isCurrent);

  const handleCall = () => {
    window.location.href = `tel:${profile.phone.replace(/[^\d]/g, '')}`;
  };

  const handleText = () => {
    window.location.href = `sms:${profile.phone.replace(/[^\d]/g, '')}`;
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen bg-background text-foreground cosmic-grid">
      {/* Geometric Background Accents */}
      <div className="geometric-accent w-96 h-96 bg-primary top-0 right-0"></div>
      <div className="geometric-accent w-80 h-80 bg-secondary bottom-20 left-10"></div>
      <div className="geometric-accent w-64 h-64 bg-accent top-1/2 right-1/3"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MasseurFinder
              </div>
              <nav className="hidden md:flex space-x-8 text-sm font-medium">
                <a href="#" className="text-muted-foreground hover:text-foreground transition">Home</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition">Find Therapists</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition">About</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Gallery */}
            <ImageGallery images={profile.gallery} />

            {/* Profile Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold font-display mb-2 section-title">
                  {profile.name}
                </h1>
                <p className="text-lg text-muted-foreground">{profile.title}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleCall}
                  className="floating-action px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90"
                  data-testid="button-call"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </Button>
                <Button 
                  onClick={handleText}
                  className="floating-action px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold flex items-center gap-2 hover:bg-secondary/90"
                  data-testid="button-text"
                >
                  <MessageSquare className="w-5 h-5" />
                  Text {profile.phone}
                </Button>
                <Button 
                  onClick={handleSave}
                  variant={isSaved ? "default" : "outline"}
                  className="floating-action px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                  data-testid="button-save"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                  Save
                </Button>
              </div>

              {/* Key Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Location</div>
                    <div className="font-semibold" data-testid="text-location">{profile.location}</div>
                    <div className="text-sm text-muted-foreground mt-1">Visiting from {profile.homeBase}</div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Services</div>
                    <div className="font-semibold">{profile.services}</div>
                    <div className="text-sm text-muted-foreground mt-1">Starting at ${Math.min(...pricing.map((p: any) => p.price))}</div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Availability</div>
                    <div className="font-semibold">{profile.availability}</div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Specialties</div>
                    <div className="font-semibold">{profile.techniques.join(", ")}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Testimonials Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full">
                <Star className="w-5 h-5 text-primary fill-current" />
                <span className="font-semibold" data-testid="text-testimonials-count">{testimonials.length} Testimonials</span>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Card className="bg-card border-border rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <CardContent className="p-8 sm:p-12 relative z-10">
              <h2 className="text-3xl font-bold font-display mb-6 section-title">Overview</h2>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-foreground mb-4">Brazilian Male Massage by Bruno — Deep Tissue, Swedish, & Sports Massage</h3>
                {profile.bio.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-muted-foreground mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Travel Schedule */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-3xl font-bold font-display mb-8 section-title">Travel Schedule</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {currentLocation && (
              <Card className="bg-gradient-to-br from-primary/20 to-secondary/10 border-primary/30 rounded-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-cosmic-pulse"></div>
                <CardContent className="p-8 relative z-10">
                  <Badge className="bg-primary text-primary-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    Current Visit
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2" data-testid="text-current-location">{currentLocation.location}</h3>
                  <p className="text-muted-foreground">{currentLocation.startDate} - {currentLocation.endDate}, 2025</p>
                </CardContent>
              </Card>
            )}
            
            <Card className="bg-card border-border rounded-2xl relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
              <CardContent className="p-8 relative z-10">
                <Badge variant="secondary" className="mb-4">
                  <User className="w-4 h-4 mr-2" />
                  Home Base
                </Badge>
                <h3 className="text-2xl font-bold mb-2">{profile.homeBase}</h3>
                <p className="text-muted-foreground">Normally based here</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-3xl font-bold font-display mb-8 section-title">Rates</h2>
          <Card className="bg-card border-border rounded-2xl">
            <CardContent className="p-8 sm:p-12">
              <p className="text-lg text-muted-foreground mb-8">Spa-quality bodywork, tailored to you, blending Deep Tissue, Shiatsu & Swedish</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {pricing.map((price: any) => (
                  <PriceCard key={price.id} pricing={price} />
                ))}
              </div>

              <Separator className="mb-6" />

              <div>
                <h4 className="font-semibold mb-4">Payments & Discounts</h4>
                <div className="flex flex-wrap gap-3 mb-4">
                  {["Apple Pay", "Cash", "Mastercard", "Venmo", "Visa", "Zelle"].map((method) => (
                    <Badge key={method} variant="secondary">{method}</Badge>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg text-accent">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">10% off on Mondays</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Specials */}
        {specials.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {specials.map((special: any) => (
              <div key={special.id} className="bg-gradient-to-r from-accent via-primary to-secondary p-1 rounded-2xl">
                <Card className="bg-background rounded-xl text-center">
                  <CardContent className="p-8 sm:p-12">
                    <Badge className="bg-accent/20 text-accent font-semibold mb-4">
                      <Star className="w-5 h-5 mr-2 animate-float fill-current" />
                      Limited Time Offer
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4" data-testid="text-special-title">{special.title}</h2>
                    <p className="text-muted-foreground mt-2">{special.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </section>
        )}

        {/* Additional Info */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-3xl font-bold font-display mb-8 section-title">Additional Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Techniques
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.techniques.map((technique: string) => (
                    <Badge key={technique} className="bg-primary/20 border-primary/30">{technique}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-secondary" />
                  Experience
                </h3>
                <p className="text-2xl font-bold text-secondary">{profile.experience}+ Years</p>
                <p className="text-sm text-muted-foreground mt-1">Professional massage therapy experience</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-accent" />
                  In-Studio Amenities
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {profile.amenities.map((amenity: string) => (
                    <li key={amenity} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Affiliations
                </h3>
                {profile.affiliations.map((affiliation: string) => (
                  <p key={affiliation} className="text-muted-foreground">{affiliation}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-3xl font-bold font-display mb-4 section-title">Client Testimonials</h2>
          <p className="text-muted-foreground mb-8">Gathered by Bruno from admiring massage clients to share with you.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial: any) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 floating-action">
              View All Testimonials
            </Button>
          </div>
        </section>

        {/* Footer Gallery */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.gallery.map((image: string, index: number) => (
              <div key={index} className="relative rounded-xl overflow-hidden aspect-square bg-muted">
                <img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover gallery-image cursor-pointer"
                  data-testid={`img-gallery-${index}`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <div>© 2025 MasseurFinder. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition">Terms of Service</a>
                <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
