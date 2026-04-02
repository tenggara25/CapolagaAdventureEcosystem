"use client";

import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/lib/booking-context";
import { accommodations } from "@/lib/booking-types";
import { cn } from "@/lib/utils";

export function Step1Accommodation() {
  const { selectedAccommodation, selectAccommodation, setStep, addToCart, nights } = useBooking();

  const handleSelect = (accommodation: typeof accommodations[0]) => {
    selectAccommodation(accommodation);
  };

  const handleContinue = () => {
    if (selectedAccommodation) {
      addToCart({
        id: selectedAccommodation.id,
        type: "accommodation",
        name: selectedAccommodation.name,
        image: selectedAccommodation.image,
        price: selectedAccommodation.price,
        quantity: 1,
        nights: nights,
      });
      setStep(2);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Pilih Akomodasi</h2>
        <p className="text-muted-foreground mt-2">
          Pilih tempat menginap yang sesuai dengan kebutuhan Anda
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((accommodation) => {
          const isSelected = selectedAccommodation?.id === accommodation.id;

          return (
            <Card
              key={accommodation.id}
              className={cn(
                "overflow-hidden cursor-pointer transition-all hover:shadow-lg",
                isSelected && "ring-2 ring-primary shadow-lg"
              )}
              onClick={() => handleSelect(accommodation)}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={accommodation.image}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                />
                <Badge
                  className="absolute top-3 left-3 capitalize"
                  variant={isSelected ? "default" : "secondary"}
                >
                  {accommodation.type}
                </Badge>
                {isSelected && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {accommodation.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{accommodation.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{accommodation.location}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {accommodation.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(accommodation.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">/malam</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedAccommodation}
          className="min-w-[200px]"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
