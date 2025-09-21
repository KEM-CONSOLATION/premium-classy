# Sanity Setup Instructions

Your Sanity project is configured with Project ID: `xwppcaz9`

## Step 1: Get Your API Token

1. Go to [Sanity Management Console](https://sanity.io/manage)
2. Select your project (xwppcaz9)
3. Go to **API** tab
4. Click **Add API token**
5. Give it a name like "Event Planner Website"
6. Set permissions to **Editor** (allows read/write)
7. Copy the generated token

## Step 2: Set Up Environment Variables

1. Create a `.env.local` file in your project root:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=xwppcaz9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-here
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
```

2. Replace `your-api-token-here` with the token you copied from step 1

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Populate Your Sanity Studio with Sample Data

```bash
npm run populate-sanity
```

This will create:
- 4 sample services (Wedding Planning, Corporate Events, Birthday Parties, Anniversary Celebrations)
- 4 sample portfolio items
- 4 sample testimonials
- Site settings with your business information

## Step 5: Access Your Sanity Studio

```bash
npm run sanity:dev
```

This will open your Sanity Studio where you can:
- Edit the sample content
- Add images to your portfolio and services
- Customize all content to match your brand
- Manage bookings and contact inquiries

## Step 6: Deploy Your Sanity Studio (Optional)

```bash
npm run sanity:deploy
```

This creates a hosted version of your studio at `https://xwppcaz9.sanity.studio`

## Available Scripts

- `npm run sanity:dev` - Start Sanity Studio in development mode
- `npm run sanity:build` - Build Sanity Studio for production
- `npm run sanity:deploy` - Deploy Sanity Studio to Sanity's hosting
- `npm run sanity:manage` - Open project management in browser
- `npm run populate-sanity` - Populate studio with sample data

## Next Steps

1. **Add Images**: Upload images for your services and portfolio items in the Sanity Studio
2. **Customize Content**: Edit the sample data to match your actual services and portfolio
3. **Brand Customization**: Update the site settings with your actual business information
4. **Test Bookings**: The booking form will save submissions to your Sanity dataset

Your website will automatically pull content from Sanity once you start the development server with `npm run dev`.
