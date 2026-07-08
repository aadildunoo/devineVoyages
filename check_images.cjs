const fs = require('fs');
const https = require('https');

const files = [
  'src/data/tours.ts',
  'src/data/destinations.ts',
  'src/data/blogs.ts',
  'src/data/team.ts'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function run() {
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+(?:\?[^'"]*)?/g;
    const urls = [...new Set(content.match(regex) || [])];
    
    console.log(`Checking ${file} (${urls.length} urls)...`);
    for (const url of urls) {
      const isValid = await checkUrl(url);
      if (!isValid) {
        console.log(`FAILED: ${url}`);
      }
    }
  }
}

run();
