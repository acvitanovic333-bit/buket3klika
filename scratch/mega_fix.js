const fs = require('fs');
const path = require('path');

const replacements = {
    'â‚¬': '€',
    'Â': '',
    'esta pitanja': 'Česta pitanja',
    'Korisniki raun': 'Korisnički račun',
    'najljepe': 'najljepše',
    'ÄŤ': 'č',
    'Ä‡': 'ć',
    'Ĺľ': 'ž',
    'vaĹˇ': 'vaš',
    'savrĹˇ': 'savrš',
    'RoÄ‘': 'Rođ',
    'Ĺˇ': 'š',
    'ÄŚ': 'Č',
    'Ĺ˝': 'Ž',
    'Ä†': 'Ć',
    'Ä ': 'Đ'
};

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix characters
    for (const [old, newVal] of Object.entries(replacements)) {
        content = content.split(old).join(newVal);
    }
    
    // Mobile call button
    if (!content.includes('mobile-call-btn')) {
        content = content.replace('<button class="account-btn"', '<a href="tel:+385976050419" class="mobile-call-btn" style="margin-right: 1rem; font-size: 1.4rem; color: var(--accent-red); display: none;"><i class="fa-solid fa-phone"></i></a><button class="account-btn"');
    }
    
    // Remove Instagram
    content = content.replace(/<a href="https:\/\/www\.instagram\.com\/buket3klika\/".*?<\/a>/g, '');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed ${file}`);
});
