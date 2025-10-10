import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    clientInitials: string;
    date: string;
    location: string;
    rating: number;
    content: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const gradients = [
    "from-primary to-secondary",
    "from-accent to-primary", 
    "from-secondary to-accent",
    "from-primary via-secondary to-accent",
    "from-accent to-secondary",
    "from-secondary to-primary"
  ];
  
  const gradientIndex = testimonial.clientInitials.charCodeAt(0) % gradients.length;

  return (
    <Card className="testimonial-card rounded-2xl" data-testid={`card-testimonial-${testimonial.id}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${gradients[gradientIndex]} rounded-full flex items-center justify-center text-xl font-bold`}>
            {testimonial.clientInitials}
          </div>
          <div>
            <div className="font-semibold" data-testid={`text-testimonial-date-${testimonial.id}`}>
              {testimonial.date}
            </div>
            <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-location-${testimonial.id}`}>
              {testimonial.location}
            </div>
          </div>
        </div>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-primary fill-current" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-testimonial-content-${testimonial.id}`}>
          {testimonial.content}
        </p>
      </CardContent>
    </Card>
  );
}
