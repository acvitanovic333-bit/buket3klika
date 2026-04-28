const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The structure is something like:
// <div class="rose-count-overlay">19 ruža</div>
// </div>
// <div class="product-info">
//     <span></span>
//     <span class="price">Od €46.00</span>

html = html.replace(/<div class="rose-count-overlay">(\d+) ruža<\/div>([\s\S]*?)<span class="price">Od €\d+\.\d+<\/span>/g, (match, countStr, inBetween) => {
    let count = parseInt(countStr);
    let newPrice = (count * 2.5).toFixed(2);
    return `<div class="rose-count-overlay">${count} ruža</div>${inBetween}<span class="price">Od €${newPrice}</span>`;
});

fs.writeFileSync('index.html', html);
console.log('Fixed prices in index.html');
