"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteSettings } from "@/types";
import { urlFor } from "@/lib/sanity";

interface HeaderProps {
  siteSettings?: SiteSettings;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Header({ siteSettings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
              {siteSettings?.logo ? (
                <Image
                  src={urlFor(siteSettings.logo).width(40).height(40).url()}
                  alt={
                    siteSettings.logo.alt || siteSettings.brandName || "Logo"
                  }
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                />
              ) : (
                <div className="h-8 w-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {siteSettings?.brandName?.charAt(0) || "P"}
                  </span>
                </div>
              )}
              <span className="text-xl font-bold text-gray-900">
                {siteSettings?.brandName || "Premium&Classy"}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-amber-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button and Social Links */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
            {siteSettings?.contactInfo?.phone && (
              <a
                href={`tel:${siteSettings.contactInfo.phone}`}
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
            )}

            {siteSettings?.socialLinks?.instagram && (
              <a
                href={siteSettings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}

            {siteSettings?.socialLinks?.facebook && (
              <a
                href={siteSettings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}

            <Button
              asChild
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/booking">
                {siteSettings?.heroSection?.ctaText || "Book Your Event"}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="-m-1.5 p-1.5 flex items-center space-x-2"
                >
                  {siteSettings?.logo ? (
                    <Image
                      src={urlFor(siteSettings.logo).width(32).height(32).url()}
                      alt={
                        siteSettings.logo.alt ||
                        siteSettings.brandName ||
                        "Logo"
                      }
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {siteSettings?.brandName?.charAt(0) || "P"}
                      </span>
                    </div>
                  )}
                  <span className="text-lg font-bold text-gray-900">
                    {siteSettings?.brandName || "Premium&Classy"}
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button
                      asChild
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Link
                        href="/booking"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {siteSettings?.heroSection?.ctaText ||
                          "Book Your Event"}
                      </Link>
                    </Button>

                    {/* Mobile Social Links */}
                    <div className="mt-4 flex justify-center space-x-6">
                      {siteSettings?.contactInfo?.phone && (
                        <a
                          href={`tel:${siteSettings.contactInfo.phone}`}
                          className="text-gray-600 hover:text-amber-600 transition-colors"
                        >
                          <Phone className="h-6 w-6" />
                        </a>
                      )}

                      {siteSettings?.socialLinks?.instagram && (
                        <a
                          href={siteSettings.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-amber-600 transition-colors"
                        >
                          <Instagram className="h-6 w-6" />
                        </a>
                      )}

                      {siteSettings?.socialLinks?.facebook && (
                        <a
                          href={siteSettings.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-amber-600 transition-colors"
                        >
                          <Facebook className="h-6 w-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
