"use client";

import Image from "next/image";
import { CheckCircle, Download, Mail, Calendar, MapPin, QrCode, Home, Ticket } from "lucide-react";
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
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Success Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Konfirmasi email telah dikirim ke {confirmation.guestInfo.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Ticket Card */}
        <Card className="md:col-span-2 overflow-hidden">
          <div className="bg-primary text-primary-foreground p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                <span className="font-semibold">E-Ticket</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {confirmation.ticketNumber}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                <div className="w-32 h-32 bg-foreground/10 rounded-lg flex items-center justify-center mb-3">
                  <QrCode className="w-20 h-20 text-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Scan QR code saat check-in
                </p>
              </div>

              {/* Booking Details */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Tamu</p>
                  <p className="font-semibold text-lg">{confirmation.guestInfo.name}</p>
                </div>

                {accommodationItem && (
                  <div className="flex gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={accommodationItem.image}
                        alt={accommodationItem.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{accommodationItem.name}</p>
                      {accommodationItem.date && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(accommodationItem.date)}</span>
                        </div>
                      )}
                      <Badge variant="outline" className="mt-2">
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
                        <Badge key={activity.id} variant="secondary">
                          {activity.name} x{activity.quantity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ringkasan Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pajak & Biaya</span>
                <span>{formatPrice(taxes)}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Dibayar</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
            <Badge variant="outline" className="w-full justify-center">
              Pembayaran Berhasil
            </Badge>
          </CardContent>
        </Card>

        {/* Email Confirmation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Email Konfirmasi Terkirim
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Kami telah mengirim detail pemesanan dan e-ticket ke email Anda.
            </p>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm font-medium">{confirmation.guestInfo.email}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Tidak menerima email? Periksa folder spam atau{" "}
              <button className="text-primary underline">kirim ulang</button>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button variant="outline" size="lg">
          <Download className="w-4 h-4 mr-2" />
          Download E-Ticket
        </Button>
        <Button size="lg" onClick={resetBooking}>
          <Home className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}
