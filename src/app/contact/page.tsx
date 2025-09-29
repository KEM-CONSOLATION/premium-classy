"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fetchSiteSettings } from "@/lib/sanity";
import { sendContactNotification } from "@/lib/email";
import { SiteSettings, ContactInquiry } from "@/types";
import { sectionImages, imageAlts } from "@/lib/section-images";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.enum(["general", "service", "quote", "partnership", "other"], {
    message: "Please select an inquiry type",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = await fetchSiteSettings();
        setSiteSettings(settingsData);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const inquiryData: Omit<ContactInquiry, "_id"> = {
        ...data,
        status: "new",
        createdAt: new Date().toISOString(),
      };

      // Save to Sanity CMS
      const response = await fetch("/api/sanity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _type: "contactInquiry",
          ...inquiryData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Send email notification (optional - won't fail if templates not set up)
      try {
        await sendContactNotification(data);
      } catch (emailError) {
        console.log("Email notification failed (templates may not be set up yet):", emailError);
        // Don't throw error - form submission still succeeds
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = siteSettings?.contactInfo;
  const socialLinks = siteSettings?.socialLinks;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={sectionImages.contact.background}
            alt={imageAlts.contact.background}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to start planning your dream event? We&apos;d love to hear from
              you. Get in touch and let&apos;s create something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <a
                  href="tel:+2349022603658"
                  className="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  +234 (0) 902 260 3658
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/2349022603658"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  09022603658
                </a>
              </CardContent>
            </Card>

            {/* Email */}
            {contactInfo?.email && (
              <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-amber-600 hover:text-amber-700 transition-colors break-all"
                  >
                    {contactInfo.email}
                  </a>
                </CardContent>
              </Card>
            )}

            {/* WhatsApp */}
            {contactInfo?.whatsappNumber && (
              <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <a
                    href={generateWhatsAppUrl(
                      contactInfo.whatsappNumber,
                      "Hello! I'd like to inquire about your event planning services."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    Message Us
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Business Hours */}
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Business Hours
                </h3>
                <div className="text-sm text-gray-600">
                  <p>Mon - Fri: 9AM - 6PM</p>
                  <p>Sat: 10AM - 4PM</p>
                  <p>Sun: By Appointment</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">
                  Send Us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you as soon as
                  possible.
                </p>
              </CardHeader>

              <CardContent className="p-8">
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-green-800 font-medium">
                        Message sent successfully!
                      </p>
                      <p className="text-green-700 text-sm">
                        We&apos;ll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                    <div>
                      <p className="text-red-800 font-medium">
                        Something went wrong
                      </p>
                      <p className="text-red-700 text-sm">
                        Please try again or contact us directly.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="mt-1"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <select
                        id="inquiryType"
                        {...register("inquiryType")}
                        className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="general">General Inquiry</option>
                        <option value="service">Service Question</option>
                        <option value="quote">Quote Request</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.inquiryType && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.inquiryType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      className="mt-1"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      className="mt-1"
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address */}
              {contactInfo?.address && (
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Visit Our Office
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {contactInfo.address}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Social Media */}
              {(socialLinks?.instagram || socialLinks?.facebook) && (
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Follow Us
                    </h3>
                    <div className="flex space-x-4">
                      {socialLinks.instagram && (
                        <a
                          href={socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors"
                        >
                          <Instagram className="h-6 w-6 text-amber-600" />
                        </a>
                      )}
                      {socialLinks.facebook && (
                        <a
                          href={socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors"
                        >
                          <Facebook className="h-6 w-6 text-amber-600" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* FAQ */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Answers
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        How far in advance should I book?
                      </h4>
                      <p className="text-sm text-gray-600">
                        We recommend booking 3-6 months in advance for optimal
                        planning and vendor availability.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Do you offer partial planning?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Yes! We offer full-service, partial, and day-of
                        coordination packages.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        What&apos;s included in your services?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Each package is customized, but typically includes venue
                        sourcing, vendor coordination, timeline creation, and
                        day-of management.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={sectionImages.booking.consultation}
            alt="Event planning consultation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-amber-600/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Don&apos;t wait - the best dates and vendors book up quickly. Let&apos;s start
            creating your perfect event today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-amber-600 hover:bg-gray-100"
          >
            <a href="/booking">Book Your Consultation</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
