"use client";

import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    id: 1,
    title: "Glamping Riverside",
    description:
      "Nikmati pengalaman glamping mewah di tepi sungai dengan pemandangan alam yang memukau.",
    price: "Rp 850.000",
    priceUnit: "/malam",
    rating: 4.9,
    reviews: 128,
    location: "Capolaga, Subang",
    image: "/images/glamping.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Camping Ground",
    description:
      "Area camping luas dengan fasilitas lengkap, cocok untuk keluarga dan grup.",
    price: "Rp 150.000",
    priceUnit: "/orang",
    rating: 4.7,
    reviews: 256,
    location: "Capolaga, Subang",
    image: "/images/camping.jpg",
    badge: "Populer",
  },
  {
    id: 3,
    title: "Homestay Forest",
    description:
      "Penginapan tradisional di tengah hutan dengan nuansa alami dan tenang.",
    price: "Rp 450.000",
    priceUnit: "/malam",
    rating: 4.8,
    reviews: 89,
    location: "Capolaga, Subang",
    image: "/images/homestay.jpg",
    badge: "Nyaman",
  },
];

export function FeaturedExperiences() {
  return (
    <section id="booking" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Akomodasi
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Featured Experiences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Pilih pengalaman menginap terbaik sesuai keinginan Anda. Dari
            glamping mewah hingga camping tradisional.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {exp.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                {/* Location */}
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{exp.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                  {exp.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {exp.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-card-foreground">
                      {exp.rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({exp.reviews} ulasan)
                  </span>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-xl font-bold text-primary">
                      {exp.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {exp.priceUnit}
                    </span>
                  </div>
                  <Button size="sm">Booking</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Lihat Semua Akomodasi
          </Button>
        </div>
      </div>
    </section>
  );
}
