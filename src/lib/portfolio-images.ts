// Sample portfolio images for different event types
export const portfolioImages = {
  wedding: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  corporate: [
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  birthday: [
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  anniversary: [
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
};

// Get sample images for a portfolio item based on event type
export function getPortfolioImages(eventType: string, count: number = 3) {
  const type = eventType.toLowerCase() as keyof typeof portfolioImages;
  const images = portfolioImages[type] || portfolioImages.wedding;
  
  return images.slice(0, count).map((url, index) => ({
    url,
    alt: `${eventType} event photo ${index + 1}`,
    caption: `Beautiful ${eventType} event planned by Premium&Classy`,
  }));
}

// Default portfolio image for items without photos
export function getDefaultPortfolioImage(eventType: string) {
  const type = eventType.toLowerCase() as keyof typeof portfolioImages;
  const images = portfolioImages[type] || portfolioImages.wedding;
  return {
    url: images[0],
    alt: `${eventType} event by Premium&Classy`,
    caption: `Professional ${eventType} event planning`,
  };
}
