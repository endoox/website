import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { shareMetadata } from "@/lib/share-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "endo · The software behind the modern sports agency";
const description =
  "endo is the software behind modern sports agencies. Never miss a payment or deliverable, price every deal right, and get more time to do what you do best.";

// Site-wide defaults; pages override title and description. metadataBase makes relative URLs absolute
// for search engines and link previews.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.endodeals.com"),
  title,
  description,
  alternates: { canonical: "./" },
  ...shareMetadata(title, description),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
