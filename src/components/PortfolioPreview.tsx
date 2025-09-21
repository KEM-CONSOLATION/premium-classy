import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/types";
import { urlFor } from "@/lib/sanity";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PortfolioPreviewProps {
  portfolio: Portfolio[];
}

export function PortfolioPreview({ portfolio }: PortfolioPreviewProps) {
  // Show only first 6 portfolio items in preview
  const previewPortfolio = portfolio.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    {item.images && item.images.length > 0 ? (
                      <Image
                        src={urlFor(item.images[0])
                          .width(500)
                          .height(400)
                          .url()}
                        alt={item.images[0].alt || item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {item.title.charAt(0)}
                        </span>
                      </div>
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
                        className="bg-white/90 hover:bg-white text-gray-900 border-white"
                      >
                        View Gallery
                        <ArrowRight className="ml-2 h-4 w-4" />
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
    </section>
  );
}
