# Extended PRD: Event Planner Website (with Sanity Backend)

## 1. Objective
Create a professional, mobile-friendly website for an event planner. Use Sanity CMS as the backend to manage bookings, portfolio, services, and testimonials. The site should act as a digital business card, portfolio, and client acquisition tool.

## 2. Target Users
- Individuals planning weddings, birthdays, and parties.
- Corporate clients seeking event management.
- Agencies/partners exploring event planning collaborations.

## 3. Core Features

### Frontend Pages/Sections

#### Home Page
- Hero section with tagline + background event photo.
- CTA: "Book an Event" button.
- Highlights: Services preview, Portfolio preview, Testimonials preview.

#### About Page/Section
- Brand story, mission, founder/team bio.

#### Services
- Dynamic list of services pulled from Sanity.
- Each with title, description, optional price range.

#### Portfolio/Gallery
- Grid of images/videos from Sanity.
- Lightbox effect on click.

#### Testimonials
- Client feedback (text + optional photo).

#### Booking Page
- Form fields: Name, Email, Phone, Event Type, Event Date, Message.
- Submits data to Sanity as a booking document.
- Confirmation message shown after submission.

#### Contact Page
- Contact form (connected to Sanity for logging inquiries).
- Phone number (click-to-call).
- WhatsApp button.
- Social links (Instagram, TikTok, Facebook).

## 4. Sanity Backend Data Models

### Booking
- name (string)
- email (string)
- phone (string)
- eventType (string: Wedding, Birthday, Corporate, Other)
- eventDate (datetime)
- message (text)
- status (string: Pending, Contacted, Confirmed — default: Pending)

### Service
- title (string)
- description (text)
- priceRange (string, optional)
- featuredImage (image, optional)

### Portfolio
- title (string)
- eventType (string)
- eventDate (datetime)
- images (array of images)
- videoUrl (url, optional)
- description (text, optional)

### Testimonial
- clientName (string)
- feedback (text)
- eventType (string, optional)
- clientPhoto (image, optional)

### Contact Inquiry (if separate from booking)
- name (string)
- email (string)
- phone (string, optional)
- message (text)

### Site Settings
- brandName (string)
- tagline (string)
- logo (image)
- primaryColor (string)
- socialLinks (Instagram, WhatsApp, TikTok, etc.)

## 5. Design Requirements
- Elegant, modern, minimal.
- Mobile-first responsive design.
- Neutral palette (white, black, gold) with accent colors.
- Typography: clean sans-serif + stylish serif for headings.

## 6. Technical Requirements
- Frontend: Next.js (for speed & SEO)
- Backend: Sanity CMS (headless, API-driven)
- Hosting: Vercel (frontend), Sanity Studio (backend)
- Performance: Image optimization, caching.
- Integrations: WhatsApp API, Instagram embed (optional).

## 7. Success Metrics
- Visitors easily find services and portfolio.
- At least 1 clear CTA per page.
- Booking form submits and stores data in Sanity.
- Portfolio, services, and testimonials updateable via Sanity Studio.
- Site loads under 3s on mobile.

## 8. Future Considerations
- Email/WhatsApp notifications when a booking is submitted.
- Online payment integration (Paystack/Stripe).
- Client dashboard for repeat customers.
- Blog section for SEO (stored in Sanity).
