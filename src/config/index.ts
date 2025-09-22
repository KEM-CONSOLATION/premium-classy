// Centralized configuration
export const config = {
  sanity: {
    projectId: "xwppcaz9",
    dataset: "production",
    apiVersion: "2023-12-01",
    token: process.env.SANITY_API_TOKEN || "skrZBwXO2y44u5DEU8RHwjBmZUDMd8lxmexpkCrPWl9XqvIatrfhhqDaDlrcbyKUByjfwFDqvEA3NCOCO7f4GoHJhU5Sdxzhou0dkDhV43eFHTDcv5BFS4POY9pRyrlYKFTFfC3qNRzGUzYAEEOAYj1r6FX4zIK709234nheJl0btv8Sdjio",
    studioUrl: "http://localhost:3333",
    useCdn: process.env.NODE_ENV === "production",
  },
  app: {
    name: "Premium&Classy",
    url: process.env.NODE_ENV === "production" ? "https://your-domain.com" : "http://localhost:3000",
  },
};
