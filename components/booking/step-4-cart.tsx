"use client";

import Image from "next/image";
import { ChevronLeft, Minus, Plus, ShoppingCart, Trash2, Tag, Shield, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/lib/booking-context";

export function Step4Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, getTotalPrice, setStep } = useBooking();

  const handleContinue = () => {
    if (cart.length > 0) {
      setStep(5);
    }
  };

  const handleBack = () => {
    setStep(3);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const subtotal = getTotalPrice();
  const taxRate = 0.11;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  const accommodationItems = cart.filter((item) => item.type === "accommodation");
  const activityItems = cart.filter((item) => item.type === "activity");

  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
            <ShoppingCart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Keranjang Kosong</h2>
          <p className="text-muted-foreground mb-6">
            Tambahkan akomodasi dan aktivitas untuk memulai pemesanan
          </p>
          <Button onClick={() => setStep(1)}>Mulai Booking</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Keranjang Anda</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Periksa pesanan Anda sebelum melanjutkan ke pembayaran
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-7 space-y-4">
          {/* Accommodation */}
          {accommodationItems.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Akomodasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accommodationItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <div className="relative w-28 h-28 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-foreground line-clamp-1">{item.name}</h4>
                          {item.date && (
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {formatDate(item.date)}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{item.nights} Malam</Badge>
                            {item.timeSlot && (
                              <Badge variant="outline">{item.timeSlot}</Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                        <span className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} x {item.nights} malam
                        </span>
                        <span className="font-bold text-lg text-primary">
                          {formatPrice(item.price * (item.nights || 1))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Activities */}
          {activityItems.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Aktivitas Add-on
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activityItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-foreground line-clamp-1">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm text-muted-foreground ml-2">orang</span>
                        </div>
                        <span className="font-bold text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Price Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Ringkasan Harga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pajak & Biaya (11%)</span>
                    <span className="font-medium">{formatPrice(taxes)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Bonus Savings Applied</p>
                    <p className="text-xs text-muted-foreground">Diskon otomatis untuk Anda</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    -5%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Transparent Fee */}
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Struktur Biaya Transparan</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Biaya termasuk pajak pemerintah dan biaya layanan platform. Tidak ada biaya tersembunyi.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Pembayaran aman & terenkripsi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-4 z-10">
        <Card className="p-4 shadow-lg border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Total Pembayaran</p>
              <p className="text-2xl font-bold text-primary">{formatPrice(total)}</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" onClick={handleBack} className="flex-1 sm:flex-none">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Kembali
              </Button>
              <Button
                size="lg"
                onClick={handleContinue}
                className="flex-1 sm:flex-none min-w-[180px]"
              >
                Lanjut ke Checkout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
