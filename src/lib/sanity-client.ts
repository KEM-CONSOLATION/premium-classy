// Alternative Sanity client for production to avoid CORS issues
import { config } from "@/config";

class SanityClientProxy {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.app.url;
  }

  async fetch(query: string) {
    const url = `${this.baseUrl}/api/sanity?query=${encodeURIComponent(query)}`;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Sanity proxy fetch error:", error);
      throw error;
    }
  }

  async create(document: Record<string, unknown>) {
    const url = `${this.baseUrl}/api/sanity`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Sanity proxy create error:", error);
      throw error;
    }
  }
}

// Use proxy client in production, direct client in development
export const sanityClient = process.env.NODE_ENV === "production" 
  ? new SanityClientProxy()
  : null; // Will fall back to direct client
