import { Metadata } from "next";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateMetadata({
  title = "Premium&Classy - Professional Event Planning Services",
  description = "Transform your special moments into unforgettable experiences. Professional event planning for weddings, birthdays, corporate events, and more in your area.",
  keywords = ["event planning", "wedding planner", "birthday party", "corporate events", "event management", "party planner", "Premium&Classy"],
  image = "/images/og-image.jpg",
  url = "https://premiumandclassy.com",
  type = "website",
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const siteName = "Premium&Classy";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: "Premium&Classy Team" }],
    creator: "Premium&Classy",
    publisher: "Premium&Classy",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@premiumandclassy",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
  };
}

export function generateStructuredData(type: string, data: Record<string, unknown>) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...baseData,
        name: "Premium&Classy",
        description: "Professional event planning services for weddings, birthdays, corporate events, and special celebrations.",
        url: "https://premiumandclassy.com",
        logo: "https://premiumandclassy.netlify.app/Logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: data.phone || "+1-555-PREMIUM",
          contactType: "customer service",
          availableLanguage: "English",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: data.city || "Your City",
          addressRegion: data.state || "Your State",
          addressCountry: "US",
        },
        sameAs: [
          data.instagram || "https://instagram.com/premiumandclassy",
          data.facebook || "https://facebook.com/premiumandclassy",
          data.tiktok || "https://tiktok.com/@premiumandclassy",
        ],
      };

    case "Service":
      return {
        ...baseData,
        name: data.title,
        description: data.description,
        provider: {
          "@type": "Organization",
          name: "Premium&Classy",
        },
        serviceType: "Event Planning",
        areaServed: {
          "@type": "Place",
          name: "Your Service Area",
        },
        ...(data.priceRange ? {
          offers: {
            "@type": "Offer",
            priceRange: data.priceRange as string,
            priceCurrency: "USD",
          },
        } : {}),
      };

    case "Event":
      return {
        ...baseData,
        name: data.title,
        description: data.description,
        startDate: data.eventDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        organizer: {
          "@type": "Organization",
          name: "Premium&Classy",
        },
        ...(data.images && Array.isArray(data.images) ? {
          image: (data.images as Array<{ url: string }>).map((img) => img.url),
        } : {}),
      };

    case "Review":
      return {
        ...baseData,
        reviewBody: data.feedback,
        reviewRating: {
          "@type": "Rating",
          ratingValue: data.rating,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: data.clientName,
        },
        itemReviewed: {
          "@type": "Service",
          name: "Event Planning Services",
          provider: {
            "@type": "Organization",
            name: "Premium&Classy",
          },
        },
      };

    default:
      return baseData;
  }
}

export const defaultKeywords = [
  "event planning",
  "wedding planner",
  "birthday party planner",
  "corporate event planning",
  "event management",
  "party planning services",
  "wedding coordination",
  "event coordinator",
  "Premium&Classy",
  "professional event planner",
  "event design",
  "party organizer",
];
