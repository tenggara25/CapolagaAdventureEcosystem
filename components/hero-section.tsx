"use client";

import Link from "next/link";
import { Search, Calendar, Users, Star, Zap, Tent, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="home" className="pt-14 md:pt-16">
      {/* Hero Banner */}
      <div
        className="relative py-12 md:py-16 lg:py-20"
        style={{
          background: "linear-gradient(135deg, #1a3a4a 0%, #2d5a6b 50%, #3d7a8a 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Experience Nature Adventure
                <br />
                at Capolaga
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-6">
                Pesan camping, glamping &amp; aktivitas petualangan dalam satu platform.
              </p>
              <Button
                size="lg"
                className="bg-white text-[#1a3a4a] hover:bg-white/90 font-semibold"
                asChild
              >
                <Link href="/wisata">
                  <Zap className="h-4 w-4 mr-2" />
                  Book Now
                </Link>
              </Button>
            </div>

            {/* Right Content */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              {/* Rating Badge */}
              <div className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.9 Rating</span>
                <span className="text-white/70">&#183;</span>
                <span className="text-white/80">500+ Wisatawan</span>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                  <Tent className="h-4 w-4" />
                  Camping
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                  <Tent className="h-4 w-4" />
                  Glamping
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                  <Mountain className="h-4 w-4" />
                  Adventure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 md:py-5">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Search Fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Destination */}
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1.5">
                  Cari Pengalaman
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Glamping, Rafting..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1.5">
                  Tanggal Kunjungan
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="21 Juni 2025"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1.5">
                  Jumlah Peserta
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none">
                    <option value="2">2 Orang</option>
                    <option value="1">1 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                    <option value="5">5+ Orang</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <Button
              size="lg"
              className="bg-[#2d9da8] hover:bg-[#2d9da8]/90 text-white px-8"
              asChild
            >
              <Link href="/wisata">
                <Search className="h-4 w-4 mr-2" />
                Cari Sekarang
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
