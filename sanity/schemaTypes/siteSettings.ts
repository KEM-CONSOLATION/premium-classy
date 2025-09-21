import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Used for SEO meta description",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Small icon for browser tabs",
    }),
    defineField({
      name: "primaryColor",
      title: "Primary Color",
      type: "string",
      description: "Hex color code (e.g., #D4AF37)",
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error(
          "Must be a valid hex color"
        ),
    }),
    defineField({
      name: "secondaryColor",
      title: "Secondary Color",
      type: "string",
      description: "Hex color code (e.g., #F5F5DC)",
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error(
          "Must be a valid hex color"
        ),
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "phone",
          title: "Phone Number",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
        },
        {
          name: "address",
          title: "Address",
          type: "text",
          rows: 2,
        },
        {
          name: "whatsappNumber",
          title: "WhatsApp Number",
          type: "string",
          description: "Include country code (e.g., +1234567890)",
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
        },
        {
          name: "facebook",
          title: "Facebook",
          type: "url",
        },
        {
          name: "tiktok",
          title: "TikTok",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter",
          type: "url",
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
        {
          name: "youtube",
          title: "YouTube",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
        {
          name: "headline",
          title: "Headline",
          type: "string",
        },
        {
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 2,
        },
        {
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
          initialValue: "Book Your Event",
        },
      ],
    }),
    defineField({
      name: "aboutSection",
      title: "About Section",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Section Title",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        },
        {
          name: "founderName",
          title: "Founder Name",
          type: "string",
        },
        {
          name: "founderBio",
          title: "Founder Bio",
          type: "text",
          rows: 3,
        },
        {
          name: "founderImage",
          title: "Founder Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "yearsOfExperience",
          title: "Years of Experience",
          type: "number",
        },
        {
          name: "eventsPlanned",
          title: "Events Planned",
          type: "number",
        },
      ],
    }),
    defineField({
      name: "seoSettings",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Title tag for search engines",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
          description: "Description for search engines (150-160 characters)",
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          description: "SEO keywords",
        },
        {
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Image for social media sharing",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "brandName",
      subtitle: "tagline",
      media: "logo",
    },
  },
});
