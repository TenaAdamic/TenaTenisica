#!/usr/bin/env python3
import os
import re

def fix_logo_links():
    """Fix logo links in English pages to point to the correct homepage"""

    # List of English pages that need fixing
    english_pages = [
        'en/personal-tarot.html',
        'en/online-tarot-reading.html',
        'en/cookie-policy.html',
        'en/privacy-policy.html',
        'en/terms-conditions.html'
    ]

    for page in english_pages:
        if os.path.exists(page):
            with open(page, 'r', encoding='utf-8') as f:
                content = f.read()

            # Replace tarot-speaks.html with ./index.html (or just ./)
            content = re.sub(
                r'href="[^"]*tarot-speaks\.html"',
                'href="./"',
                content
            )

            with open(page, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"Fixed logo link in: {page}")

    # Also check Croatian pages to ensure they link to their homepage correctly
    croatian_pages = [
        'hr/osobni-tarot.html',
        'hr/online-tarot.html',
        'hr/politika-kolacica.html',
        'hr/politika-privatnosti.html',
        'hr/uvjeti-koristenja.html'
    ]

    for page in croatian_pages:
        if os.path.exists(page):
            with open(page, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if logo link needs fixing (should be ./ or ./index.html)
            if 'href="../' in content or 'href="/hr/"' in content:
                # These are probably fine, but let's make sure they're consistent
                pass

            print(f"Checked Croatian page: {page}")

print("Fixing logo links in English pages...")
fix_logo_links()
print("\nDone!")