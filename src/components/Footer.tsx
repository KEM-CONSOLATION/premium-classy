import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { SiteSettings } from "@/types";
// urlFor import removed - using static logo now
import { generateWhatsAppUrl } from "@/lib/utils";

interface FooterProps {
  siteSettings?: SiteSettings;
}

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Wedding Planning", href: "/services#wedding" },
    { name: "Birthday Parties", href: "/services#birthday" },
    { name: "Corporate Events", href: "/services#corporate" },
    { name: "Private Celebrations", href: "/services#private" },
  ],
};

export function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/Logo.png"
                alt={siteSettings?.brandName || "Premium&Classy Logo"}
                width={40}
                height={40}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-white">
                {siteSettings?.brandName || "Premium&Classy"}
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              {siteSettings?.tagline ||
                "Creating unforgettable moments, one event at a time."}
            </p>
            {siteSettings?.description && (
              <p className="text-sm leading-6 text-gray-400">
                {siteSettings.description}
              </p>
            )}

            {/* Social Links */}
            <div className="flex space-x-6">
              {siteSettings?.socialLinks?.instagram && (
                <a
                  href={siteSettings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {siteSettings?.socialLinks?.facebook && (
                <a
                  href={siteSettings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {siteSettings?.contactInfo?.whatsappNumber && (
                <a
                  href={generateWhatsAppUrl(
                    siteSettings.contactInfo.whatsappNumber,
                    "Hello! I'd like to inquire about your event planning services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <span className="sr-only">WhatsApp</span>
                  <MessageCircle className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Services
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Contact
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {siteSettings?.contactInfo?.phone && (
                    <li>
                      <a
                        href={`tel:${siteSettings.contactInfo.phone}`}
                        className="flex items-center text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {siteSettings.contactInfo.phone}
                      </a>
                    </li>
                  )}
                  {siteSettings?.contactInfo?.email && (
                    <li>
                      <a
                        href={`mailto:${siteSettings.contactInfo.email}`}
                        className="flex items-center text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        {siteSettings.contactInfo.email}
                      </a>
                    </li>
                  )}
                  {siteSettings?.contactInfo?.address && (
                    <li>
                      <div className="flex items-start text-sm leading-6 text-gray-300">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{siteSettings.contactInfo.address}</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {currentYear} {siteSettings?.brandName || "Premium&Classy"}.
              All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-xs leading-5 text-gray-400">
                Crafted with ❤️ for unforgettable events
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
