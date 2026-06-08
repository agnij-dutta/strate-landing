"use client";

const assets = [
  { symbol: "bUSDC", issuer: "Blend",              status: "live" },
  { symbol: "CETES", issuer: "Etherfuse",          status: "q3"   },
  { symbol: "BENJI", issuer: "Franklin Templeton", status: "tbd"  },
  { symbol: "WTSYX", issuer: "WisdomTree",         status: "tbd"  },
  { symbol: "USDY",  issuer: "Ondo",               status: "tbd"  },
  { symbol: "WTGXX", issuer: "WisdomTree",         status: "tbd"  },
  { symbol: "EURC",  issuer: "Circle",             status: "live" },
  { symbol: "USDM",  issuer: "Mountain",           status: "tbd"  },
];

const statusStyle: Record<string, { dot: string; label: string; live: boolean }> = {
  live: { dot: "bg-strate",       label: "live", live: true  },
  q3:   { dot: "bg-foil",         label: "Q3",   live: false },
  tbd:  { dot: "bg-parchment/30", label: "soon", live: false },
};

function Row() {
  return (
    <>
      {assets.map((a, i) => {
        const s = statusStyle[a.status];
        return (
          <div
            key={`${a.symbol}-${i}`}
            className="flex shrink-0 items-baseline gap-3 border-r border-parchment/10 px-9"
          >
            <span
              className={`font-display text-[21px] ${s.live ? "text-foil" : "text-parchment/90"}`}
              style={{ letterSpacing: "-0.005em" }}
            >
              {a.symbol}
            </span>
            <span
              className="text-[13px] italic text-parchment/45"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {a.issuer}
            </span>
            <span className="ml-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-parchment/45">
              <span className={`block h-1 w-1 rounded-full ${s.dot}`} aria-hidden="true" />
              {s.label}
            </span>
          </div>
        );
      })}
    </>
  );
}

/**
 * Strippable-assets ribbon. Sits directly under the hero, framed by
 * foil hairlines so it reads as an intentional band in the same sight
 * as the headline: a kicker on the left, a paused-on-hover marquee of
 * issuers on the right, live ones accented in foil.
 */
export default function SupportedTicker() {
  return (
    <section className="relative bg-ink">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="rule-foil h-px w-full opacity-70" />

        <div className="flex items-stretch">
          {/* fixed kicker */}
          <div className="hidden shrink-0 items-center gap-2.5 border-r border-parchment/10 py-5 pr-8 md:flex">
            <span aria-hidden="true" className="block h-1.5 w-1.5 bg-foil" />
            <span className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.3em] text-foil/85">
              Strippable
              <br />
              on Strate
            </span>
          </div>

          {/* marquee */}
          <div className="relative flex-1 overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
              style={{ background: "linear-gradient(to right, var(--ink) 0%, rgba(11,37,69,0) 100%)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
              style={{ background: "linear-gradient(to left, var(--ink) 0%, rgba(11,37,69,0) 100%)" }}
            />
            <div className="marquee-track flex w-max items-center py-5">
              <Row />
              <Row />
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-parchment/10" />
      </div>
    </section>
  );
}
