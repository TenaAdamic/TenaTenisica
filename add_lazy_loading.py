#!/usr/bin/env python3
import re
import os
import glob

# Image dimensions (actual sizes)
IMAGE_DIMENSIONS = {
    'History_Tarot': {'width': 1280, 'height': 960},
    'Major_Arcana_Meaning': {'width': 1080, 'height': 1080},
    'Tarot_Prep': {'width': 1080, 'height': 1080},
    'Mimi_logo': {'width': 320, 'height': 320}
}

def add_lazy_loading_to_blog_images(content):
    """Add lazy loading and dimensions to blog images (non-critical)"""

    # Pattern for blog images that should be lazy loaded
    patterns_replacements = [
        # History_Tarot
        (
            r'(<img[^>]*src="[^"]*History_Tarot\.(jpg|webp)"[^>]*?)(\s*/>)',
            lambda m: add_lazy_attributes(m, 'History_Tarot')
        ),
        # Major_Arcana_Meaning
        (
            r'(<img[^>]*src="[^"]*Major_Arcana_Meaning\.(png|webp)"[^>]*?)(\s*/>)',
            lambda m: add_lazy_attributes(m, 'Major_Arcana_Meaning')
        ),
        # Tarot_Prep
        (
            r'(<img[^>]*src="[^"]*Tarot_Prep\.(jpeg|webp)"[^>]*?)(\s*/>)',
            lambda m: add_lazy_attributes(m, 'Tarot_Prep')
        )
    ]

    for pattern, replacement_func in patterns_replacements:
        content = re.sub(pattern, replacement_func, content, flags=re.IGNORECASE)

    return content

def add_eager_loading_to_logos(content):
    """Add eager loading and dimensions to logo images (critical)"""

    # Pattern for logo images that should load eagerly
    logo_pattern = r'(<img[^>]*src="[^"]*Mimi_logo\.png"[^>]*?)(\s*/>)'

    def add_logo_attributes(match):
        img_tag = match.group(1)
        closing = match.group(2)

        # Add loading="eager" if not present
        if 'loading=' not in img_tag:
            img_tag += ' loading="eager"'

        # Add width/height if not present
        if 'width=' not in img_tag and 'height=' not in img_tag:
            # Logo is displayed at 120px height, calculate proportional width
            # Original: 320x320, display height: 120px, so width should be 120px too
            img_tag += ' width="120" height="120"'

        return img_tag + closing

    content = re.sub(logo_pattern, add_logo_attributes, content, flags=re.IGNORECASE)
    return content

def add_lazy_attributes(match, image_name):
    """Helper function to add lazy loading and dimensions"""
    img_tag = match.group(1)
    closing = match.group(3)

    # Add loading="lazy" if not present
    if 'loading=' not in img_tag:
        img_tag += ' loading="lazy"'

    # Add width/height if not present (using intrinsic dimensions)
    if 'width=' not in img_tag and 'height=' not in img_tag:
        dims = IMAGE_DIMENSIONS[image_name]
        # For responsive images, we'll use intrinsic dimensions but let CSS handle sizing
        img_tag += f' width="{dims["width"]}" height="{dims["height"]}"'

    return img_tag + closing

def add_sizes_attribute(content):
    """Add sizes attribute for responsive images"""

    # Add sizes to images that don't have it
    patterns = [
        r'(<img[^>]*src="[^"]*(?:History_Tarot|Major_Arcana_Meaning|Tarot_Prep)\.[^"]*"[^>]*?)(?!.*sizes=)([^>]*)(/>)',
    ]

    for pattern in patterns:
        replacement = r'\1 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"\2\3'
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

    return content

def process_html_file(filepath):
    """Process a single HTML file"""
    print(f"Processing {filepath}...")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Add lazy loading to blog images
    content = add_lazy_loading_to_blog_images(content)

    # Add eager loading to logos
    content = add_eager_loading_to_logos(content)

    # Add sizes attribute for responsive images
    content = add_sizes_attribute(content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Updated {filepath}")
    else:
        print(f"  - No changes needed for {filepath}")

def main():
    os.chdir("/Users/tenaadamic/Desktop/RazniProjektići/TarotNaMaksimiru")

    # Get all HTML files
    html_files = glob.glob("**/*.html", recursive=True)

    print("Adding comprehensive lazy loading and dimensions...")
    print("=" * 60)

    for filepath in html_files:
        if not filepath.startswith(('.', 'node_modules', 'dist', 'build')):
            process_html_file(filepath)

    print("=" * 60)
    print("✅ Lazy loading optimization complete!")
    print("\nWhat was added:")
    print("🚀 Logo images: loading='eager' + width/height (critical images)")
    print("🐌 Blog images: loading='lazy' + width/height + sizes (non-critical)")
    print("📐 Explicit dimensions prevent layout shift")
    print("📱 Responsive sizes for optimal mobile performance")

if __name__ == "__main__":
    main()