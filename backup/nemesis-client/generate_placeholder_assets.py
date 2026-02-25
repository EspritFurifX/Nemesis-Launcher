#!/usr/bin/env python3
"""
Generate placeholder assets for Nemesis Launcher
Creates temporary logo/icon files for build validation
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_logo(size, output_path):
    """Create a justice scale logo with neon glow effect"""
    # Create image with transparency
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw dark circle background
    padding = size // 10
    draw.ellipse(
        [padding, padding, size - padding, size - padding],
        fill=(5, 10, 20, 255)
    )
    
    # Cyan neon border with glow
    border_width = max(3, size // 60)
    for i in range(5):
        glow_alpha = 60 - i * 10
        glow_width = border_width + i * 2
        draw.ellipse(
            [padding, padding, size - padding, size - padding],
            outline=(0, 200, 255, glow_alpha),
            width=glow_width
        )
    
    # Draw justice scale symbol
    center_x = size // 2
    center_y = size // 2
    scale_size = size // 3
    
    # Pillar (central column)
    pillar_width = max(4, size // 80)
    pillar_top = center_y - scale_size // 3
    pillar_bottom = center_y + scale_size // 2
    
    # Glow effect for pillar
    for i in range(3):
        glow_alpha = 80 - i * 20
        glow_width = pillar_width + i * 2
        draw.line(
            [(center_x, pillar_top), (center_x, pillar_bottom)],
            fill=(0, 200, 255, glow_alpha),
            width=glow_width
        )
    
    # Main pillar
    draw.line(
        [(center_x, pillar_top), (center_x, pillar_bottom)],
        fill=(200, 240, 255, 255),
        width=pillar_width
    )
    
    # Horizontal beam
    beam_y = center_y - scale_size // 4
    beam_left = center_x - scale_size // 2
    beam_right = center_x + scale_size // 2
    beam_width = max(3, size // 90)
    
    # Beam glow
    for i in range(3):
        glow_alpha = 80 - i * 20
        glow_width = beam_width + i * 2
        draw.line(
            [(beam_left, beam_y), (beam_right, beam_y)],
            fill=(0, 200, 255, glow_alpha),
            width=glow_width
        )
    
    # Main beam
    draw.line(
        [(beam_left, beam_y), (beam_right, beam_y)],
        fill=(200, 240, 255, 255),
        width=beam_width
    )
    
    # Draw balance pans (left and right)
    pan_offset = scale_size // 2.5
    pan_size = scale_size // 4
    
    # Left pan
    left_pan_x = center_x - pan_offset
    left_pan_y = beam_y + size // 20
    
    # Right pan
    right_pan_x = center_x + pan_offset
    right_pan_y = beam_y + size // 20
    
    for pan_x in [left_pan_x, right_pan_x]:
        # Chain/rope
        chain_width = max(2, size // 120)
        for i in range(2):
            glow_alpha = 60 - i * 20
            draw.line(
                [(pan_x, beam_y), (pan_x, left_pan_y)],
                fill=(0, 200, 255, glow_alpha),
                width=chain_width + i
            )
        draw.line(
            [(pan_x, beam_y), (pan_x, left_pan_y)],
            fill=(200, 240, 255, 255),
            width=chain_width
        )
        
        # Pan (ellipse)
        pan_w = pan_size
        pan_h = pan_size // 3
        
        # Pan glow
        for i in range(3):
            glow_alpha = 60 - i * 15
            glow_offset = i * 2
            draw.ellipse(
                [pan_x - pan_w - glow_offset, left_pan_y - glow_offset, 
                 pan_x + pan_w + glow_offset, left_pan_y + pan_h + glow_offset],
                outline=(0, 200, 255, glow_alpha),
                width=2
            )
        
        # Main pan
        draw.ellipse(
            [pan_x - pan_w, left_pan_y, pan_x + pan_w, left_pan_y + pan_h],
            fill=(15, 25, 40, 255),
            outline=(200, 240, 255, 255),
            width=max(2, size // 150)
        )
    
    # Top star/decoration
    star_y = pillar_top - size // 20
    star_size = size // 30
    for i in range(2):
        glow_alpha = 100 - i * 30
        glow_size = star_size + i * 2
        draw.ellipse(
            [center_x - glow_size, star_y - glow_size,
             center_x + glow_size, star_y + glow_size],
            fill=(0, 220, 255, glow_alpha)
        )
    
    draw.ellipse(
        [center_x - star_size, star_y - star_size,
         center_x + star_size, star_y + star_size],
        fill=(220, 250, 255, 255)
    )
    
    # Save
    img.save(output_path, 'PNG')
    print(f"✓ Created: {output_path} ({size}x{size}) - Justice scale with neon glow")

def create_ico_from_png(png_path, ico_path):
    """Create multi-resolution ICO from PNG"""
    img = Image.open(png_path)
    sizes = [(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
    img.save(ico_path, format='ICO', sizes=sizes)
    print(f"✓ Created: {ico_path} (multi-resolution)")

def create_icns_structure(png_path, icns_path):
    """Create ICNS using iconutil (macOS only)"""
    import subprocess
    import shutil
    
    img = Image.open(png_path)
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

def create_loading_text(output_path):
    """Create loading text image"""
    width = 300
    height = 60
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    try:
        font_paths = [
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/System/Library/Fonts/Helvetica.ttc"
        ]
        
        font = None
        for font_path in font_paths:
            try:
                font = ImageFont.truetype(font_path, 32)
                break
            except:
                continue
        
        if not font:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    text = "NEMESIS LAUNCHER"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Text shadow/glow
    for offset in [(0, 1), (1, 0), (0, -1), (-1, 0), (1, 1), (-1, -1)]:
        draw.text(
            (x + offset[0] * 2, y + offset[1] * 2),
            text,
            fill=(0, 180, 255, 80),
            font=font
        )
    
    # Main text
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    
    img.save(output_path, 'PNG')
    print(f"✓ Created: {output_path} ({width}x{height})")

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("🎨 Generating Nemesis Launcher placeholder assets...\n")
    
    # 1. SealCircle.png (UI logo)
    seal_png = os.path.join(base_dir, 'app', 'assets', 'images', 'SealCircle.png')
    create_placeholder_logo(1024, seal_png)
    
    # 2. SealCircle.ico (Windows UI)
    seal_ico = os.path.join(base_dir, 'app', 'assets', 'images', 'SealCircle.ico')
    create_ico_from_png(seal_png, seal_ico)
    
    # 3. LoadingSeal.png (Loading animation logo)
    loading_seal = os.path.join(base_dir, 'app', 'assets', 'images', 'LoadingSeal.png')
    create_placeholder_logo(256, loading_seal)
    print(f"✓ Created: {loading_seal} (256x256)")
    
    # 4. LoadingText.png (Loading text)
    loading_text = os.path.join(base_dir, 'app', 'assets', 'images', 'LoadingText.png')
    create_loading_text(loading_text)
    
    # 5. build/icon.png (Linux app icon)
    icon_png = os.path.join(base_dir, 'build', 'icon.png')
    create_placeholder_logo(512, icon_png)
    
    # 6. build/icon.ico (Windows app icon)
    icon_ico = os.path.join(base_dir, 'build', 'icon.ico')
    create_ico_from_png(icon_png, icon_ico)
    
    # 7. build/icon.icns (macOS app icon)
    icon_icns = os.path.join(base_dir, 'build', 'icon.icns')
    create_icns_structure(icon_png, icon_icns)
    
    print("\n✅ All placeholder assets generated successfully!")
    print("\n📋 Next steps:")
    print("   1. rm -rf dist")
    print("   2. npm start")
    print("   3. npm run dist")
    print("\n💡 Replace these files with real assets when ready (same names, no code changes)")

if __name__ == '__main__':
    main()
