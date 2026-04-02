"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

// Accommodation data matching wisata page
const accommodationData: Record<string, {
  id: string;
  type: "glamping" | "camping" | "homestay";
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  capacity: string;
}> = {
  "glamping-1": {
    id: "glamping-1",
    type: "glamping",
    name: "Glamping Riverside Luxury",
    location: "Capolaga Highland",
    description: "Tenda glamping mewah dengan pemandangan langsung ke sungai Capolaga.",
    price: 850000,
    rating: 4.9,
    image: "/images/glamping.jpg",
    capacity: "2-4 Orang",
  },
  "glamping-2": {
    id: "glamping-2",
    type: "glamping",
    name: "Glamping at Mount Batur",
    location: "Capolaga Peak",
    description: "Pengalaman glamping premium dengan view gunung yang memukau.",
    price: 1200000,
    rating: 4.8,
    image: "/images/glamping.jpg",
    capacity: "2-4 Orang",
  },
  "camping-1": {
    id: "camping-1",
    type: "camping",
    name: "Standard Camping Ground",
    location: "Capolaga Riverside",
    description: "Area camping luas di bawah hutan pinus dengan fasilitas toilet bersih.",
    price: 150000,
    rating: 4.7,
    image: "/images/camping.jpg",
    capacity: "2-6 Orang",
  },
  "camping-2": {
    id: "camping-2",
    type: "camping",
    name: "Riverside Camping",
    location: "Capolaga River Bank",
    description: "Camping tradisional di tepi sungai yang indah.",
    price: 200000,
    rating: 4.6,
    image: "/images/camping.jpg",
    capacity: "2-4 Orang",
  },
  "homestay-1": {
    id: "homestay-1",
    type: "homestay",
    name: "Homestay Forest View",
    location: "Capolaga Village",
    description: "Rumah kayu estetik yang nyaman untuk keluarga besar.",
    price: 1300000,
    rating: 4.8,
    image: "/images/homestay.jpg",
    capacity: "4-8 Orang",
  },
  "homestay-2": {
    id: "homestay-2",
    type: "homestay",
    name: "Traditional Wooden Cabin",
    location: "Capolaga Hills",
    description: "Kabin kayu tradisional dengan sentuhan modern.",
    price: 950000,
    rating: 4.7,
    image: "/images/homestay.jpg",
    capacity: "2-4 Orang",
  },
};

function BookingContentInner() {
  const searchParams = useSearchParams();
  const { step, selectAccommodation, setStep, selectedAccommodation } = useBooking();
  const isConfirmation = step === 6;

  // Handle accommodation from URL param
  useEffect(() => {
    const accommodationId = searchParams.get("accommodation");
    if (accommodationId && accommodationData[accommodationId] && !selectedAccommodation) {
      selectAccommodation(accommodationData[accommodationId]);
      setStep(2); // Go directly to date selection
    }
  }, [searchParams, selectAccommodation, setStep, selectedAccommodation]);

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
              href="/wisata"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali ke Pilihan Wisata</span>
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

function BookingContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <BookingContentInner />
    </Suspense>
  );
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  );
}
