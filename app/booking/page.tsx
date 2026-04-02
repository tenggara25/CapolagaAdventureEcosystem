"use client";

import { TreePine, ArrowLeft } from "lucide-react";
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
  const isConfirmation = step === 6;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <TreePine className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">CapolagaGo</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali ke Beranda</span>
              <span className="sm:hidden">Kembali</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Step Indicator - Hide on confirmation */}
      {!isConfirmation && (
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4">
            <StepIndicator currentStep={step} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 pb-24">
        {step === 1 && <Step1Accommodation />}
        {step === 2 && <Step2DateSelection />}
        {step === 3 && <Step3Addons />}
        {step === 4 && <Step4Cart />}
        {step === 5 && <Step5Checkout />}
        {step === 6 && <Step6Confirmation />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-auto bg-card/50">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>&copy; 2026 CapolagaGo. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Bantuan</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privasi</Link>
          </div>
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
