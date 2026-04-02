"use client";

import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const activities = [
  {
    id: 1,
    title: "Rafting Adventure",
    description: "Arung jeram seru menyusuri sungai dengan pemandangan indah",
    price: "Rp 200.000",
    duration: "2-3 jam",
    image: "/images/rafting.jpg",
    popular: true,
  },
  {
    id: 2,
    title: "ATV Adventure",
    description: "Jelajahi trek off-road dengan ATV melalui hutan dan perbukitan",
    price: "Rp 250.000",
    duration: "1-2 jam",
    image: "/images/atv.jpg",
    popular: true,
  },
  {
    id: 3,
    title: "Paralayang",
    description: "Terbang tinggi dan nikmati pemandangan alam dari udara",
    price: "Rp 400.000",
    duration: "15-20 menit",
    image: "/images/paragliding.jpg",
    popular: false,
  },
  {
    id: 4,
    title: "Pemandian Air Panas",
    description: "Relaksasi di pemandian air panas alami Sari Ater",
    price: "Rp 75.000",
    duration: "Sepuasnya",
    image: "/images/hotspring.jpg",
    popular: true,
  },
];

export function AddonActivities() {
  return (
    <section id="addon" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium mb-4">
            Add-On Aktivitas
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Explore Around Capolaga
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Tambahkan aktivitas petualangan seru ke perjalanan Anda. Dari
            rafting hingga paralayang.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Popular Badge */}
                {activity.popular && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                      Populer
                    </span>
                  </div>
                )}

                {/* Price on Image */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-white font-bold text-lg">
                    {activity.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {activity.description}
                </p>

                {/* Duration & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{activity.duration}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-primary hover:text-primary/80"
                  >
                    Detail
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Lihat Semua Aktivitas
          </Button>
        </div>
      </div>
    </section>
  );
}
