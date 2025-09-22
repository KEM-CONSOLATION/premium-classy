import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiteSettings } from "@/types";
import { urlFor } from "@/lib/sanity";
import { defaultHeroImage } from "@/lib/hero-images";
import { heroAnimation, textReveal, staggerContainer, staggerItem } from "@/lib/animations";

interface HeroSectionProps {
  siteSettings?: SiteSettings;
}

export function HeroSection({ siteSettings }: HeroSectionProps) {
  const heroData = siteSettings?.heroSection;
  const backgroundImage = heroData?.backgroundImage
    ? urlFor(heroData.backgroundImage).width(1920).height(1080).url()
    : defaultHeroImage.url;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial="hidden"
        animate="visible"
        variants={heroAnimation}
      >
        <Image
          src={backgroundImage}
          alt={heroData?.backgroundImage?.alt || `${defaultHeroImage.alt} - Premium&Classy Event Planning`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="space-y-8">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight"
            variants={textReveal}
          >
            {heroData?.headline ||
              siteSettings?.tagline ||
              "Premium & Classy Events"}
          </motion.h1>

          {heroData?.subheadline && (
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
              variants={textReveal}
            >
              {heroData.subheadline}
            </motion.p>
          )}

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={staggerItem}
          >
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/booking">
                {heroData?.ctaText || "Book Your Event"}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          {siteSettings?.aboutSection && (
            <motion.div 
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              variants={staggerContainer}
            >
              {siteSettings.aboutSection.yearsOfExperience && (
                <motion.div variants={staggerItem}>
                  <div className="text-3xl md:text-4xl font-bold text-amber-400">
                    {siteSettings.aboutSection.yearsOfExperience}+
                  </div>
                  <div className="text-gray-300 mt-2">Years Experience</div>
                </motion.div>
              )}

              {siteSettings.aboutSection.eventsPlanned && (
                <motion.div variants={staggerItem}>
                  <div className="text-3xl md:text-4xl font-bold text-amber-400">
                    {siteSettings.aboutSection.eventsPlanned}+
                  </div>
                  <div className="text-gray-300 mt-2">Events Planned</div>
                </motion.div>
              )}

              <motion.div variants={staggerItem}>
                <div className="text-3xl md:text-4xl font-bold text-amber-400">
                  100%
                </div>
                <div className="text-gray-300 mt-2">Client Satisfaction</div>
              </motion.div>

              <motion.div variants={staggerItem}>
                <div className="text-3xl md:text-4xl font-bold text-amber-400">
                  24/7
                </div>
                <div className="text-gray-300 mt-2">Support</div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
