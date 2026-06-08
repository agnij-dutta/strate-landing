"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: container,
  });
  // Image translates UP as user scrolls DOWN. Classic parallax. Keeps the
  // image overflowing past the top of the section at all scroll positions, so
  // the rounded corners are never exposed to bg-ink underneath.
  // Parallax travel calibrated so the image always fully covers the section
  // (no exposed bg-ink top OR bottom), while still feeling alive on scroll.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

  const serial = "STR-2026-001247";

  return (
    <section
      ref={container}
      className="group relative mx-4 mb-6 mt-20 overflow-hidden bg-ink sm:mx-6 sm:mt-24 lg:mx-8 lg:mb-8 lg:mt-24"
      // Triple-clip strategy:
      //  1. border-radius for browsers that honor it on stacking contexts
      //  2. clip-path inset+round as a forced geometric clip
      //  3. overflow-hidden as the fallback for older browsers
      style={{
        borderRadius: 28,
        clipPath: "inset(0 round 28px)",
        WebkitClipPath: "inset(0 round 28px)",
      }}
    >
      {/* Parallax image. top -10% / height 142% guarantees full coverage
          across the -22% travel range, top AND bottom. */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ top: "-10%", height: "142%", y }}
      >
        <Image
          alt="A US Treasury bond torn cleanly along a vertical perforation."
          fill
          priority
          src="/hero.png"
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      {/* Bottom-weighted darkening overlay for headline legibility.
          Lighter at bottom so the image stays visible behind the headline
          instead of looking like blank space. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,37,69,0.18) 0%, rgba(11,37,69,0) 24%, rgba(11,37,69,0) 58%, rgba(7,24,47,0.32) 88%, rgba(7,24,47,0.42) 100%)",
        }}
      />

      {/* === FOREGROUND CONTENT ===
          Asymmetric padding: more at top, less at bottom so the headline
          sits closer to the section's bottom edge (no large empty band). */}
      <div className="relative z-10 flex h-[62vh] min-h-[460px] w-full flex-col px-7 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-10 lg:px-14 lg:pb-10 lg:pt-14">
        {/* Top labels */}
        <div className="flex items-start justify-between gap-6 mix-blend-difference text-white">
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.36em] sm:text-[11px]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
          >
            <span aria-hidden="true" className="block h-px w-6 bg-white/80" />
            Yield stripping · Stellar · RWA
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="num hidden text-right font-mono text-[10px] uppercase leading-[1.55] tracking-[0.32em] sm:text-[11px] lg:block"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
          >
            {serial}
            <br />
            <span className="opacity-75">Bearer · Series A · MMXXVI</span>
          </motion.p>
        </div>

        {/* Headline. Translucent on section hover so the bond shows through. */}
        <div className="mt-auto mix-blend-difference text-white">
          <motion.h1
            initial={{ opacity: 0, y: 32, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium uppercase transition-[opacity,filter] duration-700 ease-out group-hover:opacity-30 group-hover:blur-[1px]"
            style={{
              fontSize: "clamp(52px, 9vw, 184px)",
              lineHeight: 0.92,
              letterSpacing: "-0.028em",
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            }}
          >
            Split yield
            <br />
            from principal
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
