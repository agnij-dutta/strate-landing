import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("position") ?? "0";
  const n = Math.max(0, Math.min(9_999_999, parseInt(raw, 10) || 0));
  const position = n.toLocaleString("en-US");

  const PARCHMENT = "#F5F1E8";
  const INK = "#0B2545";
  const STRATE = "#2D6A4F";
  const FOIL = "#C9A961";
  const LEDGER = "#1A1A1A";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: PARCHMENT,
          color: LEDGER,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top row: wordmark + tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 56,
              color: INK,
              letterSpacing: "-0.02em",
            }}
          >
            strate
            <div
              style={{
                width: 12,
                height: 12,
                background: FOIL,
                borderRadius: 999,
                marginLeft: -14,
                marginTop: 14,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: "0.22em",
              color: STRATE,
              textTransform: "uppercase",
            }}
          >
            Waitlist · Stellar · RWA
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.04,
              color: INK,
              maxWidth: 980,
              letterSpacing: "-0.02em",
            }}
          >
            Fix your yield. Trade the rest.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: LEDGER,
              opacity: 0.75,
              maxWidth: 900,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            The first yield-stripping protocol on Stellar.
          </div>
        </div>

        {/* Bottom row: position badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                letterSpacing: "0.22em",
                color: INK,
                opacity: 0.7,
                textTransform: "uppercase",
              }}
            >
              Your position
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 96,
                color: FOIL,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              #{position}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                color: INK,
                opacity: 0.6,
              }}
            >
              strate.finance
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: INK,
                opacity: 0.45,
              }}
            >
              Mainnet beta · TVL-capped
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
