// Centralized configuration
export const config = {
  sanity: {
    projectId: "xwppcaz9",
    dataset: "production",
    apiVersion: "2023-12-01",
    // No token for public read access - eliminates CORS issues
    studioUrl: process.env.NODE_ENV === "production" ? "https://premiumandclassy.netlify.app" : "http://localhost:3333",
    useCdn: true, // Always use CDN for better performance
    ignoreBrowserTokenWarning: true,
    perspective: "published",
    // Write token for forms (hardcoded to avoid Netlify env vars)
    writeToken: "skqGXtBRkOOYNOr2xHzDlLAFV2nIbFVdQsRuEObHE2kaNUV5LvQMmAm9Yua19PdVSVbPF0zswcGYd84geFtzwdPYGSLXynjOjhZN0qTs1kYiEK2cMdQ4XQNnrASnm5WsfNAcWQp7IAal3lyCogTS00QCzAIRWYLZjPw81eABm6eZWoomHFG7",
  },
  app: {
    name: "Premium&Classy",
    url: process.env.NODE_ENV === "production" ? "https://premiumandclassy.netlify.app" : "http://localhost:3000",
  },
};
