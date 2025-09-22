"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client, queries } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Service } from "@/types";
import { sectionImages, imageAlts, serviceImages } from "@/lib/section-images";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await client.fetch(queries.services);
        setServices(servicesData || []);
      } catch (error) {
        console.error("Error fetching services:", error);
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={sectionImages.services.background}
            alt={imageAlts.services.background}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we offer
              comprehensive event planning services tailored to your unique
              vision and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our full-service event planning approach ensures every detail is
              perfect, from concept to execution.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Consultation
              </h3>
              <p className="text-gray-600">
                We discuss your vision, budget, and requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Planning
              </h3>
              <p className="text-gray-600">
                We create a detailed plan and timeline
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Coordination
              </h3>
              <p className="text-gray-600">We manage vendors and logistics</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Execution
              </h3>
              <p className="text-gray-600">
                We bring your vision to life flawlessly
              </p>
            </div>
          </div>

          {/* Services List */}
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={service._id}
                id={service.slug.current}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-80 lg:h-auto ${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                  >
                    {service.featuredImage ? (
                      <Image
                        src={urlFor(service.featuredImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={service.featuredImage.alt || service.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={serviceImages[service.slug.current as keyof typeof serviceImages] || sectionImages.services.wedding}
                          alt={`${service.title} - Premium&Classy event planning service`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`p-8 lg:p-12 flex flex-col justify-center ${
                      index % 2 === 1 ? "lg:col-start-1" : ""
                    }`}
                  >
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                        {service.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 space-y-6">
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {service.description}
                      </p>

                      {service.priceRange && (
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <p className="text-amber-800 font-semibold">
                            Starting from: {service.priceRange}
                          </p>
                        </div>
                      )}

                      {service.features && service.features.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            What&apos;s Included:
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {service.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-center space-x-3"
                              >
                                <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          asChild
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          <Link href="/booking">
                            Book This Service
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/contact">Get Quote</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No services fallback */}
          {services.length === 0 && (
            <div className="text-center py-20">
              <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Services Coming Soon
              </h3>
              <p className="text-gray-600 mb-8">
                We&apos;re currently updating our services. Please check back soon or
                contact us directly.
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Don&apos;t See What You&apos;re Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We specialize in custom event planning. Let us know your vision, and
            we&apos;ll make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/contact">Custom Event Planning</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
