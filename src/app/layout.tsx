import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/Layout";
import { generateMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = generateMetadata({
  title: "Professional Event Planning Services | Premium&Classy",
  description: "Transform your special moments into unforgettable experiences. Professional event planning for weddings, birthdays, corporate events, and more. Contact us today for your dream event.",
  keywords: [
    "event planning",
    "wedding planner",
    "birthday party planner",
    "corporate events",
    "event management",
    "party planning services",
    "Premium&Classy",
    "professional event planner",
    "wedding coordination",
    "event coordinator",
  ],
  url: "https://premiumandclassy.com",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#d97706",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
