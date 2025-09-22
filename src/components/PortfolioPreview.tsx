import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/types";
import { urlFor } from "@/lib/sanity";
import { sectionImages } from "@/lib/section-images";
import { getDefaultPortfolioImage } from "@/lib/portfolio-images";
import { GalleryModal } from "@/components/GalleryModal";
import { ArrowRight, Calendar, MapPin, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PortfolioPreviewProps {
  portfolio: Portfolio[];
}

export function PortfolioPreview({ portfolio }: PortfolioPreviewProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Show only first 6 portfolio items in preview
  const previewPortfolio = portfolio.slice(0, 6);
  
  const openGallery = (item: Portfolio) => {
    setSelectedPortfolio(item);
    setIsModalOpen(true);
  };
  
  const closeGallery = () => {
    setIsModalOpen(false);
    setSelectedPortfolio(null);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={sectionImages.portfolio.gallery}
          alt="Event gallery background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a look at some of the beautiful events we&apos;ve had the pleasure
            of planning and executing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewPortfolio.map((item) => (
            <div key={item._id} className="group cursor-pointer">
              <Link href={`/portfolio/${item.slug.current}`}>
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Main Image */}
                  <div className="relative h-80 overflow-hidden">
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

                    {/* Hover Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          openGallery(item);
                        }}
                        className="bg-white/90 hover:bg-white text-gray-900 border-white"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Gallery
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
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
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          Client:{" "}
                          <span className="font-medium">{item.clientName}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Link href="/portfolio">
              View Full Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Gallery Modal */}
      {selectedPortfolio && (
        <GalleryModal
          isOpen={isModalOpen}
          onClose={closeGallery}
          portfolio={selectedPortfolio}
        />
      )}
    </section>
  );
}
