import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Showcase from "@/components/Showcase";
import SupportedTicker from "@/components/SupportedTicker";

// Mock waitlist position; wire to KV/DB for production.
const POSITION = 1247;

export default function Page() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <SupportedTicker />
        <Showcase />
        <FAQ />
      </main>
      <Footer position={POSITION} />
    </>
  );
}
