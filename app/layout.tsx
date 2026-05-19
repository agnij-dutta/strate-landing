import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usestrate.app"),
  title: "Strate · Split yield from principal.",
  description:
    "The first yield-stripping protocol on Stellar. Strip principal from yield on any RWA. Trade them as PT and YT.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Strate · Split yield from principal.",
    description:
      "The first yield-stripping protocol on Stellar. Strip principal from yield on any RWA.",
    type: "website",
    url: "https://usestrate.app",
    siteName: "Strate",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Strate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strate · Split yield from principal.",
    description:
      "The first yield-stripping protocol on Stellar. Strip principal from yield on any RWA.",
    images: ["/api/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-parchment antialiased">{children}</body>
    </html>
  );
}
