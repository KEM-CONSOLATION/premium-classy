// EmailJS service for form submissions
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_kk9enic'; // Your EmailJS service ID
const EMAILJS_TEMPLATE_ID_CONTACT = 'template_contact'; // You'll need to create this in EmailJS
const EMAILJS_TEMPLATE_ID_BOOKING = 'template_booking'; // You'll need to create this in EmailJS
const EMAILJS_PUBLIC_KEY = 'M5loi_Mue6YL6n2Ce'; // Your EmailJS public key

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Contact form email notification
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: string;
  budget?: string;
  message?: string;
}) {
  const templateParams = {
    to_email: 'consolationlotachi@gmail.com',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone || 'Not provided',
    event_type: data.eventType || 'Not specified',
    event_date: data.eventDate || 'Not specified',
    guest_count: data.guestCount || 'Not specified',
    budget: data.budget || 'Not specified',
    message: data.message || 'No additional message',
    subject: `New Contact Inquiry from ${data.name} - Premium&Classy`,
  };

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CONTACT,
      templateParams
    );
    console.log('Contact notification email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    throw error;
  }
}

// Booking form email notification
export async function sendBookingNotification(data: {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: string;
  venue?: string;
  message?: string;
}) {
  const templateParams = {
    to_email: 'consolationlotachi@gmail.com',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    event_type: data.eventType,
    event_date: data.eventDate,
    guest_count: data.guestCount,
    budget: data.budget,
    venue: data.venue || 'Not specified',
    message: data.message || 'No additional message',
    subject: `New Booking Request from ${data.name} - ${data.eventType} on ${data.eventDate}`,
  };

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_BOOKING,
      templateParams
    );
    console.log('Booking notification email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending booking notification email:', error);
    throw error;
  }
}
