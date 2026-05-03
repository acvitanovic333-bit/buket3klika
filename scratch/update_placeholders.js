const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

// Update placeholders to be consistent
content = content.replace(/placeholder="Vaš broj mobitela"/g, 'placeholder="vaš broj"');
content = content.replace(/placeholder="Broj mobitela za vozača"/g, 'placeholder="vaš broj"');

fs.writeFileSync('script.js', content, 'utf8');
console.log('Successfully updated placeholder to vaš broj');
