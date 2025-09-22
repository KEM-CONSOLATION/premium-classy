# 🔐 Write Token Setup for Forms

## The Issue
Your current Sanity token only has **read access**, which is why:
- ✅ **Reading data works** (services, portfolio, testimonials display)
- ❌ **Writing data fails** (contact forms, booking forms return 500 errors)

## Quick Fix

### 1. Create a Write Token
1. Go to: https://sanity.io/manage/personal/project/xwppcaz9/api
2. Click **"Tokens"** tab
3. Click **"Add API Token"**
4. Set these options:
   - **Name**: `Write Token for Forms`
   - **Permissions**: `Editor` (full read/write access)
   - **Expires**: `Never` (or set a future date)

### 2. Add Token to Environment
Add this to your `.env.local` file:

```bash
# Sanity Write Token (for forms)
SANITY_API_WRITE_TOKEN=your-new-write-token-here
```

### 3. Deploy to Netlify
1. Add the same environment variable to Netlify:
   - Go to your Netlify dashboard
   - Site Settings → Environment Variables
   - Add: `SANITY_API_WRITE_TOKEN` = `your-new-write-token-here`

## Alternative: Use Read-Only Token for Everything

If you don't want to create a write token, you can disable forms:

### Option A: Disable Forms
Comment out the form submission logic in:
- `src/app/contact/page.tsx`
- `src/app/booking/page.tsx`

### Option B: Use External Form Service
Replace Sanity forms with:
- **Netlify Forms** (built-in)
- **Formspree** (free tier available)
- **Typeform** (user-friendly)

## Test the Fix

After adding the write token:

1. **Test Contact Form**:
   - Fill out the contact form
   - Submit it
   - Check Sanity Studio for new `contactInquiry` documents

2. **Test Booking Form**:
   - Fill out the booking form
   - Submit it
   - Check Sanity Studio for new `booking` documents

## Expected Result

With the write token configured:
- ✅ **Contact forms work** and create `contactInquiry` documents
- ✅ **Booking forms work** and create `booking` documents
- ✅ **All data displays** correctly
- ✅ **No more 500 errors** on form submission

The forms will now successfully save data to your Sanity CMS! 🎉
