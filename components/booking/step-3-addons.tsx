"use client";

import Image from "next/image";
import { Check, ChevronLeft, Clock, Plus, Sparkles, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/lib/booking-context";
import { activities } from "@/lib/booking-types";
import { cn } from "@/lib/utils";

export function Step3Addons() {
  const { cart, addActivityToCart, removeFromCart, setStep, getTotalPrice } = useBooking();

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addedActivitiesCount = cart.filter((item) => item.type === "activity").length;
  const addedActivitiesTotal = cart
    .filter((item) => item.type === "activity")
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Rekomendasi Aktivitas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Tingkatkan Pengalaman Anda</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Tambahkan aktivitas seru untuk petualangan yang tak terlupakan
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {activities.map((activity) => {
          const inCart = isInCart(activity.id);

          return (
            <Card
              key={activity.id}
              className={cn(
                "group overflow-hidden transition-all duration-300 hover:shadow-xl",
                inCart && "ring-2 ring-primary shadow-lg"
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {activity.popular && (
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground font-medium">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Populer
                  </Badge>
                )}
                
                {inCart && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-in zoom-in duration-200">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                )}

                {/* Price on image */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-xl font-bold text-white drop-shadow-lg">
                    {formatPrice(activity.price)}
                  </span>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {activity.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-xs">2-6 orang</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {activity.description}
                </p>

                <Button
                  size="sm"
                  variant={inCart ? "secondary" : "default"}
                  className="w-full"
                  onClick={() => handleToggleActivity(activity)}
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      Ditambahkan
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1.5" />
                      Tambah ke Trip
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="sticky bottom-4 z-10">
        <Card className="p-4 shadow-lg border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {addedActivitiesCount > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {addedActivitiesCount} aktivitas dipilih
                    </p>
                    <p className="text-sm text-primary font-medium">
                      +{formatPrice(addedActivitiesTotal)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Tambahkan aktivitas atau lewati langkah ini
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" onClick={handleBack} className="flex-1 sm:flex-none">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Kembali
              </Button>
              <Button
                size="lg"
                onClick={handleContinue}
                className="flex-1 sm:flex-none min-w-[140px]"
              >
                {addedActivitiesCount > 0 ? "Lanjutkan" : "Lewati"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
