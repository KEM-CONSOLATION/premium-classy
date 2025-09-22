# 📧 EmailJS Setup for Form Notifications

## Why EmailJS?
- ✅ **No server required** - works client-side
- ✅ **Free tier available** - 200 emails/month
- ✅ **Easy setup** - just need to configure templates
- ✅ **Reliable delivery** - professional email service

## Setup Steps

### 1. Create EmailJS Account
1. Go to: https://www.emailjs.com/
2. Sign up with your Gmail account
3. Verify your email address

### 2. Create Email Service
1. Go to **"Email Services"** in dashboard
2. Click **"Add New Service"**
3. Choose **"Gmail"**
4. Connect your Gmail account (`consolationlotachi@gmail.com`)
5. Name it: `service_premium_classy`

### 3. Create Email Templates

#### Contact Form Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Name: `template_contact`
4. Subject: `New Contact Inquiry from {{from_name}} - Premium&Classy`
5. Content:
```html
<h2>New Contact Inquiry - Premium&Classy</h2>

<h3>Contact Details</h3>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Event Type:</strong> {{event_type}}</p>
<p><strong>Event Date:</strong> {{event_date}}</p>
<p><strong>Guest Count:</strong> {{guest_count}}</p>
<p><strong>Budget:</strong> {{budget}}</p>

<h3>Message</h3>
<p>{{message}}</p>

<p><em>This inquiry was submitted through the Premium&Classy website contact form.</em></p>
```

#### Booking Form Template
1. Create another template
2. Name: `template_booking`
3. Subject: `New Booking Request from {{from_name}} - {{event_type}} on {{event_date}}`
4. Content:
```html
<h2>New Booking Request - Premium&Classy</h2>

<h3>Booking Details</h3>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Event Type:</strong> {{event_type}}</p>
<p><strong>Event Date:</strong> {{event_date}}</p>
<p><strong>Guest Count:</strong> {{guest_count}}</p>
<p><strong>Budget:</strong> {{budget}}</p>
<p><strong>Venue:</strong> {{venue}}</p>

<h3>Additional Message</h3>
<p>{{message}}</p>

<p><em>This booking request was submitted through the Premium&Classy website booking form.</em></p>
```

### 4. Get Your Public Key
1. Go to **"Account"** → **"General"**
2. Copy your **Public Key**

### 5. Update Configuration
Update `src/lib/email.ts` with your actual values:

```typescript
const EMAILJS_SERVICE_ID = 'service_premium_classy'; // Your service ID
const EMAILJS_TEMPLATE_ID_CONTACT = 'template_contact'; // Your contact template ID
const EMAILJS_TEMPLATE_ID_BOOKING = 'template_booking'; // Your booking template ID
const EMAILJS_PUBLIC_KEY = 'your_actual_public_key_here'; // Your public key
```

## How It Works

### Contact Form Flow:
1. User fills out contact form
2. Data saves to Sanity CMS
3. EmailJS sends notification to `consolationlotachi@gmail.com`
4. You get instant email notification

### Booking Form Flow:
1. User fills out booking form
2. Data saves to Sanity CMS
3. EmailJS sends notification to `consolationlotachi@gmail.com`
4. You get instant email notification

## Benefits

- ✅ **Instant notifications** - you know immediately when someone contacts you
- ✅ **Professional emails** - nicely formatted with all details
- ✅ **No server setup** - works entirely client-side
- ✅ **Free tier** - 200 emails/month is plenty for most businesses
- ✅ **Reliable delivery** - emails go directly to your Gmail inbox

## Testing

After setup:
1. Fill out the contact form
2. Check your Gmail inbox
3. Fill out the booking form
4. Check your Gmail inbox again

You should receive beautifully formatted emails with all the form details! 🎉

## Troubleshooting

- **Emails not sending?** Check your public key and service IDs
- **Template not working?** Make sure template variables match exactly
- **Gmail not receiving?** Check spam folder and Gmail connection
