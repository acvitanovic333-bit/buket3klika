import os
import re

replacements = {
    'â‚¬': '€',
    'Â': '',
    'esta pitanja': 'Česta pitanja',
    'Korisniki raun': 'Korisnički račun',
    'najljepe': 'najljepše'
}

def fix_html(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Fix characters
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    # Fix mobile call button if missing
    if 'mobile-call-btn' not in content:
        content = re.sub(r'(<button class="account-btn")', r'<a href="tel:+385976050419" class="mobile-call-btn" style="margin-right: 1rem; font-size: 1.4rem; color: var(--accent-red); display: none;"><i class="fa-solid fa-phone"></i></a>\1', content)
    
    # Clean up footer
    content = re.sub(r'<a href="https://www.instagram.com/buket3klika/".*?</a>', '', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        fix_html(filename)
        print(f"Fixed {filename}")
