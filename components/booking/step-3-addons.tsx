"use client";

import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Clock, Plus, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/lib/booking-context";
import { activities } from "@/lib/booking-types";
import { cn } from "@/lib/utils";

export function Step3Addons() {
  const { cart, addActivityToCart, removeFromCart, setStep } = useBooking();

  const isInCart = (activityId: string) => {
    return cart.some((item) => item.id === activityId);
  };

  const handleToggleActivity = (activity: typeof activities[0]) => {
    if (isInCart(activity.id)) {
      removeFromCart(activity.id);
    } else {
      addActivityToCart(activity);
    }
  };

  const handleContinue = () => {
    setStep(4);
  };

  const handleBack = () => {
    setStep(2);
  };

  const handleSkip = () => {
    setStep(4);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addedActivitiesCount = cart.filter((item) => item.type === "activity").length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Rekomendasi Aktivitas</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Tingkatkan Pengalaman Anda</h2>
        <p className="text-muted-foreground mt-2">
          Tambahkan aktivitas seru untuk petualangan yang tak terlupakan
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {activities.map((activity) => {
          const inCart = isInCart(activity.id);

          return (
            <Card
              key={activity.id}
              className={cn(
                "overflow-hidden transition-all hover:shadow-lg",
                inCart && "ring-2 ring-primary"
              )}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  fill
                  className="object-cover"
                />
                {activity.popular && (
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                    Populer
                  </Badge>
                )}
                {inCart && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground">{activity.name}</h3>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{activity.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(activity.price)}
                  </span>
                  <Button
                    size="sm"
                    variant={inCart ? "secondary" : "default"}
                    onClick={() => handleToggleActivity(activity)}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Ditambahkan
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        Tambah
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {addedActivitiesCount > 0 && (
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <p className="text-primary font-medium">
            {addedActivitiesCount} aktivitas ditambahkan ke keranjang
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleSkip}>
            Lewati
          </Button>
          <Button size="lg" onClick={handleContinue} className="min-w-[200px]">
            Lanjutkan
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
