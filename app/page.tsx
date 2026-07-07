import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import HowItWorks from "@/components/landing/HowItWorks";
import Landmarks from "@/components/landing/Landmarks";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main style={{ background: "var(--clr-bg-base)" }}>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Landmarks />
      <CTA />
      <Footer />
    </main>
  );
}
