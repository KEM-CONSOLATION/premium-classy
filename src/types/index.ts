export interface SiteSettings {
  _id: string;
  brandName: string;
  tagline: string;
  description?: string;
  logo?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  primaryColor?: string;
  secondaryColor?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    whatsappNumber?: string;
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  heroSection?: {
    backgroundImage?: {
      asset: {
        _ref: string;
        _type: "reference";
      };
      alt?: string;
    };
    headline?: string;
    subheadline?: string;
    ctaText?: string;
  };
  aboutSection?: {
    title?: string;
    description?: string;
    founderName?: string;
    founderBio?: string;
    founderImage?: {
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    yearsOfExperience?: number;
    eventsPlanned?: number;
  };
  seoSettings?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: {
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
  };
}

export interface Service {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  priceRange?: string;
  featuredImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  features?: string[];
  order: number;
  isActive: boolean;
}

export interface Portfolio {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  eventType: string;
  eventDate: string;
  images?: Array<{
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
    caption?: string;
  }>;
  gallery?: Array<{
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
    caption?: string;
  }>;
  videoUrl?: string;
  description?: string;
  clientName?: string;
  location?: string;
  isFeatured: boolean;
  tags?: string[];
}

export interface Testimonial {
  _id: string;
  clientName: string;
  feedback: string;
  eventType?: string;
  clientPhoto?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  rating: number;
  eventDate?: string;
  isPublished: boolean;
  order: number;
}

export interface Booking {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  eventType: "wedding" | "birthday" | "corporate" | "other";
  eventDate: string;
  message?: string;
  status: "pending" | "contacted" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
}

export interface ContactInquiry {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType: "general" | "service" | "quote" | "partnership" | "other";
  status: "new" | "in-progress" | "replied" | "closed";
  createdAt?: string;
}
