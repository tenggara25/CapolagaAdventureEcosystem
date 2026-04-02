"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, CreditCard, Lock, Smartphone, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { useBooking } from "@/lib/booking-context";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "midtrans",
    name: "Midtrans",
    icon: Smartphone,
    description: "Bayar dengan e-wallet, QRIS, atau transfer bank",
  },
  {
    id: "credit-card",
    name: "Credit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, JCB",
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    icon: Building,
    description: "BCA, Mandiri, BNI, BRI",
  },
];

export function Step5Checkout() {
  const {
    guestInfo,
    setGuestInfo,
    paymentMethod,
    setPaymentMethod,
    getTotalPrice,
    confirmBooking,
    setStep,
    cart,
  } = useBooking();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestInfo.name || !guestInfo.email || !guestInfo.phone || !paymentMethod) {
      return;
    }
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    confirmBooking();
    setIsProcessing(false);
  };

  const handleBack = () => {
    setStep(4);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const taxRate = 0.11;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  const isFormValid = guestInfo.name && guestInfo.email && guestInfo.phone && paymentMethod;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Secure Checkout</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Checkout</h2>
        <p className="text-muted-foreground mt-2">
          Lengkapi informasi Anda untuk menyelesaikan pemesanan
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Guest Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Informasi Tamu</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup className="space-y-4">
                  <Field>
                    <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      value={guestInfo.name}
                      onChange={(e) => setGuestInfo({ name: e.target.value })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({ email: e.target.value })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">Nomor Telepon</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+62 812 3456 7890"
                      value={guestInfo.phone}
                      onChange={(e) => setGuestInfo({ phone: e.target.value })}
                      required
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="p-2 rounded-full bg-muted">
                          <Icon className="w-5 h-5 text-foreground" />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-semibold cursor-pointer">
                            {method.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4 p-4 bg-muted/50 rounded-lg">
                    <Field>
                      <FieldLabel htmlFor="card-number">Nomor Kartu</FieldLabel>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="expiry">Masa Berlaku</FieldLabel>
                        <Input id="expiry" placeholder="MM/YY" />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                        <Input id="cvv" placeholder="123" />
                      </Field>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items Preview */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.type === "accommodation"
                            ? `${item.nights} malam`
                            : `x${item.quantity}`}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {formatPrice(item.price * item.quantity * (item.nights || 1))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

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
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!isFormValid || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-pulse">Memproses...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Bayar Sekarang
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan kami
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-start pt-6">
          <Button type="button" variant="outline" onClick={handleBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </form>
    </div>
  );
}
