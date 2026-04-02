"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/lib/booking-context";
import { cn } from "@/lib/utils";

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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const subtotal = getTotalPrice();
  const taxRate = 0.11; // 11% tax
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  const accommodationItems = cart.filter((item) => item.type === "accommodation");
  const activityItems = cart.filter((item) => item.type === "activity");

  if (cart.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground">Keranjang Kosong</h2>
          <p className="text-muted-foreground mt-2">
            Tambahkan akomodasi dan aktivitas untuk memulai pemesanan
          </p>
          <Button className="mt-6" onClick={() => setStep(1)}>
            Mulai Booking
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Keranjang Anda</h2>
        <p className="text-muted-foreground mt-2">
          Periksa pesanan Anda sebelum melanjutkan ke pembayaran
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Accommodation */}
          {accommodationItems.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Akomodasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accommodationItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0">
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
                          <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                          {item.date && (
                            <p className="text-sm text-muted-foreground">
                              {formatDate(item.date)}
                            </p>
                          )}
                          <Badge variant="outline" className="mt-1">
                            {item.nights} Malam
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} x {item.nights} malam
                        </span>
                        <span className="font-semibold text-primary">
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
                <CardTitle className="text-lg">Aktivitas Add-on</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activityItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-semibold text-primary">
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
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Ringkasan Harga</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pajak & Biaya (11%)</span>
                  <span>{formatPrice(taxes)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>

              {/* Transparent Fee Structure */}
              <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Struktur Biaya Transparan</p>
                <p>
                  Biaya termasuk pajak pemerintah dan biaya layanan platform. Tidak ada biaya
                  tersembunyi.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  Bonus Savings Applied
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button size="lg" onClick={handleContinue} className="min-w-[200px]">
          Lanjut ke Checkout
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
