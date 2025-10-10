#!/usr/bin/env python3
import os
import re

def update_blog_nav_text():
    """Update navigation to use 'Mimi Blog' instead of 'Blog'"""

    # All HTML files that might have blog navigation
    all_files = []

    # Croatian files
    for file in ['hr/index.html', 'hr/online-tarot.html', 'hr/osobni-tarot.html',
                 'hr/politika-kolacica.html', 'hr/politika-privatnosti.html', 'hr/uvjeti-koristenja.html']:
        if os.path.exists(file):
            all_files.append(file)

    # English files
    for file in ['en/index.html', 'en/online-tarot-reading.html', 'en/personal-tarot.html',
                 'en/cookie-policy.html', 'en/privacy-policy.html', 'en/terms-conditions.html']:
        if os.path.exists(file):
            all_files.append(file)

    for file_path in all_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace "Blog" with "Mimi Blog" in navigation links
        # Look for href="./blog.html">Blog</a>
        updated = False
        if 'href="./blog.html">Blog</a>' in content:
            content = content.replace('href="./blog.html">Blog</a>', 'href="./blog.html">Mimi Blog</a>')
            updated = True

        if updated:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Updated blog nav text in: {file_path}")
        else:
            print(f"  No blog nav found in: {file_path}")

print("Updating blog navigation text to 'Mimi Blog'...")
update_blog_nav_text()
print("Done!")