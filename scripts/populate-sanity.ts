import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xwppcaz9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

// Sample data for services
const sampleServices = [
  {
    _type: 'service',
    title: 'Wedding Planning',
    slug: { current: 'wedding-planning' },
    description: 'Complete wedding planning service from concept to execution. We handle every detail to make your special day perfect.',
    priceRange: '$5,000 - $15,000',
    features: [
      'Initial consultation and vision planning',
      'Vendor selection and management',
      'Timeline and budget management',
      'Day-of coordination',
      'Setup and breakdown supervision'
    ],
    order: 1,
    isActive: true,
  },
  {
    _type: 'service',
    title: 'Corporate Events',
    slug: { current: 'corporate-events' },
    description: 'Professional corporate event planning for conferences, team building, product launches, and company celebrations.',
    priceRange: '$3,000 - $25,000',
    features: [
      'Venue selection and booking',
      'Catering coordination',
      'Audio/visual equipment setup',
      'Registration management',
      'Post-event analytics'
    ],
    order: 2,
    isActive: true,
  },
  {
    _type: 'service',
    title: 'Birthday Parties',
    slug: { current: 'birthday-parties' },
    description: 'Memorable birthday celebrations for all ages. From intimate gatherings to grand celebrations.',
    priceRange: '$1,500 - $8,000',
    features: [
      'Theme development',
      'Venue decoration',
      'Entertainment coordination',
      'Cake and catering',
      'Photography arrangement'
    ],
    order: 3,
    isActive: true,
  },
  {
    _type: 'service',
    title: 'Anniversary Celebrations',
    slug: { current: 'anniversary-celebrations' },
    description: 'Celebrate your milestones with elegant anniversary parties that honor your journey together.',
    priceRange: '$2,500 - $12,000',
    features: [
      'Romantic venue selection',
      'Memory display creation',
      'Guest coordination',
      'Special entertainment',
      'Keepsake arrangements'
    ],
    order: 4,
    isActive: true,
  }
];

// Sample data for portfolio items
const samplePortfolio = [
  {
    _type: 'portfolio',
    title: 'Elegant Garden Wedding',
    description: 'A stunning outdoor wedding celebration featuring romantic garden themes, fairy lights, and natural floral arrangements.',
    eventType: 'wedding',
    date: '2024-06-15',
    location: 'Botanical Gardens, San Francisco',
    clientTestimonial: 'Our wedding was absolutely perfect! Every detail was thoughtfully planned and executed flawlessly.',
    gallery: [],
    featured: true,
  },
  {
    _type: 'portfolio',
    title: 'Tech Company Product Launch',
    description: 'High-energy product launch event with interactive displays, live demonstrations, and networking opportunities.',
    eventType: 'corporate',
    date: '2024-03-22',
    location: 'Convention Center, Silicon Valley',
    clientTestimonial: 'The event exceeded our expectations and generated incredible buzz for our new product.',
    gallery: [],
    featured: true,
  },
  {
    _type: 'portfolio',
    title: 'Sweet 16 Birthday Bash',
    description: 'Glamorous Sweet 16 party with a Hollywood theme, red carpet entrance, and professional photography.',
    eventType: 'birthday',
    date: '2024-01-20',
    location: 'Private Estate, Malibu',
    clientTestimonial: 'My daughter felt like a movie star! It was the party of her dreams.',
    gallery: [],
    featured: false,
  },
  {
    _type: 'portfolio',
    title: '25th Anniversary Gala',
    description: 'Sophisticated anniversary celebration with live jazz music, gourmet dining, and touching tribute videos.',
    eventType: 'anniversary',
    date: '2024-05-10',
    location: 'Historic Ballroom, Downtown',
    clientTestimonial: 'A beautiful celebration of our 25 years together. Our guests are still talking about it!',
    gallery: [],
    featured: false,
  }
];

// Sample testimonials
const sampleTestimonials = [
  {
    _type: 'testimonial',
    clientName: 'Sarah & Michael Johnson',
    eventType: 'Wedding',
    rating: 5,
    testimonial: 'Working with this team was the best decision we made for our wedding. They turned our vision into reality and handled every detail with professionalism and care. Our guests are still raving about how perfect everything was!',
    date: '2024-06-15',
    featured: true,
  },
  {
    _type: 'testimonial',
    clientName: 'Jennifer Martinez',
    eventType: 'Corporate Event',
    rating: 5,
    testimonial: 'Our product launch was a huge success thanks to their meticulous planning and execution. They understood our brand perfectly and created an event that truly represented our company values.',
    date: '2024-03-22',
    featured: true,
  },
  {
    _type: 'testimonial',
    clientName: 'David Chen',
    eventType: 'Birthday Party',
    rating: 5,
    testimonial: 'My daughter\'s Sweet 16 was absolutely magical. The attention to detail was incredible, and seeing her face light up made every penny worth it. Thank you for making her dreams come true!',
    date: '2024-01-20',
    featured: false,
  },
  {
    _type: 'testimonial',
    clientName: 'Robert & Linda Williams',
    eventType: 'Anniversary',
    rating: 5,
    testimonial: 'Our 25th anniversary celebration was beyond our expectations. The team captured the essence of our journey together and created an evening we\'ll never forget. Highly recommended!',
    date: '2024-05-10',
    featured: false,
  }
];

// Sample site settings
const sampleSiteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  brandName: 'Elegant Events Co.',
  tagline: 'Creating Unforgettable Moments',
  description: 'Professional event planning services for weddings, corporate events, birthdays, and special celebrations. We bring your vision to life with attention to detail and personalized service.',
  primaryColor: '#D4AF37',
  secondaryColor: '#F5F5DC',
  contactInfo: {
    email: 'hello@elegantevents.co',
    phone: '+234 (81) 3677-9904',
    address: '123 Event Plaza, Suite 456\nSan Francisco, CA 94102',
    whatsappNumber: '+2348136779904',
  },
  socialLinks: {
    instagram: 'https://instagram.com/eleganteventsco',
    facebook: 'https://facebook.com/eleganteventsco',
    tiktok: 'https://tiktok.com/@eleganteventsco',
    linkedin: 'https://linkedin.com/company/elegant-events-co',
  },
  heroSection: {
    headline: 'Creating Unforgettable Events',
    subheadline: 'From intimate gatherings to grand celebrations, we bring your vision to life with meticulous planning and flawless execution.',
    ctaText: 'Book Your Event',
  },
  aboutSection: {
    title: 'About Elegant Events',
    description: 'With over 10 years of experience in event planning, we specialize in creating memorable experiences that reflect your unique style and vision. Our dedicated team handles every detail, so you can focus on enjoying your special moments.',
    founderName: 'Sarah Johnson',
    founderBio: 'With a passion for creating magical moments, Sarah has been transforming visions into reality for over a decade. Her attention to detail and creative flair have made countless events truly unforgettable.',
    yearsOfExperience: 10,
    eventsPlanned: 500,
  },
  seoSettings: {
    metaTitle: 'Elegant Events Co. - Professional Event Planning Services',
    metaDescription: 'Professional event planning for weddings, corporate events, and special celebrations. Creating unforgettable moments with attention to detail.',
    keywords: ['event planning', 'wedding planning', 'corporate events', 'birthday parties', 'anniversary celebrations', 'San Francisco events'],
  },
};

async function populateSanity() {
  try {
    console.log('🚀 Starting Sanity population...');

    // Create services
    console.log('📝 Creating services...');
    for (const service of sampleServices) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await client.create(service);
      console.log(`✅ Created service: ${service.title}`);
    }

    // Create portfolio items
    console.log('🎨 Creating portfolio items...');
    for (const item of samplePortfolio) {
      const result = await client.create(item);
      console.log(`✅ Created portfolio item: ${item.title}`);
    }

    // Create testimonials
    console.log('💬 Creating testimonials...');
    for (const testimonial of sampleTestimonials) {
      const result = await client.create(testimonial);
      console.log(`✅ Created testimonial from: ${testimonial.clientName}`);
    }

    // Create/update site settings
    console.log('⚙️ Creating site settings...');
    const settingsResult = await client.createOrReplace(sampleSiteSettings);
    console.log('✅ Created site settings');

    console.log('🎉 Sanity population completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- ${sampleServices.length} services created`);
    console.log(`- ${samplePortfolio.length} portfolio items created`);
    console.log(`- ${sampleTestimonials.length} testimonials created`);
    console.log('- 1 site settings document created');
    console.log('\n🎯 Next steps:');
    console.log('1. Visit your Sanity Studio to see the data');
    console.log('2. Add images to your portfolio and services');
    console.log('3. Customize the content to match your brand');

  } catch (error) {
    console.error('❌ Error populating Sanity:', error);
    process.exit(1);
  }
}

// Run the population script
populateSanity();
