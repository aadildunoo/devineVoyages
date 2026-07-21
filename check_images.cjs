const fs = require('fs');
const https = require('https');
const http = require('http');

const files = [
  'src/data/tours.ts',
  'src/data/destinations.ts',
  'src/data/blogs.ts',
  'src/data/team.ts'
];

async function checkUrl(url, maxRedirects = 5) {
  return new Promise((resolve) => {
    if (maxRedirects <= 0) return resolve(false);

    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve(true);
      } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const u = new URL(url);
          redirectUrl = `${u.protocol}//${u.host}${redirectUrl}`;
        }
        checkUrl(redirectUrl, maxRedirects - 1).then(resolve);
      } else {
        resolve(false);
      }
    });

    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function run() {
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+(?:\?[^'"]*)?/g;
    const urls = [...new Set(content.match(regex) || [])];
    
    console.log(`Checking ${file} (${urls.length} urls)...`);
    for (const url of urls) {
      const isValid = await checkUrl(url);
      if (!isValid) {
        console.log(`FAILED (${file}): ${url}`);
      }
    }
  }
}

run();
