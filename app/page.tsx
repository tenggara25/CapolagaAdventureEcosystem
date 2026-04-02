import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturedExperiences } from "@/components/featured-experiences";
import { AddonActivities } from "@/components/addon-activities";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedExperiences />
      <AddonActivities />
      <CTASection />
      <Footer />
    </main>
  );
}
