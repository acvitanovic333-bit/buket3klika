import os

replacements = {
    'â‚¬': '€',
    'pruĹľa': 'pruža',
    'najbrĹľu': 'najbržu',
    'ruĹľa': 'ruža',
    'RuĹle': 'Ruže',
    'RuĹLa': 'Ruža',
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
    'Ä ': 'Đ',
    'Â': ''
}

def fix_file(filepath):
    try:
        # Try reading as UTF-8 first
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        changed = False
        for old, new in replacements.items():
            if old in content:
                content = content.replace(old, new)
                changed = True
        
        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error fixing {filepath}: {e}")
        return False

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        if fix_file(filename):
            print(f"Fixed characters and Euro in {filename}")
