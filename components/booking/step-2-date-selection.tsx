"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/lib/booking-context";
import { timeSlots } from "@/lib/booking-types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

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
      // Update cart with date and nights info
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Pilih Tanggal & Waktu</h2>
        <p className="text-muted-foreground mt-2">
          Tentukan tanggal check-in dan durasi menginap Anda
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Selected Accommodation Preview */}
        {selectedAccommodation && (
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Akomodasi Terpilih</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                <Image
                  src={selectedAccommodation.image}
                  alt={selectedAccommodation.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">{selectedAccommodation.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedAccommodation.location}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(selectedAccommodation.price)}
                </span>
                <span className="text-sm text-muted-foreground">/malam</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pilih Tanggal Check-in</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Time Slots & Nights */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Waktu & Durasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nights Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Jumlah Malam
              </label>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementNights}
                  disabled={nights <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold w-12 text-center">{nights}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementNights}
                  disabled={nights >= 14}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Waktu Check-in
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "justify-center",
                      !slot.available && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!slot.available}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                  >
                    {slot.time}
                    {!slot.available && (
                      <Badge variant="secondary" className="ml-1 text-[10px]">
                        Penuh
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Total Preview */}
            {selectedAccommodation && (
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatPrice(selectedAccommodation.price)} x {nights} malam
                  </span>
                  <span className="font-semibold">
                    {formatPrice(selectedAccommodation.price * nights)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTimeSlot}
          className="min-w-[200px]"
        >
          Lanjutkan
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
