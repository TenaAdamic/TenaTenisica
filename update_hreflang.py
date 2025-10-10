#!/usr/bin/env python3
import os
import re

def update_hreflang_tags(file_path, lang, page_name):
    """Update HTML file with proper hreflang tags and canonical URL"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine the URLs for each language version
    if page_name == 'index':
        hr_url = 'https://www.mimitarot.com/hr/'
        en_url = 'https://www.mimitarot.com/en/'
    else:
        # Map Croatian page names to English equivalents
        page_mapping = {
            'osobni-tarot': 'personal-tarot',
            'online-tarot': 'online-tarot-reading',
            'politika-kolacica': 'cookie-policy',
            'politika-privatnosti': 'privacy-policy',
            'uvjeti-koristenja': 'terms-conditions',
            'pravila-privatnosti': 'privacy-policy'  # This seems to be duplicate
        }

        # Reverse mapping for English to Croatian
        reverse_mapping = {v: k for k, v in page_mapping.items() if k != 'pravila-privatnosti'}

        if lang == 'hr':
            hr_page = page_name
            en_page = page_mapping.get(page_name, page_name)
        else:
            en_page = page_name
            hr_page = reverse_mapping.get(page_name, page_name)

        hr_url = f'https://www.mimitarot.com/hr/{hr_page}.html'
        en_url = f'https://www.mimitarot.com/en/{en_page}.html'

    # Determine canonical URL
    canonical_url = hr_url if lang == 'hr' else en_url

    # Create hreflang tags
    hreflang_tags = f'''    <link rel="canonical" href="{canonical_url}" />
    <link rel="alternate" hreflang="hr" href="{hr_url}" />
    <link rel="alternate" hreflang="en" href="{en_url}" />
    <link rel="alternate" hreflang="x-default" href="https://www.mimitarot.com/" />'''

    # Check if hreflang tags already exist
    if 'hreflang=' in content:
        print(f"  Skipping {file_path} - already has hreflang tags")
        return

    # Find existing canonical tag and replace with new tags
    canonical_pattern = r'<link\s+rel="canonical"[^>]*>'

    if re.search(canonical_pattern, content):
        # Replace existing canonical with new tags
        content = re.sub(canonical_pattern, hreflang_tags, content)
    else:
        # Insert after <title> tag if no canonical found
        title_pattern = r'(</title>)'
        content = re.sub(title_pattern, r'\1\n' + hreflang_tags, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Updated: {file_path}")

# Process Croatian files
croatian_files = [
    ('hr/osobni-tarot.html', 'osobni-tarot'),
    ('hr/online-tarot.html', 'online-tarot'),
    ('hr/politika-kolacica.html', 'politika-kolacica'),
    ('hr/politika-privatnosti.html', 'politika-privatnosti'),
    ('hr/uvjeti-koristenja.html', 'uvjeti-koristenja'),
    ('hr/pravila-privatnosti.html', 'pravila-privatnosti')
]

print("Updating Croatian pages...")
for file_path, page_name in croatian_files:
    if os.path.exists(file_path):
        update_hreflang_tags(file_path, 'hr', page_name)

# Process English files
english_files = [
    ('en/index.html', 'index'),
    ('en/personal-tarot.html', 'personal-tarot'),
    ('en/online-tarot-reading.html', 'online-tarot-reading'),
    ('en/cookie-policy.html', 'cookie-policy'),
    ('en/privacy-policy.html', 'privacy-policy'),
    ('en/terms-conditions.html', 'terms-conditions')
]

print("\nUpdating English pages...")
for file_path, page_name in english_files:
    if os.path.exists(file_path):
        update_hreflang_tags(file_path, 'en', page_name)

print("\nDone!")