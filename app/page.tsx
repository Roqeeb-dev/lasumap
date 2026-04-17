import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import HowItWorks from "@/components/landing/HowItWorks";
import Landmarks from "@/components/landing/Landmarks";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main
      className="min-h-screen bg-[#0a0f1e] text-white overflow-x-hidden"
      style={{ fontFamily: "var(--font-dm, sans-serif)" }}
    >
      <Navbar />
      <Hero />
      <HowItWorks />
      <Landmarks />
      <CTA />
      <Footer />
    </main>
  );
}
