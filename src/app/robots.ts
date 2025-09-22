import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/admin/",
        "/studio/",
        "/private/",
      ],
    },
    sitemap: "https://premiumandclassy.com/sitemap.xml",
  };
}
