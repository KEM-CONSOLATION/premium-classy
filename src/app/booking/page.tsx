"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendBookingNotification } from "@/lib/email";
import { Booking } from "@/types";
import {
  Clock,
  Users,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  eventType: z.enum(["wedding", "birthday", "corporate", "other"], {
    message: "Please select an event type",
  }),
  eventDate: z.string().min(1, "Please select an event date"),
  guestCount: z.string().min(1, "Please enter guest count"),
  budget: z.string().min(1, "Please enter budget range"),
  venue: z.string().optional(),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const bookingData: Omit<Booking, "_id"> = {
        ...data,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Save to Sanity CMS
      const response = await fetch("/api/sanity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _type: "booking",
          ...bookingData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Send email notification (optional - won't fail if templates not set up)
      try {
        await sendBookingNotification(data);
      } catch (emailError) {
        console.log("Email notification failed (templates may not be set up yet):", emailError);
        // Don't throw error - form submission still succeeds
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
              Book Your Event
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to turn your vision into reality? Fill out the form below
              and we&apos;ll get back to you within 24 hours to discuss your event
              details.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Submit Request
              </h3>
              <p className="text-gray-600">
                Fill out the booking form with your event details
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We&apos;ll Contact You
              </h3>
              <p className="text-gray-600">
                Our team will reach out within 24 hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Plan Together
              </h3>
              <p className="text-gray-600">
                We&apos;ll discuss your vision and create a custom plan
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Perfect Event
              </h3>
              <p className="text-gray-600">
                We&apos;ll execute your event flawlessly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif">
                    Event Booking Form
                  </CardTitle>
                  <p className="text-gray-600">
                    Please provide as much detail as possible to help us
                    understand your vision
                  </p>
                </CardHeader>

                <CardContent className="p-8">
                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-green-800 font-medium">
                          Booking request submitted!
                        </p>
                        <p className="text-green-700 text-sm">
                          We&apos;ll contact you within 24 hours.
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
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Personal Information
                      </h3>

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

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
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
                    </div>

                    {/* Event Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Event Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventType">Event Type *</Label>
                          <select
                            id="eventType"
                            {...register("eventType")}
                            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Select event type</option>
                            <option value="wedding">Wedding</option>
                            <option value="birthday">Birthday Party</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.eventType && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.eventType.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="eventDate">
                            Preferred Event Date *
                          </Label>
                          <Input
                            id="eventDate"
                            type="date"
                            min={today}
                            {...register("eventDate")}
                            className="mt-1"
                          />
                          {errors.eventDate && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.eventDate.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="guestCount">Guest Count *</Label>
                          <Input
                            id="guestCount"
                            {...register("guestCount")}
                            className="mt-1"
                            placeholder="e.g., 50-100"
                          />
                          {errors.guestCount && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.guestCount.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="budget">Budget Range *</Label>
                          <select
                            id="budget"
                            {...register("budget")}
                            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Select budget range</option>
                            <option value="Under $5,000">Under $5,000</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                            <option value="Over $50,000">Over $50,000</option>
                          </select>
                          {errors.budget && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.budget.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="venue">Venue (if known)</Label>
                        <Input
                          id="venue"
                          {...register("venue")}
                          className="mt-1"
                          placeholder="e.g., Hotel ballroom, outdoor garden, etc."
                        />
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <Label htmlFor="message">Additional Details</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className="mt-1"
                        rows={4}
                        placeholder="Tell us about your vision, guest count, budget range, special requirements, or any other details that would help us plan your perfect event..."
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        The more details you provide, the better we can tailor
                        our services to your needs.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Booking Request"
                      )}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      By submitting this form, you agree to be contacted by our
                      team regarding your event.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-gray-600">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Free Consultation</p>
                      <p className="text-sm text-gray-600">
                        Initial planning session
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Custom Planning</p>
                      <p className="text-sm text-gray-600">
                        Tailored to your vision
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Types */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Events We Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span>Weddings & Receptions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span>Birthday Celebrations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span>Corporate Events</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span>Anniversary Parties</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span>Baby Showers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span>Graduation Parties</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span>Holiday Celebrations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span>Custom Events</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
