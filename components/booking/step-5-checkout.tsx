"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, CreditCard, Lock, Smartphone, Building, User, Mail, Phone, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useBooking } from "@/lib/booking-context";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "midtrans",
    name: "Midtrans",
    icon: Smartphone,
    description: "E-wallet, QRIS, atau transfer bank",
    badge: "Rekomendasi",
  },
  {
    id: "credit-card",
    name: "Kartu Kredit",
    icon: CreditCard,
    description: "Visa, Mastercard, JCB",
    badge: null,
  },
  {
    id: "bank-transfer",
    name: "Transfer Bank",
    icon: Building,
    description: "BCA, Mandiri, BNI, BRI",
    badge: null,
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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Secure Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Checkout</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Lengkapi informasi Anda untuk menyelesaikan pemesanan
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left - Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Guest Information */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Informasi Tamu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup className="space-y-5">
                  <Field>
                    <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <User className="w-4 h-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        value={guestInfo.name}
                        onChange={(e) => setGuestInfo({ name: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Mail className="w-4 h-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ email: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">Nomor Telepon</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Phone className="w-4 h-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="phone"
                        type="tel"
                        placeholder="+62 812 3456 7890"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ phone: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    
                    return (
                      <div
                        key={method.id}
                        className={cn(
                          "relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50 hover:bg-muted/30"
                        )}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                        <div className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-xl transition-colors",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        )}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{method.name}</span>
                            {method.badge && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">
                                {method.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 transition-all",
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                        )}>
                          {isSelected && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4 p-5 bg-muted/30 rounded-xl border border-border/50">
                    <Field>
                      <FieldLabel htmlFor="card-number">Nomor Kartu</FieldLabel>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="expiry">Masa Berlaku</FieldLabel>
                        <Input id="expiry" placeholder="MM/YY" />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                        <Input id="cvv" placeholder="123" type="password" />
                      </Field>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items Preview */}
                  <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 p-2 bg-muted/30 rounded-lg">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
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
                              : `${item.quantity} orang`}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-primary shrink-0">
                          {formatPrice(item.price * item.quantity * (item.nights || 1))}
                        </p>
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

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 text-base"
                    disabled={!isFormValid || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Spinner className="mr-2" />
                        Memproses Pembayaran...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Bayar {formatPrice(total)}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Transaksi aman dengan enkripsi SSL</span>
                  </div>
                </CardContent>
              </Card>

              <p className="text-xs text-center text-muted-foreground px-4">
                Dengan melanjutkan pembayaran, Anda menyetujui{" "}
                <button type="button" className="text-primary underline">Syarat & Ketentuan</button>
                {" "}dan{" "}
                <button type="button" className="text-primary underline">Kebijakan Privasi</button>
                {" "}kami.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-start pt-6">
          <Button type="button" variant="outline" onClick={handleBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Kembali ke Keranjang
          </Button>
        </div>
      </form>
    </div>
  );
}
