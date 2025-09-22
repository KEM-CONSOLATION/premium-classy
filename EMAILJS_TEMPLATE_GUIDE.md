# 📧 Simple EmailJS Template Creation Guide

## Step 1: Go to EmailJS Dashboard
1. Go to: https://www.emailjs.com/
2. Click **"Sign In"** (top right)
3. Enter your Gmail credentials

## Step 2: Create Contact Template

### 2.1 Navigate to Templates
1. In the left sidebar, click **"Email Templates"**
2. Click **"Create New Template"** (blue button)

### 2.2 Template Settings
1. **Template Name**: `template_contact`
2. **Subject**: `New Contact Inquiry from {{from_name}} - Premium&Classy`
3. **Content Type**: Choose **"Rich Text"** (easier than HTML)

### 2.3 Template Content
Copy and paste this content:

```
New Contact Inquiry - Premium&Classy

Contact Details:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Event Type: {{event_type}}
Event Date: {{event_date}}
Guest Count: {{guest_count}}
Budget: {{budget}}

Message:
{{message}}

This inquiry was submitted through the Premium&Classy website contact form.
```

### 2.4 Save Template
1. Click **"Save"** (top right)
2. Note the Template ID (should be `template_contact`)

## Step 3: Create Booking Template

### 3.1 Create Another Template
1. Click **"Create New Template"** again
2. **Template Name**: `template_booking`
3. **Subject**: `New Booking Request from {{from_name}} - {{event_type}} on {{event_date}}`

### 3.2 Template Content
Copy and paste this content:

```
New Booking Request - Premium&Classy

Booking Details:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Event Type: {{event_type}}
Event Date: {{event_date}}
Guest Count: {{guest_count}}
Budget: {{budget}}
Venue: {{venue}}

Additional Message:
{{message}}

This booking request was submitted through the Premium&Classy website booking form.
```

### 3.3 Save Template
1. Click **"Save"**
2. Note the Template ID (should be `template_booking`)

## Step 4: Test Your Setup

### 4.1 Test Contact Form
1. Go to your website contact page
2. Fill out the form
3. Submit it
4. Check your Gmail inbox

### 4.2 Test Booking Form
1. Go to your website booking page
2. Fill out the form
3. Submit it
4. Check your Gmail inbox

## Troubleshooting

### If emails don't arrive:
1. **Check spam folder** in Gmail
2. **Verify service connection** in EmailJS dashboard
3. **Check template IDs** match exactly

### If you get errors:
1. **Template not found** → Check template name spelling
2. **Service not found** → Verify service ID
3. **Invalid key** → Check public key

## Quick Checklist

- [ ] Service ID: `service_kk9enic` ✅
- [ ] Public Key: `M5loi_Mue6YL6n2Ce` ✅
- [ ] Contact Template: `template_contact` 
- [ ] Booking Template: `template_booking`
- [ ] Test both forms
- [ ] Check Gmail inbox

## Need Help?

If you're still stuck:
1. Take a screenshot of the EmailJS dashboard
2. Tell me exactly where you're getting confused
3. I'll walk you through it step by step!

The templates are much simpler than they look - just copy/paste the content above! 🎉
