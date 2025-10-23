import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PriceCardProps {
  pricing: {
    id: string;
    duration: number;
    price: number;
    description: string | null;
    isRecommended: number;
  };
}

export default function PriceCard({ pricing }: PriceCardProps) {
  return (
    <Card 
      className={`price-card rounded-xl hover:border-primary/50 transition-all duration-300 ${
        pricing.isRecommended === 1
          ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30' 
          : 'bg-gradient-to-br from-muted to-card border-border'
      }`}
      data-testid={`card-pricing-${pricing.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold" data-testid={`text-duration-${pricing.id}`}>
              {pricing.duration} minutes
            </h3>
            {pricing.isRecommended === 1 && (
              <Badge className="bg-primary/20 text-primary mt-1">
                Recommended
              </Badge>
            )}
          </div>
          <div className="text-3xl font-bold text-primary" data-testid={`text-price-${pricing.id}`}>
            ${pricing.price}
          </div>
        </div>
        {pricing.description && (
          <p className="text-sm text-muted-foreground" data-testid={`text-description-${pricing.id}`}>
            {pricing.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
