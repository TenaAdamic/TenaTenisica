#!/usr/bin/env python3
import os
import re

def add_blog_to_english_nav():
    """Add blog link to English navigation"""

    english_files = [
        'en/index.html',
        'en/online-tarot-reading.html',
        'en/personal-tarot.html',
        'en/cookie-policy.html',
        'en/privacy-policy.html',
        'en/terms-conditions.html'
    ]

    for file_path in english_files:
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
                # Pattern 1: Standard navigation with Online Tarot and Live Tarot
                (r'(<ul class="nav-list">\s*<li><a href="[^"]*">Online Tarot</a></li>\s*<li><a href="[^"]*">Live Tarot</a></li>\s*)(</ul>)',
                 r'\1<li><a href="./blog.html">Blog</a></li>\n      \2'),

                # Pattern 2: Navigation with disabled current page
                (r'(<ul class="nav-list">\s*(?:<li>.*?</li>\s*)*<li><a href="[^"]*">(?:Online Tarot|Live Tarot)</a></li>\s*)(</ul>)',
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

print("Adding blog links to English navigation...")
add_blog_to_english_nav()
print("Done!")