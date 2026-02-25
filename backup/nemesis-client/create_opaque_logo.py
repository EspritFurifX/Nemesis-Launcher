#!/usr/bin/env python3
from PIL import Image

# Charger l'image source
source = '/Users/espritfurtifx/github/Minecraft/nemesis_assets_ready/SealCircle.png'
img = Image.open(source).convert('RGBA')

# Créer fond noir OPAQUE
width, height = img.size
result = Image.new('RGB', (width, height), (0, 0, 0))

# Convertir RGBA en RGB (force opacité)
rgb_img = Image.new('RGB', img.size, (0, 0, 0))
rgb_img.paste(img, mask=img.split()[3])  # Utilise canal alpha comme masque

result = rgb_img

# Sauvegarder en RGB (pas RGBA = pas de transparence)
output = '/Users/espritfurtifx/github/Minecraft/nemesis-client/app/assets/images/LoaderLogo.png'
result.save(output, 'PNG')
print(f"✓ LoaderLogo.png créé (100% opaque, RGB)")
