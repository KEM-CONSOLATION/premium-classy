#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupSanity() {
  console.log('🚀 Welcome to Sanity Setup for Event Planner Website!\n');
  
  console.log('Your project is already configured with:');
  console.log('- Project ID: xwppcaz9');
  console.log('- Dataset: production\n');

  console.log('To complete the setup, you need to get your API token from:');
  console.log('https://sanity.io/manage/personal/project/xwppcaz9/api\n');
  
  console.log('Steps to get your API token:');
  console.log('1. Click "Add API token"');
  console.log('2. Give it a name like "Event Planner Website"');
  console.log('3. Set permissions to "Editor"');
  console.log('4. Copy the generated token\n');

  const token = await question('Paste your API token here: ');

  if (!token || token.trim() === '') {
    console.log('❌ No token provided. Setup cancelled.');
    rl.close();
    return;
  }

  // Create .env.local file
  const envContent = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=xwppcaz9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=${token.trim()}
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio`;

  try {
    fs.writeFileSync('.env.local', envContent);
    console.log('✅ Created .env.local file');
  } catch (error) {
    console.log('❌ Error creating .env.local file:', error.message);
    rl.close();
    return;
  }

  console.log('\n🎯 Setup complete! Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run populate-sanity');
  console.log('3. Run: npm run sanity:dev (to open Sanity Studio)');
  console.log('4. Run: npm run dev (to start your website)\n');

  console.log('📚 For detailed instructions, check SANITY_SETUP.md');

  rl.close();
}

setupSanity().catch(console.error);
