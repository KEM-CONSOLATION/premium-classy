# Event Planner Website

A professional, mobile-friendly website for event planners built with Next.js and Sanity CMS. This website serves as a digital business card, portfolio showcase, and client acquisition tool.

## Features

### Frontend Pages

- **Home Page**: Hero section, services preview, portfolio preview, testimonials
- **About Page**: Brand story, mission, founder/team bio with stats
- **Services Page**: Dynamic list of services from Sanity CMS
- **Portfolio Page**: Image gallery with lightbox functionality
- **Testimonials Page**: Client feedback with rating system
- **Booking Page**: Contact form for event bookings
- **Contact Page**: Contact information, social links, WhatsApp integration

### Backend (Sanity CMS)

- **Booking Management**: Store and manage client inquiries
- **Service Management**: Add/edit services with images and pricing
- **Portfolio Management**: Upload event photos and details
- **Testimonial System**: Collect and display client reviews
- **Site Settings**: Manage brand information, contact details, social links

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Sanity CMS (headless)
- **UI Components**: Radix UI, Lucide Icons
- **Forms**: React Hook Form with Zod validation
- **Image Gallery**: Yet Another React Lightbox
- **Deployment**: Vercel (frontend), Sanity Studio (backend)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (free)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd event-planner-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Sanity**

   a. Create a new Sanity project at [sanity.io](https://sanity.io)

   b. Get your project ID and dataset name

   c. Create environment variables:

   ```bash
   # Create .env.local file
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-12-01
   SANITY_API_READ_TOKEN=your-read-token
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Deploy Sanity schemas**

   ```bash
   npx sanity deploy
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Access Sanity Studio**
   ```bash
   npx sanity manage
   ```

### Setting up Content

1. **Access Sanity Studio** at your project URL
2. **Create Site Settings** - Add brand name, tagline, contact info, social links
3. **Add Services** - Create your event planning services
4. **Upload Portfolio** - Add event photos and details
5. **Collect Testimonials** - Add client reviews and ratings

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── about/             # About page
│   ├── booking/           # Booking form page
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio gallery
│   ├── services/          # Services page
│   ├── testimonials/      # Testimonials page
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Site header
│   ├── Footer.tsx        # Site footer
│   └── ...               # Page-specific components
├── lib/                  # Utilities and configurations
│   ├── sanity.ts         # Sanity client and queries
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
└── styles/               # Global styles

sanity/
└── schemaTypes/          # Sanity CMS schemas
    ├── booking.ts        # Booking form data
    ├── service.ts        # Services content
    ├── portfolio.ts      # Portfolio items
    ├── testimonial.ts    # Client testimonials
    ├── contactInquiry.ts # Contact form data
    └── siteSettings.ts   # Site configuration
```

## Customization

### Branding

- Update colors in `tailwind.config.ts` and `globals.css`
- Replace logo and favicon in `/public` folder
- Modify site settings in Sanity Studio

### Content

- All content is managed through Sanity CMS
- No code changes needed for content updates
- Images are automatically optimized

### Styling

- Built with Tailwind CSS for easy customization
- Mobile-first responsive design
- Elegant color scheme (amber/gold accent)

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Sanity)

1. Deploy Sanity Studio: `npx sanity deploy`
2. Access at `https://your-project.sanity.studio`

## Environment Variables

```bash
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-12-01

# Optional
SANITY_API_READ_TOKEN=your-read-token
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Performance Features

- Image optimization with Next.js Image component
- Lazy loading for portfolio images
- Responsive images with Sanity CDN
- Fast page loads with static generation
- SEO-optimized meta tags

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly interface
- Accessibility features included

## Support

For questions or issues:

1. Check the documentation
2. Review Sanity CMS guides
3. Contact the development team

## License

This project is created for professional event planning businesses. Please customize branding and content for your specific use case.

---

**Built with ❤️ for unforgettable events**
