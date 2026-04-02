"use client";

import Link from "next/link";
import { Waves, Bike, Wind, Droplets, MapPin } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Rafting Ciater",
    price: "Rp 200rb/orang",
    icon: Waves,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "ATV Adventure",
    price: "Rp 150rb/orang",
    icon: Bike,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: 3,
    title: "Paragliding",
    price: "Rp 350rb/orang",
    icon: Wind,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    id: 4,
    title: "Pemandian Sari Ater",
    price: "Rp 100rb/orang",
    icon: Droplets,
    color: "bg-teal-50 text-teal-600",
  },
];

export function AddonActivities() {
  return (
    <section id="addon" className="py-6 md:py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            Explore Around Capolaga
          </h2>
        </div>

        {/* Activities Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Link
                key={activity.id}
                href="/booking"
                className="flex items-center gap-3 p-3 md:p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                <div className={`p-2.5 rounded-lg ${activity.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-card-foreground text-sm truncate">
                    {activity.title}
                  </h3>
                  <p className="text-primary text-xs font-medium">
                    {activity.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
