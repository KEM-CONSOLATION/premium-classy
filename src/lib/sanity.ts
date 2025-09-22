import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { config } from "@/config";
import { sanityClient } from "@/lib/sanity-client";

// Create direct Sanity client
const directClient = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  apiVersion: config.sanity.apiVersion,
  useCdn: config.sanity.useCdn,
  token: config.sanity.token,
  ignoreBrowserTokenWarning: true,
  perspective: "published",
});

// Use proxy client in production to avoid CORS, direct client in development
export const client = sanityClient || directClient;

const builder = imageUrlBuilder(directClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]`,
  services: `*[_type == "service" && isActive == true] | order(order asc)`,
  portfolio: `*[_type == "portfolio"] | order(_createdAt desc)`,
  featuredPortfolio: `*[_type == "portfolio" && isFeatured == true] | order(_createdAt desc)[0...6]`,
  testimonials: `*[_type == "testimonial"] | order(rating desc, _createdAt desc)`,
  bookings: `*[_type == "booking"] | order(_createdAt desc)`,
  contactInquiries: `*[_type == "contactInquiry"] | order(_createdAt desc)`,
};
