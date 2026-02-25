#!/usr/bin/env python3
"""
Use the justice scale logo with glow effect
Save it and convert to all formats
"""

from PIL import Image, ImageDraw
import os
import subprocess
import shutil

# The provided logo will be recreated based on the visual
def create_justice_scale_logo_from_reference(size, output_path):
    """Create the justice scale logo matching the provided reference"""
    # Create transparent canvas
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    center_x = size // 2
    center_y = size // 2
    scale_size = int(size * 0.6)  # Scale is 60% of canvas
    
    # Colors from reference
    neon_white = (255, 255, 255, 255)
    cyan_glow = (0, 200, 255, 255)
    
    # Drawing dimensions
    pillar_width = max(int(size * 0.035), 4)
    beam_width = max(int(size * 0.03), 3)
    
    # Base/pedestal
    base_width = int(scale_size * 0.3)
    base_height = int(scale_size * 0.08)
    base_y = center_y + int(scale_size * 0.35)
    
    # Draw cyan glow around base
    for i in range(8, 0, -1):
        alpha = int(40 * (i / 8))
        glow_expand = i * 3
        draw.rectangle(
            [center_x - base_width - glow_expand, base_y - glow_expand,
             center_x + base_width + glow_expand, base_y + base_height + glow_expand],
            fill=(0, 200, 255, alpha)
        )
    
    # Main base
    draw.rectangle(
        [center_x - base_width, base_y,
         center_x + base_width, base_y + base_height],
        fill=neon_white
    )
    
    # Central pillar
    pillar_top = center_y - int(scale_size * 0.35)
    pillar_bottom = base_y
    
    # Cyan glow for pillar
    for i in range(15, 0, -1):
        alpha = int(60 * (i / 15))
        glow_width = pillar_width + i * 2
        x_offset = glow_width // 2
        draw.rectangle(
            [center_x - x_offset, pillar_top,
             center_x + x_offset, pillar_bottom],
            fill=(0, 200, 255, alpha)
        )
    
    # Main pillar
    draw.rectangle(
        [center_x - pillar_width // 2, pillar_top,
         center_x + pillar_width // 2, pillar_bottom],
        fill=neon_white
    )
    
    # Horizontal beam
    beam_y = center_y - int(scale_size * 0.25)
    beam_half_width = int(scale_size * 0.35)
    
    # Beam glow
    for i in range(12, 0, -1):
        alpha = int(60 * (i / 12))
        glow_height = beam_width + i * 2
        y_offset = glow_height // 2
        draw.rectangle(
            [center_x - beam_half_width - i * 2, beam_y - y_offset,
             center_x + beam_half_width + i * 2, beam_y + y_offset],
            fill=(0, 200, 255, alpha)
        )
    
    # Main beam
    draw.rectangle(
        [center_x - beam_half_width, beam_y - beam_width // 2,
         center_x + beam_half_width, beam_y + beam_width // 2],
        fill=neon_white
    )
    
    # Balance pans
    pan_positions = [
        center_x - int(scale_size * 0.28),  # Left
        center_x + int(scale_size * 0.28)   # Right
    ]
    
    pan_width = int(scale_size * 0.12)
    pan_height = int(scale_size * 0.15)
    pan_top = beam_y + int(scale_size * 0.08)
    
    chain_width = max(int(size * 0.008), 2)
    
    for pan_x in pan_positions:
        # Chain/rope with glow
        for i in range(8, 0, -1):
            alpha = int(50 * (i / 8))
            glow_width = chain_width + i
            draw.line(
                [(pan_x, beam_y), (pan_x, pan_top)],
                fill=(0, 200, 255, alpha),
                width=glow_width
            )
        
        # Main chain
        draw.line(
            [(pan_x, beam_y), (pan_x, pan_top)],
            fill=neon_white,
            width=chain_width
        )
        
        # Pan trapezoid (wider at top)
        pan_points = [
            (pan_x - pan_width, pan_top),
            (pan_x + pan_width, pan_top),
            (pan_x + int(pan_width * 0.7), pan_top + pan_height),
            (pan_x - int(pan_width * 0.7), pan_top + pan_height)
        ]
        
        # Pan glow
        for i in range(10, 0, -1):
            alpha = int(50 * (i / 10))
            offset = i * 2
            glow_points = [
                (pan_x - pan_width - offset, pan_top - offset),
                (pan_x + pan_width + offset, pan_top - offset),
                (pan_x + int(pan_width * 0.7) + offset, pan_top + pan_height + offset),
                (pan_x - int(pan_width * 0.7) - offset, pan_top + pan_height + offset)
            ]
            draw.polygon(glow_points, fill=(0, 200, 255, alpha))
        
        # Main pan
        draw.polygon(pan_points, fill=neon_white)
    
    # Stars around the scale (from reference: 8 stars)
    star_positions = [
        (center_x, pillar_top - int(scale_size * 0.1)),  # Top
        (center_x - int(scale_size * 0.15), center_y - int(scale_size * 0.15)),  # Upper left
        (center_x + int(scale_size * 0.15), center_y - int(scale_size * 0.15)),  # Upper right
        (center_x - int(scale_size * 0.2), center_y),  # Middle left
        (center_x + int(scale_size * 0.2), center_y),  # Middle right
        (center_x - int(scale_size * 0.15), center_y + int(scale_size * 0.1)),  # Lower left
        (center_x, center_y + int(scale_size * 0.2)),  # Lower center
        (center_x + int(scale_size * 0.15), center_y + int(scale_size * 0.1)),  # Lower right
    ]
    
    star_size = int(size * 0.025)
    
    for star_x, star_y in star_positions:
        # Star glow
        for i in range(8, 0, -1):
            alpha = int(80 * (i / 8))
            glow_size = star_size + i * 2
            draw.ellipse(
                [star_x - glow_size, star_y - glow_size,
                 star_x + glow_size, star_y + glow_size],
                fill=(0, 220, 255, alpha)
            )
        
        # Star core (5-pointed star simplified as circle for now)
        draw.ellipse(
            [star_x - star_size, star_y - star_size,
             star_x + star_size, star_y + star_size],
            fill=neon_white
        )
    
    img.save(output_path, 'PNG', optimize=True)
    print(f"✓ Created: {output_path} ({size}x{size})")
    return output_path

def resize_logo(source_path, target_path, size):
    """Resize logo maintaining transparency"""
    img = Image.open(source_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(target_path, 'PNG', optimize=True)
    print(f"✓ Resized: {target_path} ({size}x{size})")

def create_ico_from_png(png_path, ico_path):
    """Create multi-resolution ICO"""
    img = Image.open(png_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    sizes = [(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
    img.save(ico_path, format='ICO', sizes=sizes)
    print(f"✓ Created: {ico_path}")

def create_icns_structure(png_path, icns_path):
    """Create ICNS"""
    img = Image.open(png_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    iconset_dir = icns_path.replace('.icns', '.iconset')
    os.makedirs(iconset_dir, exist_ok=True)
    
    sizes = [
        (16, 'icon_16x16.png'), (32, 'icon_16x16@2x.png'),
        (32, 'icon_32x32.png'), (64, 'icon_32x32@2x.png'),
        (128, 'icon_128x128.png'), (256, 'icon_128x128@2x.png'),
        (256, 'icon_256x256.png'), (512, 'icon_256x256@2x.png'),
        (512, 'icon_512x512.png'), (1024, 'icon_512x512@2x.png'),
    ]
    
    for size, filename in sizes:
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(os.path.join(iconset_dir, filename), 'PNG')
    
    try:
        subprocess.run(['iconutil', '-c', 'icns', iconset_dir, '-o', icns_path], check=True)
        print(f"✓ Created: {icns_path}")
        shutil.rmtree(iconset_dir)
    except Exception as e:
        print(f"⚠ ICNS: {e}")

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    print("🎨 Creating justice scale logo from reference...\n")
    
    # Create master logo
    master_logo = os.path.join(base_dir, 'master_logo_temp.png')
    create_justice_scale_logo_from_reference(1024, master_logo)
    
    # Convert to all formats
    seal_png = os.path.join(base_dir, 'app', 'assets', 'images', 'SealCircle.png')
    resize_logo(master_logo, seal_png, 1024)
    
    seal_ico = os.path.join(base_dir, 'app', 'assets', 'images', 'SealCircle.ico')
    create_ico_from_png(seal_png, seal_ico)
    
    loading_seal = os.path.join(base_dir, 'app', 'assets', 'images', 'LoadingSeal.png')
    resize_logo(master_logo, loading_seal, 256)
    
    icon_png = os.path.join(base_dir, 'build', 'icon.png')
    resize_logo(master_logo, icon_png, 512)
    
    icon_ico = os.path.join(base_dir, 'build', 'icon.ico')
    create_ico_from_png(icon_png, icon_ico)
    
    icon_icns = os.path.join(base_dir, 'build', 'icon.icns')
    create_icns_structure(icon_png, icon_icns)
    
    # Cleanup
    os.remove(master_logo)
    
    print("\n✅ All assets created from justice scale reference!")
    print("\n📋 Restart app: npm start")

if __name__ == '__main__':
    main()
