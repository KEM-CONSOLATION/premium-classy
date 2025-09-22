"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client, queries } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Portfolio } from "@/types";
import { sectionImages, imageAlts } from "@/lib/section-images";
import { getDefaultPortfolioImage, getPortfolioImages } from "@/lib/portfolio-images";
import { Calendar, MapPin, Filter, Grid, List, Play } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [filteredPortfolio, setFilteredPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioData = await client.fetch(queries.portfolio);
        setPortfolio(portfolioData || []);
        setFilteredPortfolio(portfolioData || []);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter portfolio by event type
  useEffect(() => {
    if (selectedEventType === "all") {
      setFilteredPortfolio(portfolio);
    } else {
      setFilteredPortfolio(
        portfolio.filter((item) => item.eventType === selectedEventType)
      );
    }
  }, [selectedEventType, portfolio]);

  // Get unique event types for filter
  const eventTypes = Array.from(
    new Set(portfolio.map((item) => item.eventType))
  );

  const openLightbox = (item: Portfolio, imageIndex: number = 0) => {
    let images: Array<{ src: string; alt: string }> = [];
    
    // Check for images in both possible fields
    if (item.images && item.images.length > 0) {
      images = item.images.map((img) => ({
        src: urlFor(img).width(1200).height(800).url(),
        alt: img.alt || item.title,
      }));
    } else if (item.gallery && item.gallery.length > 0) {
      images = item.gallery.map((img) => ({
        src: urlFor(img).width(1200).height(800).url(),
        alt: img.alt || item.title,
      }));
    } else {
      // Use placeholder images
      const placeholderImages = getPortfolioImages(item.eventType, 6);
      images = placeholderImages.map((img) => ({
        src: img.url,
        alt: img.alt,
      }));
    }
    
    setLightboxImages(images);
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={sectionImages.portfolio.background}
            alt={imageAlts.portfolio.background}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore our collection of beautifully planned events. Each
              celebration tells a unique story and showcases our commitment to
              creating unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() +
                      type.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-amber-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-amber-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPortfolio.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-8"
              }
            >
              {filteredPortfolio.map((item) => (
                <Card
                  key={item._id}
                  className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    viewMode === "list"
                      ? "grid grid-cols-1 md:grid-cols-3 gap-0"
                      : ""
                  }`}
                >
                  {/* Main Image */}
                  <div
                    className={`relative cursor-pointer overflow-hidden ${
                      viewMode === "grid" ? "h-64" : "h-64 md:h-full"
                    }`}
                    onClick={() => openLightbox(item, 0)}
                  >
                    {((item.images && item.images.length > 0) || (item.gallery && item.gallery.length > 0)) ? (
                      <Image
                        src={
                          item.images && item.images.length > 0
                            ? urlFor(item.images[0]).width(500).height(400).url()
                            : item.gallery && item.gallery.length > 0
                            ? urlFor(item.gallery[0]).width(500).height(400).url()
                            : getDefaultPortfolioImage(item.eventType).url
                        }
                        alt={
                          item.images?.[0]?.alt || 
                          item.gallery?.[0]?.alt || 
                          item.title
                        }
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <Image
                        src={getDefaultPortfolioImage(item.eventType).url}
                        alt={getDefaultPortfolioImage(item.eventType).alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

                    {/* Event Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {item.eventType.replace("-", " ")}
                      </span>
                    </div>

                    {/* Image Count */}
                    {item.images && item.images.length > 1 && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                          +{item.images.length - 1}
                        </span>
                      </div>
                    )}

                    {/* Video Indicator */}
                    {item.videoUrl && (
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-black/70 text-white p-2 rounded-full">
                          <Play className="h-4 w-4" />
                        </div>
                      </div>
                    )}

                    {/* Hover View Gallery Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="outline"
                        className="bg-white/90 hover:bg-white text-gray-900 border-white"
                      >
                        View Gallery ({item.images?.length || 0})
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent
                    className={`p-6 ${viewMode === "list" ? "md:col-span-2" : ""}`}
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-gray-600 line-clamp-3">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(item.eventDate)}
                        </div>

                        {item.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {item.location}
                          </div>
                        )}
                      </div>

                      {item.clientName && (
                        <div className="pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-600">
                            Client:{" "}
                            <span className="font-medium text-gray-900">
                              {item.clientName}
                            </span>
                          </p>
                        </div>
                      )}

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          onClick={() => openLightbox(item, 0)}
                          className="bg-amber-600 hover:bg-amber-700 text-white flex-1"
                        >
                          View Gallery
                        </Button>
                        {item.videoUrl && (
                          <Button asChild variant="outline" className="flex-1">
                            <a
                              href={item.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Watch Video
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Events Found
              </h3>
              <p className="text-gray-600 mb-8">
                {selectedEventType === "all"
                  ? "We're currently updating our portfolio. Please check back soon!"
                  : `No ${selectedEventType.replace("-", " ")} events found. Try selecting a different filter.`}
              </p>
              <Button
                asChild
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Create Your Own Memorable Event?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Let us bring your vision to life with the same attention to detail
            and creativity you see in our portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100"
            >
              <Link href="/booking">Start Planning</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
        index={lightboxIndex}
      />
    </div>
  );
}
