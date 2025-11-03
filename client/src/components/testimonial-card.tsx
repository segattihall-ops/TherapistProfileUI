import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card.tsx";
import { format } from "date-fns";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    clientInitials: string;
    date: Date;
    location: string;
    rating: number;
    content: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="testimonial-card rounded-lg h-full" data-testid={`card-testimonial-${testimonial.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-2 mb-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
            {testimonial.clientInitials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-muted-foreground" data-testid={`text-testimonial-date-${testimonial.id}`}>
              {format(new Date(testimonial.date), "MMMM dd, yyyy")}
            </div>
            <div className="text-xs text-muted-foreground" data-testid={`text-testimonial-location-${testimonial.id}`}>
              {testimonial.location}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4" data-testid={`text-testimonial-content-${testimonial.id}`}>
          {testimonial.content}
        </p>
      </CardContent>
    </Card>
  );
}
