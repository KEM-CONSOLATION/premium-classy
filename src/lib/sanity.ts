import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-12-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]`,
  services: `*[_type == "service" && isActive == true] | order(order asc)`,
  portfolio: `*[_type == "portfolio"] | order(_createdAt desc)`,
  featuredPortfolio: `*[_type == "portfolio" && isFeatured == true] | order(_createdAt desc)[0...6]`,
  testimonials: `*[_type == "testimonial" && isPublished == true] | order(order asc, rating desc)`,
  bookings: `*[_type == "booking"] | order(_createdAt desc)`,
  contactInquiries: `*[_type == "contactInquiry"] | order(_createdAt desc)`,
};
