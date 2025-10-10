#!/usr/bin/env python3
import os
import re

def update_blog_nav_to_mimi_tarot():
    """Update navigation to use 'Mimi Tarot' instead of 'Mimi Blog'"""

    # All HTML files that might have blog navigation
    all_files = []

    # Croatian files
    for file in ['hr/index.html', 'hr/online-tarot.html', 'hr/osobni-tarot.html',
                 'hr/politika-kolacica.html', 'hr/politika-privatnosti.html', 'hr/uvjeti-koristenja.html',
                 'hr/blog.html']:
        if os.path.exists(file):
            all_files.append(file)

    # English files
    for file in ['en/index.html', 'en/online-tarot-reading.html', 'en/personal-tarot.html',
                 'en/cookie-policy.html', 'en/privacy-policy.html', 'en/terms-conditions.html',
                 'en/blog.html']:
        if os.path.exists(file):
            all_files.append(file)

    for file_path in all_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace "Mimi Blog" with "Mimi Tarot" in navigation links and headers
        updated = False

        # Navigation links
        if 'href="./blog.html">Mimi Blog</a>' in content:
            content = content.replace('href="./blog.html">Mimi Blog</a>', 'href="./blog.html">Mimi Tarot</a>')
            updated = True

        # Disabled navigation (current page)
        if 'nav-disabled" style="color: #b8a9c9">Mimi Blog</a>' in content:
            content = content.replace('nav-disabled" style="color: #b8a9c9">Mimi Blog</a>', 'nav-disabled" style="color: #b8a9c9">Mimi Tarot</a>')
            updated = True

        # Page headers
        if '<h1>Mimi Blog</h1>' in content:
            content = content.replace('<h1>Mimi Blog</h1>', '<h1>Mimi Tarot</h1>')
            updated = True

        # Page titles
        if '<title>Mimi Blog -' in content:
            content = content.replace('<title>Mimi Blog -', '<title>Mimi Tarot -')
            updated = True

        if updated:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Updated to 'Mimi Tarot' in: {file_path}")

print("Updating blog references to 'Mimi Tarot'...")
update_blog_nav_to_mimi_tarot()
print("Done!")