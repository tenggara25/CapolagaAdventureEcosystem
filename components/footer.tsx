"use client";

import Link from "next/link";
import { TreePine, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Booking", href: "#booking" },
    { label: "Add-on", href: "#addon" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Glamping", href: "#" },
    { label: "Camping", href: "#" },
    { label: "Homestay", href: "#" },
    { label: "Rafting", href: "#" },
    { label: "ATV", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <TreePine className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-background">
                CapolagaGo
              </span>
            </Link>
            <p className="text-background/70 text-sm mb-6 leading-relaxed">
              Platform wisata alam terintegrasi untuk pengalaman petualangan
              terbaik di Capolaga. Booking camping, glamping, dan aktivitas
              outdoor dalam satu tempat.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-background mb-4">Navigasi</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-background mb-4">Layanan</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background mb-4">Kontak</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-start gap-3 text-background/70 hover:text-background transition-colors text-sm"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>Capolaga, Subang, Jawa Barat, Indonesia</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>+62 812-3456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@capolagago.com"
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors text-sm"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span>info@capolagago.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">
              &copy; {new Date().getFullYear()} CapolagaGo. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="#"
                className="text-background/60 hover:text-background transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-background/60 hover:text-background transition-colors"
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
