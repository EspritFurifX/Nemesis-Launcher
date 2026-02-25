#!/usr/bin/env python3
"""
Add solid black background to LoadingSeal.png
"""

from PIL import Image
import os

def add_black_background(input_path, output_path):
    """Add solid black background to transparent PNG"""
    # Open the transparent image
    img = Image.open(input_path).convert('RGBA')
    
    # Create black background
    background = Image.new('RGBA', img.size, (0, 0, 0, 255))
    
    # Composite image over black background
    result = Image.alpha_composite(background, img)
    
    # Save
    result.save(output_path, 'PNG', optimize=True)
    print(f"✓ Created: {output_path} with solid black background")

def main():
    base_dir = '/Users/espritfurtifx/github/Minecraft/nemesis-client'
    
    loading_seal = os.path.join(base_dir, 'app', 'assets', 'images', 'LoadingSeal.png')
    
    if not os.path.exists(loading_seal):
        print(f"❌ File not found: {loading_seal}")
        return
    
    # Add black background to LoadingSeal
    add_black_background(loading_seal, loading_seal)
    
    print("\n✅ LoadingSeal.png updated with black background!")

if __name__ == '__main__':
    main()
