#!/usr/bin/env python3
import os
import re

def update_croatian_navigation(file_path):
    """Update navigation links in Croatian pages to include language switcher"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update the language switcher link to English
    content = re.sub(
        r'href="tarot-speaks\.html"',
        'href="/en/"',
        content
    )

    # If this is the Croatian index, no need to update internal links (they're already relative)
    # But for other pages, we might need to ensure proper relative paths

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Updated navigation in: {file_path}")

def update_english_navigation(file_path):
    """Update navigation links in English pages to include language switcher"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if there's a Croatian language link
    if 'class="croatian"' in content or 'href="index.html"' in content:
        # Update link to Croatian version
        content = re.sub(
            r'href="index\.html"([^>]*class="croatian")?',
            'href="/hr/"\\1',
            content
        )

    # Update relative links in English pages
    # Change links like "./online-tarot-reading.html" to stay relative

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Updated navigation in: {file_path}")

# Process Croatian files
croatian_files = [
    'hr/index.html',
    'hr/osobni-tarot.html',
    'hr/online-tarot.html',
    'hr/politika-kolacica.html',
    'hr/politika-privatnosti.html',
    'hr/uvjeti-koristenja.html'
]

print("Updating Croatian navigation...")
for file_path in croatian_files:
    if os.path.exists(file_path):
        update_croatian_navigation(file_path)

# Process English files
english_files = [
    'en/index.html',
    'en/personal-tarot.html',
    'en/online-tarot-reading.html',
    'en/cookie-policy.html',
    'en/privacy-policy.html',
    'en/terms-conditions.html'
]

print("\nUpdating English navigation...")
for file_path in english_files:
    if os.path.exists(file_path):
        update_english_navigation(file_path)

print("\nNavigation updates complete!")