import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MarketWidget from "@/components/MarketWidget";
import Nav from "@/components/Nav";
import Showcase from "@/components/Showcase";
import SupportedTicker from "@/components/SupportedTicker";
import WhitepaperBand from "@/components/WhitepaperBand";
import { getWaitlistCount } from "@/lib/waitlist";

// Re-fetch the count at most once a minute. Anything fresher is noise; anything
// stale is fine because the footer hairline copy is decorative not contractual.
export const revalidate = 60;

async function readPosition(): Promise<number> {
  try {
    return await getWaitlistCount();
  } catch {
    return 1247;
  }
}

export default async function Page() {
  const position = await readPosition();
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <SupportedTicker />
        <MarketWidget />
        <Showcase />
        <WhitepaperBand />
        <FAQ />
      </main>
      <Footer position={position} />
    </>
  );
}
