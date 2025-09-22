# 🚨 CORS Fix for Netlify Deployment

## Quick Fix Steps

### 1. Configure Sanity CORS (REQUIRED)
1. Go to: https://sanity.io/manage/personal/project/xwppcaz9/api
2. Click **"CORS Origins"** tab
3. Click **"Add CORS Origin"**
4. Add these origins:

```
https://premiumandclassy.netlify.app
https://*.netlify.app
http://localhost:3000
http://localhost:3001
```

### 2. Set CORS Options:
- **Allow credentials**: ❌ NO (uncheck this)
- **Methods**: GET, POST, OPTIONS
- **Headers**: Content-Type, Authorization

### 3. Make API Token Public (If Read-Only)
Since you're only reading data, you can make the token public:

1. Go to: https://sanity.io/manage/personal/project/xwppcaz9/api
2. Click **"Tokens"** tab  
3. Create a new token with **"Viewer"** permissions
4. Copy the token

### 4. Update Your Config
Replace the token in `/src/config/index.ts`:

```typescript
token: "your-new-viewer-token-here",
```

## 🔧 Alternative: Remove Token for Read-Only

If you only need to read data (no forms), you can remove the token entirely:

```typescript
export const config = {
  sanity: {
    projectId: "xwppcaz9",
    dataset: "production", 
    apiVersion: "2023-12-01",
    // token: undefined, // No token for public read access
    useCdn: true,
    ignoreBrowserTokenWarning: true,
    perspective: "published",
  },
};
```

## 🧪 Test the Fix

After making changes, test with:

```javascript
// In browser console on your Netlify site:
fetch('https://xwppcaz9.api.sanity.io/v2023-12-01/data/query/production?query=*[_type=="siteSettings"][0]')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Still failing:', err));
```

## ⚡ Quick Deploy Fix

The fastest fix is to:
1. **Remove the token** from config (for read-only access)
2. **Add CORS origins** in Sanity console
3. **Redeploy** to Netlify

This will resolve the CORS issue immediately! ✅
