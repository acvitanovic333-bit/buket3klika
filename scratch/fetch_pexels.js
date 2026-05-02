const fs = require('fs');
const https = require('https');

const API_KEY = 'KJXsWHed9oQhHyZKUVPDorS3e9VejGZI5okt59hAuc7rA2T3miA1hEpP';
// We fetch 15 photos just in case
const query = 'romantic roses surprise';

const options = {
  hostname: 'api.pexels.com',
  path: `/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`,
  method: 'GET',
  headers: {
    'Authorization': API_KEY
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
        const response = JSON.parse(data);
        if (!response.photos || response.photos.length === 0) {
            console.log("No photos found on Pexels. Please check the API key or query.");
            return;
        }
        
        const photos = response.photos;
        let blogHtml = fs.readFileSync('blog.html', 'utf8');
        
        let photoIndex = 0;
        blogHtml = blogHtml.replace(/<article class="product-card"[\s\S]*?<img src="(.*?)"/g, (match, p1) => {
            if(photoIndex < photos.length) {
                // Use the large portrait or medium version for good quality
                const newSrc = photos[photoIndex].src.large;
                photoIndex++;
                return match.replace(p1, newSrc);
            }
            return match;
        });
        
        fs.writeFileSync('blog.html', blogHtml, 'utf8');
        console.log(`Updated blog.html with ${photoIndex} dynamic Pexels images!`);
    } catch(err) {
        console.error("Error parsing Pexels response:", err);
    }
  });
});

req.on('error', error => {
  console.error("Request failed:", error);
});

req.end();
