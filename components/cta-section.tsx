"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, CheckCircle } from "lucide-react";

const features = [
  "Booking instan & konfirmasi cepat",
  "Harga transparan tanpa biaya tersembunyi",
  "Customer support 24/7",
  "Pembatalan gratis hingga 24 jam sebelumnya",
];

export function CTASection() {
  return (
    <section id="about" className="relative py-16 md:py-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cta-nature.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#1a3a4a]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">
                Rencanakan Petualanganmu Sekarang
              </h2>
              <p className="text-white/80 text-base mb-6">
                Jangan lewatkan pengalaman wisata alam terbaik di Capolaga. Booking
                sekarang dan dapatkan penawaran menarik!
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#2d9da8] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-[#2d9da8] hover:bg-[#2d9da8]/90 text-white font-semibold"
                  asChild
                >
                  <Link href="/booking">
                    Booking Sekarang
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold"
                >
                  Lihat Paket Wisata
                </Button>
              </div>
            </div>

            {/* Right Content - Contact Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                Butuh Bantuan?
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Tim kami siap membantu Anda merencanakan perjalanan wisata yang sempurna.
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2d9da8] flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Telepon</p>
                    <p className="text-white/70 text-sm">+62 812-3456-7890</p>
                  </div>
                </a>

                <a
                  href="mailto:info@capolagago.com"
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2d9da8] flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Email</p>
                    <p className="text-white/70 text-sm">info@capolagago.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
