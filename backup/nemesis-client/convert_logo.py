#!/usr/bin/env python3
"""
Convert the provided justice scale logo to all required formats
"""

from PIL import Image
import os
import subprocess
import shutil

def resize_logo(source_path, target_path, size):
    """Resize logo maintaining transparency"""
    img = Image.open(source_path)
    
    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Resize with high-quality resampling
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(target_path, 'PNG', optimize=True)
    print(f"✓ Created: {target_path} ({size}x{size})")

def create_ico_from_png(png_path, ico_path):
    """Create multi-resolution ICO from PNG"""
    img = Image.open(png_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    sizes = [(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
    img.save(ico_path, format='ICO', sizes=sizes)
    print(f"✓ Created: {ico_path} (multi-resolution)")

def create_icns_structure(png_path, icns_path):
    """Create ICNS using iconutil (macOS only)"""
    img = Image.open(png_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    iconset_dir = icns_path.replace('.icns', '.iconset')
    
    # Create iconset directory
    os.makedirs(iconset_dir, exist_ok=True)
    
    # Required sizes for ICNS
    sizes = [
        (16, 'icon_16x16.png'),
        (32, 'icon_16x16@2x.png'),
        (32, 'icon_32x32.png'),
        (64, 'icon_32x32@2x.png'),
        (128, 'icon_128x128.png'),
        (256, 'icon_128x128@2x.png'),
        (256, 'icon_256x256.png'),
        (512, 'icon_256x256@2x.png'),
        (512, 'icon_512x512.png'),
        (1024, 'icon_512x512@2x.png'),
    ]
    
    for size, filename in sizes:
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(os.path.join(iconset_dir, filename), 'PNG')
    
    # Convert to ICNS using iconutil
    try:
        subprocess.run(['iconutil', '-c', 'icns', iconset_dir, '-o', icns_path], check=True)
        print(f"✓ Created: {icns_path}")
        # Clean up iconset directory
        shutil.rmtree(iconset_dir)
    except Exception as e:
        print(f"⚠ Failed to create ICNS: {e}")
        print(f"  Iconset directory preserved at: {iconset_dir}")

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Source logo (you need to place your logo as 'source_logo.png' in this directory)
    source_logo = os.path.join(base_dir, 'source_logo.png')
    
    if not os.path.exists(source_logo):
        print("❌ Error: source_logo.png not found!")
        print("   Please place your 1024x1024 PNG logo as 'source_logo.png' in this directory")
        return
    
    print("🎨 Converting Nemesis Launcher logo to all formats...\n")
    
    # 1. SealCircle.png (UI logo - 1024x1024)
    seal_png = os.path.join(base_dir, 'app', 'assets', 'images', 'SealCircle.png')
    resize_logo(source_logo, seal_png, 1024)
    
    # 2. SealCircle.ico (Windows UI)
    seal_ico = os.path.join(base_dir, 'app', 'assets', 'images', 'SealCircle.ico')
    create_ico_from_png(seal_png, seal_ico)
    
    # 3. LoadingSeal.png (Loading animation - 256x256)
    loading_seal = os.path.join(base_dir, 'app', 'assets', 'images', 'LoadingSeal.png')
    resize_logo(source_logo, loading_seal, 256)
    
    # 4. build/icon.png (Linux app icon - 512x512)
    icon_png = os.path.join(base_dir, 'build', 'icon.png')
    resize_logo(source_logo, icon_png, 512)
    
    # 5. build/icon.ico (Windows app icon)
    icon_ico = os.path.join(base_dir, 'build', 'icon.ico')
    create_ico_from_png(icon_png, icon_ico)
    
    # 6. build/icon.icns (macOS app icon)
    icon_icns = os.path.join(base_dir, 'build', 'icon.icns')
    create_icns_structure(icon_png, icon_icns)
    
    print("\n✅ All logo assets converted successfully!")
    print("\n📋 Next steps:")
    print("   1. npm start (test in dev mode)")
    print("   2. npm run dist (build installer with new logo)")

if __name__ == '__main__':
    main()
