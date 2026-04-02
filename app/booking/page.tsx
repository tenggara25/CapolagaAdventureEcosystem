"use client";

import { TreePine } from "lucide-react";
import Link from "next/link";
import { BookingProvider, useBooking } from "@/lib/booking-context";
import { StepIndicator } from "@/components/booking/step-indicator";
import { Step1Accommodation } from "@/components/booking/step-1-accommodation";
import { Step2DateSelection } from "@/components/booking/step-2-date-selection";
import { Step3Addons } from "@/components/booking/step-3-addons";
import { Step4Cart } from "@/components/booking/step-4-cart";
import { Step5Checkout } from "@/components/booking/step-5-checkout";
import { Step6Confirmation } from "@/components/booking/step-6-confirmation";

function BookingContent() {
  const { step } = useBooking();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <TreePine className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-foreground">CapolagaGo</span>
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <StepIndicator currentStep={step} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {step === 1 && <Step1Accommodation />}
        {step === 2 && <Step2DateSelection />}
        {step === 3 && <Step3Addons />}
        {step === 4 && <Step4Cart />}
        {step === 5 && <Step5Checkout />}
        {step === 6 && <Step6Confirmation />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 CapolagaGo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  );
}
