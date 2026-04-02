"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cta-nature.jpg')" }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Rencanakan Petualanganmu Sekarang
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto text-pretty">
            Jangan lewatkan pengalaman wisata alam terbaik di Capolaga. Booking
            sekarang dan dapatkan penawaran menarik!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
            >
              Booking Sekarang
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 bg-transparent font-semibold px-8"
            >
              Lihat Paket Wisata
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
            <a
              href="tel:+6281234567890"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>+62 812-3456-7890</span>
            </a>
            <a
              href="mailto:info@capolagago.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>info@capolagago.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
