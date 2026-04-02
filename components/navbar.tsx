"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, TreePine, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/wisata", label: "Booking" },
  { href: "/#paket", label: "Paket Wisata" },
  { href: "/#addon", label: "Add-on Activity" },
  { href: "/#about", label: "Tentang Kami" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-sm border-b border-border"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <TreePine className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            <span className="text-lg md:text-xl font-bold text-foreground">
              CapolagaGo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  index === 0
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search & Login */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Search className="h-4 w-4" />
              <span>Cari...</span>
            </button>
            <Button size="sm" className="bg-[#1a3a4a] hover:bg-[#1a3a4a]/90 text-white">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-border mt-2">
                <Button className="w-full bg-[#1a3a4a] hover:bg-[#1a3a4a]/90">Login</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
