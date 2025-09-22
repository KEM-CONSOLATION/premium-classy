# Netlify Deployment Guide: Premium&Classy Website

## 🚨 CORS Error Fix

### Problem
Getting CORS errors when making requests to Sanity API from Netlify deployment.

### Solution
You need to configure CORS settings in your Sanity project to allow requests from your Netlify domain.

## 🔧 Step-by-Step CORS Fix

### 1. Configure Sanity CORS Settings
1. Go to [Sanity Management Console](https://sanity.io/manage/personal/project/xwppcaz9)
2. Click on your project (`xwppcaz9`)
3. Go to **Settings** → **API** → **CORS Origins**
4. Click **Add CORS Origin**
5. Add these origins:

```
https://premiumandclassy.netlify.app
https://*.netlify.app
https://localhost:3000
http://localhost:3000
http://localhost:3001
```

**Important**: Replace `your-netlify-site` with your actual Netlify site name.

### 2. Configure Credentials
- **Allow credentials**: ✅ Yes
- **Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Headers**: Content-Type, Authorization

### 3. Update Your Config File
Update `/src/config/index.ts` with your actual Netlify URL:

```typescript
export const config = {
  sanity: {
    projectId: "xwppcaz9",
    dataset: "production",
    apiVersion: "2023-12-01",
    token: "your-token-here",
    studioUrl: process.env.NODE_ENV === "production" 
      ? "https://premiumandclassy.netlify.app" 
      : "http://localhost:3333",
    useCdn: true, // Enable CDN for production
    requestTagPrefix: "premium-classy",
    ignoreBrowserTokenWarning: true,
    perspective: "published",
  },
  app: {
    name: "Premium&Classy",
    url: process.env.NODE_ENV === "production" 
      ? "https://premiumandclassy.netlify.app" 
      : "http://localhost:3000",
  },
};
```

## 🌐 Netlify Environment Variables (Optional)

If you want to use environment variables instead of hardcoded values:

### Netlify Environment Variables:
```bash
SANITY_API_TOKEN=your-token-here
NEXT_PUBLIC_SITE_URL=https://premiumandclassy.netlify.app
```

### Updated Config:
```typescript
export const config = {
  sanity: {
    projectId: "xwppcaz9",
    dataset: "production",
    apiVersion: "2023-12-01",
    token: process.env.SANITY_API_TOKEN || "fallback-token",
    useCdn: process.env.NODE_ENV === "production",
  },
  app: {
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};
```

## 🔒 Security Best Practices

### 1. API Token Permissions
- Use **Viewer** permissions for read-only access
- Only use **Editor** permissions if you need write access
- Never use **Admin** permissions for frontend

### 2. CORS Configuration
- Be specific with domains (avoid wildcards in production)
- Only allow necessary HTTP methods
- Enable credentials only if needed

### 3. Environment Variables
- Keep tokens in environment variables when possible
- Use different tokens for development and production

## 🚀 Deployment Checklist

### Before Deploying:
- [ ] Update Sanity CORS settings with your Netlify URL
- [ ] Replace placeholder URLs in config file
- [ ] Test API calls work locally
- [ ] Verify all images load correctly

### After Deploying:
- [ ] Test all pages load without CORS errors
- [ ] Verify Sanity data is fetching correctly
- [ ] Check contact forms submit successfully
- [ ] Test booking form submissions

## 🛠️ Troubleshooting

### If CORS errors persist:
1. **Check Sanity Console**: Verify CORS origins are saved
2. **Clear Browser Cache**: Hard refresh your Netlify site
3. **Check Network Tab**: Look for specific error messages
4. **Verify Token**: Ensure API token has correct permissions
5. **Test Direct API**: Try API calls directly in browser console

### Common CORS Issues:
- **Wrong Domain**: Make sure Netlify URL exactly matches CORS setting
- **Missing Protocols**: Include both `http://` and `https://`
- **Wildcard Issues**: Be specific rather than using `*`
- **Credentials**: Enable if using authentication

## 📞 Quick Fix Commands

### Test API Call from Browser Console:
```javascript
fetch('https://xwppcaz9.api.sanity.io/v2023-12-01/data/query/production?query=*[_type=="siteSettings"][0]')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('CORS Error:', err));
```

### Verify CORS Headers:
```bash
curl -H "Origin: https://premiumandclassy.netlify.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://xwppcaz9.api.sanity.io/v2023-12-01/data/query/production
```

## ✅ Expected Result

After configuring CORS correctly:
- ✅ All pages load without errors
- ✅ Sanity data displays correctly
- ✅ Forms submit successfully
- ✅ Images load from Sanity CDN
- ✅ No console errors

Your Premium&Classy website will be fully functional on Netlify! 🎉
