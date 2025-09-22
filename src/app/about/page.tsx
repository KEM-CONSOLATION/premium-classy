"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client, queries } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { SiteSettings } from "@/types";
import { sectionImages, imageAlts } from "@/lib/section-images";
import { Heart, Award, Users, Clock, Star, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = await client.fetch(queries.siteSettings);
        setSiteSettings(settingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const aboutSection = siteSettings?.aboutSection;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={sectionImages.about.background}
            alt={imageAlts.about.background}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              {aboutSection?.title || "About Premium&Classy"}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {aboutSection?.description ||
                "We are passionate event planners dedicated to turning your dreams into unforgettable experiences."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {aboutSection?.description ||
                    `Every great event starts with a vision. Our journey began with a simple belief:
                    that every celebration, whether intimate or grand, deserves to be extraordinary.
                    We understand that behind every event is a story waiting to be told, a memory
                    waiting to be created.`}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With meticulous attention to detail and a passion for
                  perfection, we transform your ideas into reality. From the
                  initial consultation to the final farewell, we&apos;re with you
                  every step of the way, ensuring your event is everything you
                  dreamed it would be and more.
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Passion</h3>
                    <p className="text-sm text-gray-600">We love what we do</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Excellence</h3>
                    <p className="text-sm text-gray-600">
                      Quality in every detail
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Partnership</h3>
                    <p className="text-sm text-gray-600">
                      Your vision, our expertise
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Reliability</h3>
                    <p className="text-sm text-gray-600">
                      Always on time, on budget
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              {aboutSection?.founderImage ? (
                <Image
                  src={urlFor(aboutSection.founderImage)
                    .width(600)
                    .height(600)
                    .url()}
                  alt="Founder"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-xl object-cover"
                />
              ) : (
                <div className="relative w-full h-96 rounded-lg shadow-xl overflow-hidden">
                  <Image
                    src={sectionImages.about.founder}
                    alt={imageAlts.about.founder}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="text-center text-white">
                    <Users className="h-24 w-24 mx-auto mb-4" />
                    <p className="text-xl font-semibold">Our Team</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Founder/Team Section */}
      {aboutSection?.founderName && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Meet Our Founder
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2">
                {aboutSection.founderImage ? (
                  <Image
                    src={urlFor(aboutSection.founderImage)
                      .width(500)
                      .height(600)
                      .url()}
                    alt={aboutSection.founderName}
                    width={500}
                    height={600}
                    className="rounded-lg shadow-xl object-cover mx-auto"
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg shadow-xl flex items-center justify-center mx-auto max-w-md">
                    <span className="text-white text-6xl font-bold">
                      {aboutSection.founderName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="lg:order-1 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {aboutSection.founderName}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {aboutSection.founderBio ||
                    `With years of experience in event planning and a keen eye for detail,
                    our founder has dedicated their career to creating magical moments
                    for clients. Every event is approached with fresh creativity and
                    unwavering commitment to excellence.`}
                </p>

                {/* Achievements */}
                <div className="space-y-3">
                  {aboutSection.yearsOfExperience && (
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-amber-600" />
                      <span className="text-gray-700">
                        {aboutSection.yearsOfExperience}+ years of professional
                        experience
                      </span>
                    </div>
                  )}
                  {aboutSection.eventsPlanned && (
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-amber-600" />
                      <span className="text-gray-700">
                        {aboutSection.eventsPlanned}+ successful events planned
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-gray-700">
                      Certified event planning professional
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-gray-700">
                      Specialized in luxury and destination events
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak to our commitment and success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">
                  {aboutSection?.yearsOfExperience || "5"}+
                </div>
                <div className="text-gray-600 font-medium">
                  Years Experience
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">
                  {aboutSection?.eventsPlanned || "200"}+
                </div>
                <div className="text-gray-600 font-medium">Events Planned</div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">
                  100%
                </div>
                <div className="text-gray-600 font-medium">
                  Client Satisfaction
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">
                  <Star className="h-12 w-12 mx-auto fill-current" />
                </div>
                <div className="text-gray-600 font-medium">5-Star Reviews</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Plan Your Perfect Event?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Let&apos;s work together to create an unforgettable experience that
            exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100"
            >
              <Link href="/booking">Book Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
