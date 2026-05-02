import os

replacements = {
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
    'ĹL\'e': 'že',
    'ruĹL\'a': 'ruža',
    'RuĹL\'a': 'Ruža'
}

def fix_file(filepath):
    try:
        # Try reading as Windows-1250 then saving as UTF-8
        with open(filepath, 'r', encoding='cp1250', errors='ignore') as f:
            content = f.read()
        
        # Remove git conflict markers if they exist
        if '<<<<<<< HEAD' in content:
            import re
            content = re.sub(r'(?s)<<<<<<< HEAD.*?=======', '', content)
            content = re.sub(r'(?s)>>>>>>>.*?\n', '', content)
            print(f"Removed conflict markers from {filepath}")

        for old, new in replacements.items():
            content = content.replace(old, new)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except Exception as e:
        print(f"Error fixing {filepath}: {e}")
        return False

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        if fix_file(filename):
            print(f"Fixed characters in {filename}")
