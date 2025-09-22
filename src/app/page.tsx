"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ServicesPreview } from "@/components/ServicesPreview";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";
import { StructuredData } from "@/components/StructuredData";
import { fetchSiteSettings, fetchServices, fetchFeaturedPortfolio, fetchTestimonials } from "@/lib/sanity";
import { SiteSettings, Service, Portfolio, Testimonial } from "@/types";
import { generateStructuredData } from "@/lib/seo";

export default function Home() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, servicesData, portfolioData, testimonialsData] =
          await Promise.all([
            fetchSiteSettings(),
            fetchServices(),
            fetchFeaturedPortfolio(),
            fetchTestimonials(),
          ]);

        setSiteSettings(settingsData);
        setServices(servicesData || []);
        setPortfolio(portfolioData || []);
        setTestimonials(testimonialsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Generate structured data
  const organizationData = generateStructuredData("Organization", {
    phone: siteSettings?.contactInfo?.phone,
    city: "Your City",
    state: "Your State",
    instagram: siteSettings?.socialLinks?.instagram,
    facebook: siteSettings?.socialLinks?.facebook,
    tiktok: siteSettings?.socialLinks?.tiktok,
  });

  return (
    <>
      <StructuredData data={organizationData} />
      <HeroSection siteSettings={siteSettings || undefined} />
      <ServicesPreview services={services} />
      <PortfolioPreview portfolio={portfolio} />
      <TestimonialsPreview testimonials={testimonials} />
    </>
  );
}
