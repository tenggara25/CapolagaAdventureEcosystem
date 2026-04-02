"use client";

import Image from "next/image";
import { Star, MapPin, Users, CheckCircle2 } from "lucide-react";
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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Pilih Akomodasi</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Pilih tempat menginap yang sesuai dengan kebutuhan Anda
        </p>
      </div>

      {/* Accommodation Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((accommodation) => {
          const isSelected = selectedAccommodation?.id === accommodation.id;

          return (
            <Card
              key={accommodation.id}
              className={cn(
                "group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl",
                isSelected && "ring-2 ring-primary shadow-xl scale-[1.02]"
              )}
              onClick={() => handleSelect(accommodation)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={accommodation.image}
                  alt={accommodation.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Type Badge */}
                <Badge
                  className={cn(
                    "absolute top-3 left-3 capitalize font-medium",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-background/90 text-foreground"
                  )}
                >
                  {accommodation.type}
                </Badge>
                
                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{accommodation.rating}</span>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-in zoom-in duration-200">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}

                {/* Price on image */}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(accommodation.price)}
                    </span>
                    <span className="text-xs text-muted-foreground">/malam</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {accommodation.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-sm">{accommodation.location}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {accommodation.description}
                </p>

                {/* Features */}
                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">2-4 Orang</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Sarapan Inklusif
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Summary & Continue */}
      <div className="sticky bottom-4 z-10">
        <Card className={cn(
          "p-4 transition-all duration-300 shadow-lg border-primary/20",
          selectedAccommodation ? "bg-card" : "bg-muted/50"
        )}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {selectedAccommodation ? (
                <>
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={selectedAccommodation.image}
                      alt={selectedAccommodation.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{selectedAccommodation.name}</p>
                    <p className="text-sm text-primary font-medium">
                      {formatPrice(selectedAccommodation.price)}/malam
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Pilih akomodasi untuk melanjutkan</p>
              )}
            </div>
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedAccommodation}
              className="w-full sm:w-auto min-w-[180px]"
            >
              Lanjutkan
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
