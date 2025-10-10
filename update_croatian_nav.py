#!/usr/bin/env python3
import os
import re

def add_blog_to_croatian_nav():
    """Add blog link to Croatian navigation"""

    croatian_files = [
        'hr/online-tarot.html',
        'hr/osobni-tarot.html',
        'hr/politika-kolacica.html',
        'hr/politika-privatnosti.html',
        'hr/uvjeti-koristenja.html'
    ]

    for file_path in croatian_files:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if blog link already exists
            if 'href="./blog.html"' in content:
                print(f"  Blog link already exists in: {file_path}")
                continue

            # Find and update navigation list
            # Pattern to match the nav-list and add blog link
            patterns = [
                # Pattern 1: Standard navigation with Online tarot and Tarot uživo
                (r'(<ul class="nav-list">\s*<li><a href="[^"]*">Online tarot</a></li>\s*<li><a href="[^"]*">Tarot uživo</a></li>\s*)(</ul>)',
                 r'\1<li><a href="./blog.html">Blog</a></li>\n      \2'),

                # Pattern 2: Navigation with disabled current page
                (r'(<ul class="nav-list">\s*(?:<li>.*?</li>\s*)*<li><a href="[^"]*">(?:Online tarot|Tarot uživo)</a></li>\s*)(</ul>)',
                 r'\1<li><a href="./blog.html">Blog</a></li>\n      \2'),

                # Pattern 3: More flexible pattern for any nav-list
                (r'(<ul class="nav-list">.*?</li>\s*)(</ul>)',
                 r'\1<li><a href="./blog.html">Blog</a></li>\n      \2')
            ]

            updated = False
            for pattern, replacement in patterns:
                if re.search(pattern, content, re.DOTALL):
                    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
                    updated = True
                    break

            if updated:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"  Added blog link to: {file_path}")
            else:
                print(f"  Could not find navigation pattern in: {file_path}")

print("Adding blog links to Croatian navigation...")
add_blog_to_croatian_nav()
print("Done!")