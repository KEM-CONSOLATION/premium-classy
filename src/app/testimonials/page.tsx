"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client, queries } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Testimonial } from "@/types";
import { Star, Quote, Filter, Calendar, Heart } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    Testimonial[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testimonialsData = await client.fetch(queries.testimonials);
        setTestimonials(testimonialsData || []);
        setFilteredTestimonials(testimonialsData || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter testimonials
  useEffect(() => {
    let filtered = testimonials;

    if (selectedEventType !== "all") {
      filtered = filtered.filter(
        (item) => item.eventType === selectedEventType
      );
    }

    if (selectedRating > 0) {
      filtered = filtered.filter((item) => item.rating >= selectedRating);
    }

    setFilteredTestimonials(filtered);
  }, [selectedEventType, selectedRating, testimonials]);

  // Get unique event types for filter
  const eventTypes = Array.from(
    new Set(testimonials.map((item) => item.eventType).filter(Boolean))
  );

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

  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 0;

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
      <section className="relative py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
              Client Testimonials
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Don&apos;t just take our word for it. Here&apos;s what our amazing clients
              have to say about their experience working with us.
            </p>

            {/* Stats */}
            {testimonials.length > 0 && (
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
                <div className="text-gray-600">
                  Based on {testimonials.length} reviews
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Event Type Filter */}
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-600" />
              <label className="text-sm text-gray-600">Event Type:</label>
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type
                      ? type.charAt(0).toUpperCase() +
                        type.slice(1).replace("-", " ")
                      : "Other"}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-gray-600" />
              <label className="text-sm text-gray-600">Minimum Rating:</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={3}>3+ Stars</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial) => (
                <Card
                  key={testimonial._id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white h-full"
                >
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote className="h-10 w-10 text-amber-400" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow">
                      &quot;{testimonial.feedback}&quot;
                    </blockquote>

                    {/* Client Info */}
                    <div className="mt-auto">
                      <div className="flex items-center mb-4">
                        <div className="relative mr-4">
                          {testimonial.clientPhoto ? (
                            <Image
                              src={urlFor(testimonial.clientPhoto)
                                .width(60)
                                .height(60)
                                .url()}
                              alt={
                                testimonial.clientPhoto.alt ||
                                testimonial.clientName
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

                        <div>
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
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            Event Date: {formatDate(testimonial.eventDate)}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Reviews Found
              </h3>
              <p className="text-gray-600 mb-8">
                {testimonials.length === 0
                  ? "We&apos;re working hard to collect testimonials from our amazing clients. Check back soon!"
                  : "No reviews match your current filters. Try adjusting your search criteria."}
              </p>
              <Button
                asChild
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Link href="/contact">Share Your Experience</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Rating Breakdown */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Rating Breakdown
              </h2>
              <p className="text-gray-600">
                See how our clients rate different aspects of our service
              </p>
            </div>

            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = testimonials.filter(
                  (t) => t.rating === rating
                ).length;
                const percentage =
                  testimonials.length > 0
                    ? (count / testimonials.length) * 100
                    : 0;

                return (
                  <div key={rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 w-20">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-amber-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 w-16">
                      {count} ({percentage.toFixed(0)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Experience the same level of service and attention to detail that
            our clients rave about.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100"
            >
              <Link href="/booking">Book Your Event</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
