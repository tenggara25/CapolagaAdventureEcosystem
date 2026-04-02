"use client";

import Link from "next/link";
import { TreePine, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Booking", href: "/booking" },
    { label: "Paket Wisata", href: "/#paket" },
    { label: "Add-on Activity", href: "/#addon" },
    { label: "Tentang Kami", href: "/#about" },
  ],
  services: [
    { label: "Glamping", href: "/booking" },
    { label: "Camping", href: "/booking" },
    { label: "Homestay", href: "/booking" },
    { label: "Rafting", href: "/booking" },
    { label: "ATV Adventure", href: "/booking" },
    { label: "Paragliding", href: "/booking" },
  ],
};

export function Footer() {
  return (
    <footer id="contact" className="bg-[#1a3a4a] text-white">
      <div className="container mx-auto px-4 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <TreePine className="h-7 w-7 text-[#2d9da8]" />
              <span className="text-xl font-bold text-white">
                CapolagaGo
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Platform wisata alam terintegrasi untuk pengalaman petualangan
              terbaik di Capolaga, Subang.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2d9da8] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2d9da8] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2d9da8] transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Navigasi</h4>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Layanan</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Kontak</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-start gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Capolaga, Subang, Jawa Barat</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+62 812-3456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@capolagago.com"
                  className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>info@capolagago.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-xs">
              &copy; {new Date().getFullYear()} CapolagaGo. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs">
              <Link
                href="#"
                className="text-white/50 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-white/50 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
