import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/types";
import { urlFor } from "@/lib/sanity";
import { serviceImages, sectionImages } from "@/lib/section-images";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

interface ServicesPreviewProps {
  services: Service[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  // Show only first 3 services in preview
  const previewServices = services.slice(0, 3);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={sectionImages.decorative.elegant}
          alt="Elegant event setup background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/85" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we bring your vision
            to life with meticulous planning and flawless execution.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {previewServices.map((service) => (
            <motion.div key={service._id} variants={staggerItem}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
              <div className="relative h-64 overflow-hidden">
                {service.featuredImage ? (
                  <Image
                    src={urlFor(service.featuredImage)
                      .width(400)
                      .height(300)
                      .url()}
                    alt={service.featuredImage.alt || service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <Image
                    src={serviceImages[service.slug.current as keyof typeof serviceImages] || sectionImages.services.wedding}
                    alt={`${service.title} - Premium&Classy event planning service`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.description}
                </p>

                {service.priceRange && (
                  <p className="text-amber-600 font-semibold mb-4">
                    {service.priceRange}
                  </p>
                )}

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-colors duration-300"
                >
                  <Link href={`/services#${service.slug.current}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
