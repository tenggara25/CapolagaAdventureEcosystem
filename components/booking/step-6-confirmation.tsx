"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Download, Mail, Calendar, QrCode, Home, Ticket, MapPin, Clock, PartyPopper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/lib/booking-context";

export function Step6Confirmation() {
  const { confirmation, resetBooking } = useBooking();

  if (!confirmation) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const accommodationItem = confirmation.items.find((item) => item.type === "accommodation");
  const activityItems = confirmation.items.filter((item) => item.type === "activity");

  const taxRate = 0.11;
  const subtotal = confirmation.totalPrice;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Success Animation Header */}
      <div className="text-center py-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full" />
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
            <CheckCircle2 className="w-14 h-14 text-primary" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <PartyPopper className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Booking Berhasil!</h1>
          <PartyPopper className="w-6 h-6 text-primary scale-x-[-1]" />
        </div>
        <p className="text-muted-foreground">
          E-ticket telah dikirim ke <span className="font-medium text-foreground">{confirmation.guestInfo.email}</span>
        </p>
      </div>

      {/* E-Ticket Card */}
      <Card className="overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ticket className="w-6 h-6" />
              <div>
                <span className="font-bold text-lg">E-Ticket</span>
                <p className="text-primary-foreground/80 text-sm">CapolagaGo</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 font-mono text-sm px-3 py-1">
              {confirmation.ticketNumber}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl border-2 border-dashed border-border">
              <div className="w-32 h-32 bg-foreground/5 rounded-xl flex items-center justify-center mb-4">
                <QrCode className="w-24 h-24 text-foreground/30" />
              </div>
              <p className="text-sm text-muted-foreground text-center font-medium">
                Scan saat check-in
              </p>
            </div>

            {/* Booking Details */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nama Tamu</p>
                <p className="font-bold text-xl">{confirmation.guestInfo.name}</p>
              </div>

              {accommodationItem && (
                <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={accommodationItem.image}
                      alt={accommodationItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{accommodationItem.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      {accommodationItem.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(accommodationItem.date)}</span>
                        </div>
                      )}
                      {accommodationItem.timeSlot && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{accommodationItem.timeSlot}</span>
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {accommodationItem.nights} Malam
                    </Badge>
                  </div>
                </div>
              )}

              {activityItems.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Aktivitas</p>
                  <div className="flex flex-wrap gap-2">
                    {activityItems.map((activity) => (
                      <Badge key={activity.id} variant="outline" className="py-1.5 px-3">
                        {activity.name} ({activity.quantity}x)
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Price Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Ringkasan Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pajak & Biaya</span>
                <span>{formatPrice(taxes)}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total Dibayar</span>
              <span className="text-primary text-lg">{formatPrice(total)}</span>
            </div>
            <Badge variant="secondary" className="w-full justify-center bg-primary/10 text-primary">
              Pembayaran Berhasil
            </Badge>
          </CardContent>
        </Card>

        {/* Email Confirmation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Konfirmasi Terkirim
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Detail pemesanan dan e-ticket telah dikirim ke email Anda.
            </p>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-medium text-sm">{confirmation.guestInfo.email}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Tidak menerima email? Periksa folder spam atau{" "}
              <button className="text-primary underline hover:no-underline">kirim ulang</button>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download E-Ticket
            </Button>
            <Button size="lg" onClick={resetBooking} asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
