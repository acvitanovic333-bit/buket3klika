import os

filepath = 'index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

target = '''</head>
        <div class="hero-content">'''

replacement = '''</head>
<body>
    <nav class="nav-top extended-nav">
        <a href="/" class="logo-rose" style="text-decoration: none;">
            <img src="assets/rose-logo.png" alt="Buket3klika Logo">
            <span class="logo-text">Buket3klika</span>
        </a>
        <div class="nav-links">
            <a href="o-nama.html">O nama</a>
            <a href="faq.html">Česta pitanja</a>
            <a href="kontakt.html">Kontakt</a>
            <a href="blog.html">Blog</a>
        </div>
        <div class="nav-contact">
            <div class="contact-item"><i class="fa fa-phone"></i> <a href="tel:+385976050419">+385976050419</a></div>
            <div class="contact-item"><i class="fa fa-envelope"></i> <a href="mailto:info@buket3klika.hr">info@buket3klika.hr</a></div>
        </div>
        <div class="account-actions">
            <a href="tel:+385976050419" class="mobile-call-btn" style="margin-right: 1rem; font-size: 1.4rem; color: var(--accent-red); display: none;"><i class="fa-solid fa-phone"></i></a>
            <button class="account-btn" aria-label="Korisnički račun">
                <i class="fa-regular fa-user"></i>
            </button>
        </div>
    </nav>
    <header class="hero">
        <div class="hero-image-container">
            <img src="assets/bg_hero.jpg" alt="Rose Bouquet" class="hero-bg">
        </div>
        <div class="hero-content">'''

if target in content:
    content = content.replace(target, replacement)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed index.html")
else:
    print("Target not found. Let's try regex.")
    import re
    content = re.sub(r'</head>\s*<div class="hero-content">', replacement, content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed using regex.")
