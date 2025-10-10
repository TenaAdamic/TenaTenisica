#!/usr/bin/env python3
import os
import re

def fix_english_language_switchers():
    """Fix language switcher links in English pages to properly link to Croatian version"""

    # Mapping of English pages to their Croatian equivalents
    english_to_croatian = {
        'en/index.html': '/hr/',
        'en/personal-tarot.html': '/hr/osobni-tarot.html',
        'en/online-tarot-reading.html': '/hr/online-tarot.html',
        'en/cookie-policy.html': '/hr/politika-kolacica.html',
        'en/privacy-policy.html': '/hr/politika-privatnosti.html',
        'en/terms-conditions.html': '/hr/uvjeti-koristenja.html'
    }

    for english_file, croatian_url in english_to_croatian.items():
        if os.path.exists(english_file):
            with open(english_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix the language switcher link
            # Pattern to find the Croatian language switcher
            patterns = [
                (r'href="\.?/?(index\.html|osobni-tarot\.html|online-tarot\.html|politika-kolacica\.html|politika-privatnosti\.html|uvjeti-koristenja\.html)"(\s+class="english")?',
                 f'href="{croatian_url}"\\2'),
                (r'<a href="[^"]*"(\s+class="english")>\s*<img[^>]*hr\.svg',
                 f'<a href="{croatian_url}"\\1>\n          <img src="./images/hr.svg"')
            ]

            for pattern, replacement in patterns:
                if re.search(pattern, content):
                    content = re.sub(pattern, replacement, content)
                    break

            with open(english_file, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"Fixed language switcher in: {english_file} -> {croatian_url}")

def fix_croatian_language_switchers():
    """Ensure Croatian pages properly link to English version"""

    croatian_to_english = {
        'hr/index.html': '/en/',
        'hr/osobni-tarot.html': '/en/personal-tarot.html',
        'hr/online-tarot.html': '/en/online-tarot-reading.html',
        'hr/politika-kolacica.html': '/en/cookie-policy.html',
        'hr/politika-privatnosti.html': '/en/privacy-policy.html',
        'hr/uvjeti-koristenja.html': '/en/terms-conditions.html'
    }

    for croatian_file, english_url in croatian_to_english.items():
        if os.path.exists(croatian_file):
            with open(croatian_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Already fixed in previous script, but let's verify
            if '/en/' not in content and 'class="english"' in content:
                # Find and fix English language switcher
                content = re.sub(
                    r'href="[^"]*tarot-speaks\.html"(\s+class="english")?',
                    f'href="{english_url}"\\1',
                    content
                )

                with open(croatian_file, 'w', encoding='utf-8') as f:
                    f.write(content)

                print(f"Fixed language switcher in: {croatian_file} -> {english_url}")

print("Fixing English language switchers...")
fix_english_language_switchers()

print("\nVerifying Croatian language switchers...")
fix_croatian_language_switchers()

print("\nLanguage switchers fixed!")