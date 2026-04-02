"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight, Sparkles } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Glamping Riverside Luxury",
    description:
      "Tenda glamping mewah dengan pemandangan langsung ke sungai Capolaga.",
    price: "850.000",
    priceUnit: "/malam",
    rating: 4.9,
    image: "/images/glamping.jpg",
    badge: "POPULER",
  },
  {
    id: 2,
    title: "Standard Camping Ground",
    description:
      "Area camping luas di bawah hutan pinus dengan fasilitas toilet bersih.",
    price: "150.000",
    priceUnit: "/malam",
    rating: 4.7,
    image: "/images/camping.jpg",
    badge: null,
  },
  {
    id: 3,
    title: "Homestay Forest View",
    description:
      "Rumah kayu estetik yang nyaman untuk keluarga besar.",
    price: "1.300.000",
    priceUnit: "/malam",
    rating: 4.8,
    image: "/images/homestay.jpg",
    badge: null,
  },
  {
    id: 4,
    title: "Rafting Ciater Adventure",
    description:
      "Paket rafting seru di aliran sungai Ciater dekat kawasan Capolaga.",
    price: "350.000",
    priceUnit: "/Pax",
    rating: 5.0,
    image: "/images/rafting.jpg",
    badge: null,
  },
];

export function FeaturedExperiences() {
  return (
    <section id="booking" className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Featured Experiences
            </h2>
          </div>
          <Link
            href="/wisata"
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Lihat Semua
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href="/wisata"
              className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge */}
                {exp.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#e85a4f] text-white text-xs font-bold rounded-md">
                      {exp.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title & Rating */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-card-foreground text-sm leading-tight line-clamp-2">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-card-foreground">
                      {exp.rating}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-xs mb-4 line-clamp-2">
                  {exp.description}
                </p>

                {/* Price */}
                <div className="pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground uppercase">Mulai dari</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-primary">
                      Rp {exp.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {exp.priceUnit}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
