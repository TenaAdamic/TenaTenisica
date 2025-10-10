#!/usr/bin/env python3
import os
import re

def fix_croatian_language_switchers():
    """Fix language switcher links in Croatian pages to properly link to English version"""

    croatian_to_english = {
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

            # Fix the language switcher link - multiple patterns to handle different formats
            patterns_to_fix = [
                # Pattern for ./personal-tarot.html, ./online-tarot-reading.html etc
                (r'href="\./(personal-tarot|online-tarot-reading)\.html"(\s+class="english")',
                 f'href="{english_url}"\\2'),
                # Pattern for relative paths without ./
                (r'href="(personal-tarot|online-tarot-reading|cookie-policy|privacy-policy|terms-conditions)\.html"(\s+class="english")',
                 f'href="{english_url}"\\2'),
                # Generic pattern for any link with class="english"
                (r'<a href="[^"]*"(\s+class="english")>',
                 f'<a href="{english_url}"\\1>')
            ]

            modified = False
            for pattern, replacement in patterns_to_fix:
                if re.search(pattern, content):
                    content = re.sub(pattern, replacement, content, count=1)
                    modified = True
                    break

            if modified:
                with open(croatian_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed: {croatian_file} -> {english_url}")
            else:
                print(f"Already correct or not found: {croatian_file}")

print("Fixing Croatian language switchers...")
fix_croatian_language_switchers()
print("\nDone!")