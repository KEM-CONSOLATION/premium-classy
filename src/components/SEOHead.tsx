import Head from "next/head";
import { StructuredData } from "./StructuredData";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
}

export function SEOHead({
  title = "Premium&Classy - Professional Event Planning Services",
  description = "Transform your special moments into unforgettable experiences. Professional event planning for weddings, birthdays, corporate events, and more.",
  keywords = ["event planning", "wedding planner", "birthday party", "corporate events"],
  image = "/images/og-image.jpg",
  url = "https://premiumandclassy.com",
  structuredData,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes("Premium&Classy") ? title : `${title} | Premium&Classy`;
  
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Premium&Classy" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        
        {/* Additional SEO */}
        <meta name="author" content="Premium&Classy" />
        <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
        <link rel="canonical" href={url} />
        
        {/* Geo tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Your City" />
        
        {/* Business info */}
        <meta name="business:contact_data:phone_number" content="+1-555-PREMIUM" />
        <meta name="business:contact_data:email" content="info@premiumandclassy.com" />
      </Head>
      
      {structuredData && <StructuredData data={structuredData} />}
    </>
  );
}
