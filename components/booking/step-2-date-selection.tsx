"use client";

import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/lib/booking-context";
import { timeSlots } from "@/lib/booking-types";
import { cn } from "@/lib/utils";
import { ChevronLeft, Minus, Plus, Clock, CalendarDays, Moon, Sun } from "lucide-react";

export function Step2DateSelection() {
  const {
    selectedAccommodation,
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    nights,
    setNights,
    setStep,
    cart,
    removeFromCart,
    addToCart,
  } = useBooking();

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot && selectedAccommodation) {
      const existingItem = cart.find((item) => item.id === selectedAccommodation.id);
      if (existingItem) {
        removeFromCart(selectedAccommodation.id);
        addToCart({
          ...existingItem,
          date: selectedDate.toISOString(),
          nights: nights,
          timeSlot: selectedTimeSlot,
        });
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const incrementNights = () => setNights(Math.min(nights + 1, 14));
  const decrementNights = () => setNights(Math.max(nights - 1, 1));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return "Pilih tanggal";
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getCheckoutDate = () => {
    if (!selectedDate) return null;
    const checkout = new Date(selectedDate);
    checkout.setDate(checkout.getDate() + nights);
    return checkout;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Pilih Tanggal & Waktu</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Tentukan tanggal check-in dan durasi menginap Anda
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column - Accommodation & Nights */}
        <div className="lg:col-span-4 space-y-6">
          {/* Selected Accommodation */}
          {selectedAccommodation && (
            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={selectedAccommodation.image}
                  alt={selectedAccommodation.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold text-white">{selectedAccommodation.name}</h3>
                  <p className="text-white/80 text-sm">{selectedAccommodation.location}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(selectedAccommodation.price)}
                  </span>
                  <span className="text-muted-foreground">/malam</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Nights Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Moon className="w-4 h-4 text-primary" />
                Durasi Menginap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-6 py-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementNights}
                  disabled={nights <= 1}
                  className="h-12 w-12 rounded-full"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <div className="text-center">
                  <span className="text-4xl font-bold text-foreground">{nights}</span>
                  <p className="text-sm text-muted-foreground">malam</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementNights}
                  disabled={nights >= 14}
                  className="h-12 w-12 rounded-full"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              {/* Date Range Display */}
              {selectedDate && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Check-in</span>
                    </div>
                    <span className="font-medium">{formatDateDisplay(selectedDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Check-out</span>
                    </div>
                    <span className="font-medium">{formatDateDisplay(getCheckoutDate() || undefined)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Calendar */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                Pilih Tanggal Check-in
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-lg border-0"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Time Slots */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Waktu Check-in
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                  size="lg"
                  className={cn(
                    "w-full justify-center font-medium transition-all",
                    !slot.available && "opacity-50 cursor-not-allowed",
                    selectedTimeSlot === slot.time && "shadow-md"
                  )}
                  disabled={!slot.available}
                  onClick={() => setSelectedTimeSlot(slot.time)}
                >
                  {slot.time}
                  {!slot.available && (
                    <Badge variant="secondary" className="ml-2 text-[10px]">
                      Penuh
                    </Badge>
                  )}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="sticky bottom-4 z-10">
        <Card className="p-4 shadow-lg border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {selectedAccommodation && (
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">Total Estimasi</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(selectedAccommodation.price * nights)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(selectedAccommodation.price)} x {nights} malam
                  </p>
                </div>
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
                disabled={!selectedDate || !selectedTimeSlot}
                className="flex-1 sm:flex-none min-w-[140px]"
              >
                Lanjutkan
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
