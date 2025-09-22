// High-quality event planning hero images from Unsplash
export const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    alt: "Elegant wedding reception setup with beautiful table decorations and ambient lighting",
    credit: "Photo by Al Elmes on Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    alt: "Beautiful outdoor wedding ceremony setup with white chairs and floral decorations",
    credit: "Photo by Samantha Gades on Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1519167758481-83f29c5c6ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
    alt: "Luxury corporate event setup with elegant table settings and professional lighting",
    credit: "Photo by Jason Leung on Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Festive birthday party celebration with colorful decorations and balloons",
    credit: "Photo by Pablo Heimplatz on Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Elegant dinner party table setting with candles and premium decorations",
    credit: "Photo by Jay Wennington on Unsplash"
  }
];

// Get a random hero image
export function getRandomHeroImage() {
  return heroImages[Math.floor(Math.random() * heroImages.length)];
}

// Default hero image (most elegant wedding setup)
export const defaultHeroImage = heroImages[0];
