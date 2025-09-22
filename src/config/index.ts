// Centralized configuration
export const config = {
  sanity: {
    projectId: "xwppcaz9",
    dataset: "production",
    apiVersion: "2023-12-01",
    token: process.env.SANITY_API_TOKEN || "skrZBwXO2y44u5DEU8RHwjBmZUDMd8lxmexpkCrPWl9XqvIatrfhhqDaDlrcbyKUByjfwFDqvEA3NCOCO7f4GoHJhU5Sdxzhou0dkDhV43eFHTDcv5BFS4POY9pRyrlYKFTFfC3qNRzGUzYAEEOAYj1r6FX4zIK709234nheJl0btv8Sdjio",
    studioUrl: process.env.NODE_ENV === "production" ? "https://premiumandclassy.netlify.app" : "http://localhost:3333",
    useCdn: process.env.NODE_ENV === "production",
    // CORS configuration for production
    requestTagPrefix: process.env.NODE_ENV === "production" ? "premium-classy" : undefined,
    ignoreBrowserTokenWarning: true,
    perspective: "published",
  },
  app: {
    name: "Premium&Classy",
    url: process.env.NODE_ENV === "production" ? "https://premiumandclassy.netlify.app" : "http://localhost:3000",
  },
};
