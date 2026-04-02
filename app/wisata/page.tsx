"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Star,
  MapPin,
  Users,
  Search,
  SlidersHorizontal,
  Tent,
  Home,
  TreePine,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { id: "all", label: "Semua", icon: TreePine },
  { id: "glamping", label: "Glamping", icon: Tent },
  { id: "camping", label: "Camping", icon: Tent },
  { id: "homestay", label: "Homestay", icon: Home },
];

const accommodations = [
  {
    id: "glamping-1",
    type: "glamping",
    title: "Glamping Riverside Luxury",
    location: "Capolaga Highland",
    description:
      "Tenda glamping mewah dengan pemandangan langsung ke sungai Capolaga. Dilengkapi AC, kasur king size, dan private bathroom.",
    price: 850000,
    rating: 4.9,
    reviews: 128,
    capacity: "2-4 Orang",
    image: "/images/glamping.jpg",
    amenities: ["AC", "Private Bathroom", "Breakfast", "WiFi"],
    popular: true,
  },
  {
    id: "glamping-2",
    type: "glamping",
    title: "Glamping at Mount Batur",
    location: "Capolaga Peak",
    description:
      "Pengalaman glamping premium dengan view gunung yang memukau. Termasuk welcome drink dan BBQ dinner.",
    price: 1200000,
    rating: 4.8,
    reviews: 89,
    capacity: "2-4 Orang",
    image: "/images/glamping.jpg",
    amenities: ["Mountain View", "BBQ Dinner", "Breakfast", "Bonfire"],
    popular: false,
  },
  {
    id: "camping-1",
    type: "camping",
    title: "Standard Camping Ground",
    location: "Capolaga Riverside",
    description:
      "Area camping luas di bawah hutan pinus dengan fasilitas toilet bersih. Cocok untuk pengalaman camping autentik.",
    price: 150000,
    rating: 4.7,
    reviews: 256,
    capacity: "2-6 Orang",
    image: "/images/camping.jpg",
    amenities: ["Toilet Bersih", "Parking", "Security 24/7"],
    popular: true,
  },
  {
    id: "camping-2",
    type: "camping",
    title: "Riverside Camping",
    location: "Capolaga River Bank",
    description:
      "Camping tradisional di tepi sungai yang indah. Suara aliran air akan menemani malam Anda.",
    price: 200000,
    rating: 4.6,
    reviews: 167,
    capacity: "2-4 Orang",
    image: "/images/camping.jpg",
    amenities: ["River Access", "Toilet", "Parking"],
    popular: false,
  },
  {
    id: "homestay-1",
    type: "homestay",
    title: "Homestay Forest View",
    location: "Capolaga Village",
    description:
      "Rumah kayu estetik yang nyaman untuk keluarga besar. Dilengkapi dapur dan ruang keluarga.",
    price: 1300000,
    rating: 4.8,
    reviews: 94,
    capacity: "4-8 Orang",
    image: "/images/homestay.jpg",
    amenities: ["Full Kitchen", "Living Room", "Hot Water", "WiFi"],
    popular: true,
  },
  {
    id: "homestay-2",
    type: "homestay",
    title: "Traditional Wooden Cabin",
    location: "Capolaga Hills",
    description:
      "Kabin kayu tradisional dengan sentuhan modern. Sempurna untuk retreat keluarga atau teman.",
    price: 950000,
    rating: 4.7,
    reviews: 72,
    capacity: "2-4 Orang",
    image: "/images/homestay.jpg",
    amenities: ["Kitchenette", "Terrace", "Hot Water"],
    popular: false,
  },
];

export default function WisataPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAccommodations = accommodations.filter((acc) => {
    const matchesCategory =
      selectedCategory === "all" || acc.type === selectedCategory;
    const matchesSearch =
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <TreePine className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                CapolagaGo
              </span>
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Temukan Pengalaman Terbaik
          </h1>
          <p className="text-teal-100 text-lg mb-6">
            Pilih dari berbagai pilihan akomodasi untuk petualangan alam Anda
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari glamping, camping, homestay..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white text-foreground border-0"
              />
            </div>
            <Button
              variant="secondary"
              className="h-12 px-6 bg-white text-teal-700 hover:bg-teal-50"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className={`flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Menampilkan{" "}
              <span className="font-semibold text-foreground">
                {filteredAccommodations.length}
              </span>{" "}
              hasil
            </p>
            <select className="border border-border rounded-lg px-3 py-2 text-sm bg-card">
              <option>Urutkan: Populer</option>
              <option>Harga: Rendah ke Tinggi</option>
              <option>Harga: Tinggi ke Rendah</option>
              <option>Rating Tertinggi</option>
            </select>
          </div>

          {/* Accommodation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccommodations.map((acc) => (
              <Card
                key={acc.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={acc.image}
                    alt={acc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Type Badge */}
                  <Badge className="absolute top-3 left-3 bg-card/90 text-foreground backdrop-blur-sm capitalize">
                    {acc.type}
                  </Badge>
                  {/* Popular Badge */}
                  {acc.popular && (
                    <Badge className="absolute top-3 right-12 bg-red-500 text-white">
                      POPULER
                    </Badge>
                  )}
                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-foreground">
                      {acc.rating}
                    </span>
                  </div>
                  {/* Price */}
                  <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <span className="text-lg font-bold text-teal-600">
                      Rp {formatPrice(acc.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">/malam</span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
                    {acc.title}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{acc.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {acc.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {acc.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {amenity}
                      </span>
                    ))}
                    {acc.amenities.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        +{acc.amenities.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{acc.capacity}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      asChild
                    >
                      <Link href={`/booking?accommodation=${acc.id}`}>
                        Pesan Sekarang
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAccommodations.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
