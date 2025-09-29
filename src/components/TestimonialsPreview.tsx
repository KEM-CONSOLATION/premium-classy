import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Testimonial } from "@/types";
import { urlFor } from "@/lib/sanity";
import { sectionImages, imageAlts } from "@/lib/section-images";
import { fadeInUp } from "@/lib/animations";
import { Star, Quote, ArrowRight } from "lucide-react";

interface TestimonialsPreviewProps {
  testimonials: Testimonial[];
}

export function TestimonialsPreview({
  testimonials,
}: TestimonialsPreviewProps) {
  const previewTestimonials = testimonials?.slice(0, 6) || [];
  const duplicatedTestimonials = [...previewTestimonials, ...previewTestimonials];

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={sectionImages.testimonials.background}
            alt={imageAlts.testimonials.background}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/90" />
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our satisfied clients
              have to say about their experience with us.
            </p>
          </motion.div>
          
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Testimonials coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-amber-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={sectionImages.testimonials.background}
          alt={imageAlts.testimonials.background}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/90" />
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients
            have to say about their experience with us.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden mb-12">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -50 + "%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial._id}-${index}`}
                className="flex-shrink-0 w-80"
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white h-full">
                  <CardContent className="p-8">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote className="h-10 w-10 text-amber-400" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 mb-6 leading-relaxed">
                      &quot;{testimonial.feedback}&quot;
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center">
                      <div className="relative">
                        {testimonial.clientPhoto ? (
                          <Image
                            src={urlFor(testimonial.clientPhoto)
                              .width(60)
                              .height(60)
                              .url()}
                            alt={
                              testimonial.clientPhoto.alt || testimonial.clientName
                            }
                            width={60}
                            height={60}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {testimonial.clientName.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.clientName}
                        </h4>
                        {testimonial.eventType && (
                          <p className="text-sm text-gray-600 capitalize">
                            {testimonial.eventType.replace("-", " ")} Event
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Event Date */}
                    {testimonial.eventDate && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          Event Date:{" "}
                          {new Date(testimonial.eventDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Link href="/testimonials">
              Read More Reviews
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
