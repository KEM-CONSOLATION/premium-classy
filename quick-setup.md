# Quick Setup - 3 Minutes to Complete

## Step 1: Get Your API Token (1 minute)
1. Go to: https://sanity.io/manage/personal/project/xwppcaz9/api
2. Click "Add API token"
3. Name: "Event Planner Website" 
4. Permissions: **Editor**
5. Copy the token

## Step 2: Create Environment File (30 seconds)
Copy `.env.local.template` to `.env.local` and replace `your-api-token-here` with your token:

```bash
cp .env.local.template .env.local
```

Then edit `.env.local` to add your token.

## Step 3: Install & Populate (1 minute)
```bash
npm install
npm run populate-sanity
```

## Done! 🎉
Your Sanity studio will be populated with:
- 4 Services (Wedding, Corporate, Birthday, Anniversary)
- 4 Portfolio items with descriptions
- 4 Client testimonials
- Complete site settings

Access your studio: `npm run sanity:dev`
