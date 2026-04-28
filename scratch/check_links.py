
import os
import re

directory = '.'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

links = set()
for html_file in html_files:
    with open(os.path.join(directory, html_file), 'r', encoding='utf-8') as f:
        content = f.read()
        matches = re.findall(r'href="([^"]+\.html)"', content)
        for match in matches:
            links.add(match)

missing_files = []
for link in links:
    if not os.path.exists(os.path.join(directory, link)):
        missing_files.append(link)

print(f"Total unique .html links found: {len(links)}")
print(f"Missing files: {missing_files}")
