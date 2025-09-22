import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { config } from "@/config";

// Create Sanity client (no token for public read access)
export const client = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  apiVersion: config.sanity.apiVersion,
  useCdn: true, // Always use CDN for better performance and CORS handling
  ignoreBrowserTokenWarning: true,
  perspective: "published",
});

// Direct CDN URL for client-side requests (bypasses CORS issues)
export const getSanityCDNUrl = (query: string) => {
  const baseUrl = `https://${config.sanity.projectId}.api.sanity.io/v${config.sanity.apiVersion}/data/query/${config.sanity.dataset}`;
  return `${baseUrl}?query=${encodeURIComponent(query)}`;
};

// Fallback fetch function that tries CDN first, then API route
export const fetchWithFallback = async (query: string) => {
  try {
    // Try direct CDN first (fastest, no CORS issues)
    const cdnUrl = getSanityCDNUrl(query);
    const response = await fetch(cdnUrl);
    
    if (response.ok) {
      const data = await response.json();
      return data.result;
    }
  } catch (error) {
    console.log("CDN fetch failed, trying API route:", error);
  }

  try {
    // Fallback to API route
    const apiUrl = `${config.app.url}/api/sanity?query=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data = await response.json();
      return data.result;
    }
  } catch (error) {
    console.error("Both CDN and API route failed:", error);
    throw error;
  }
};

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
  testimonials: `*[_type == "testimonial"] | order(rating desc, _createdAt desc)`,
  bookings: `*[_type == "booking"] | order(_createdAt desc)`,
  contactInquiries: `*[_type == "contactInquiry"] | order(_createdAt desc)`,
};

// Fetch functions with fallback
export const fetchSiteSettings = () => fetchWithFallback(queries.siteSettings);
export const fetchServices = () => fetchWithFallback(queries.services);
export const fetchPortfolio = () => fetchWithFallback(queries.portfolio);
export const fetchFeaturedPortfolio = () => fetchWithFallback(queries.featuredPortfolio);
export const fetchTestimonials = () => fetchWithFallback(queries.testimonials);
export const fetchContactInquiries = () => fetchWithFallback(queries.contactInquiries);
export const fetchBookings = () => fetchWithFallback(queries.bookings);
