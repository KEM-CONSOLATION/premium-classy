import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Event Planning Services - Wedding, Corporate & Birthday Parties",
  description: "Comprehensive event planning services for weddings, corporate events, birthday parties, and special celebrations. Professional coordination, vendor management, and flawless execution by Premium&Classy.",
  keywords: [
    "event planning services",
    "wedding planning",
    "corporate event planning",
    "birthday party planning",
    "event coordination",
    "party planning services",
    "wedding coordinator",
    "event management services",
    "Premium&Classy services",
    "professional event planner",
  ],
  url: "https://premiumandclassy.com/services",
  type: "website",
});
