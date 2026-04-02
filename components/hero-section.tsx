"use client";

import Link from "next/link";
import { Search, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-nature.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
            Experience Nature Adventure
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto text-pretty">
            Pesan camping, glamping &amp; aktivitas dalam satu platform. Temukan
            petualangan alam terbaik di Capolaga.
          </p>

          {/* Glassmorphism Search Box */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="md:col-span-1">
                  <label className="block text-white/80 text-sm mb-2 text-left">
                    Destinasi
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
                    <input
                      type="text"
                      placeholder="Cari destinasi..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-foreground placeholder:text-foreground/50 border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Date Picker */}
                <div className="md:col-span-1">
                  <label className="block text-white/80 text-sm mb-2 text-left">
                    Tanggal
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="md:col-span-1">
                  <label className="block text-white/80 text-sm mb-2 text-left">
                    Jumlah Orang
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
                    <select className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none">
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                      <option value="3">3 Orang</option>
                      <option value="4">4 Orang</option>
                      <option value="5">5+ Orang</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:col-span-1 flex items-end">
                  <Button
                    size="lg"
                    className="w-full py-3 h-auto text-base font-semibold bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link href="/booking">
                      <Search className="h-5 w-5 mr-2" />
                      Cari
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                50+
              </div>
              <div className="text-white/70 text-sm">Destinasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                10K+
              </div>
              <div className="text-white/70 text-sm">Pengunjung</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                4.9
              </div>
              <div className="text-white/70 text-sm">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
