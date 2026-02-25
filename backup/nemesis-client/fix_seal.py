#!/usr/bin/env python3
from PIL import Image

# Ajouter fond noir à SealCircle pour le loader
img = Image.open('/Users/espritfurtifx/github/Minecraft/nemesis-client/app/assets/images/SealCircle.png').convert('RGBA')
background = Image.new('RGBA', img.size, (0, 0, 0, 255))
result = Image.alpha_composite(background, img)
result.save('/Users/espritfurtifx/github/Minecraft/nemesis-client/app/assets/images/SealCircle_BlackBG.png', 'PNG')
print("✓ SealCircle_BlackBG.png créé")
