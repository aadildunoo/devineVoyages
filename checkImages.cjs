const https = require('https');
const fs = require('fs');
const urls = [
  'https://images.unsplash.com/photo-1561361513-2d000a50f0dc',
  'https://images.unsplash.com/photo-1514222134-b57cbb8ce073',
  'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220',
  'https://images.unsplash.com/photo-1600100397608-f010f41cb8eb',
  'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f',
  'https://images.unsplash.com/photo-1532664189809-02133fee698d',
  'https://images.unsplash.com/photo-1510313421396-d08915b8cf06',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({url, status: res.statusCode});
    }).on('error', () => resolve({url, status: 'error'}));
  });
}

async function main() {
  const results = await Promise.all(urls.map(checkUrl));
  console.log(results);
}
main();
