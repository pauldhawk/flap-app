import os
import svgwrite
import string
from splitflap import hershey_fonts
from splitflap.letter_set import DEFAULT_LETTER_SET
from splitflap.glyph import GlyphRenderer

# Constants
CARD_WIDTH_MM = 54
CARD_HEIGHT_MM = 42
FLAP_HEIGHT_MM = 14
DIVIDER_X_MM = CARD_WIDTH_MM / 2  # 27 mm
FONT_SCALE = 1.0  # Will be scaled later to fit flap height
OUTPUT_DIR = "flap_cards"

# Setup font
font = hershey_fonts.get_font("futural")  # Match generate_fonts.py
renderer = GlyphRenderer(font=font)

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# We'll only do A–Z
letters = list(string.ascii_uppercase)

for i, front_char in enumerate(letters):
    # Back uses the previous character (wrap around for A)
    back_char = letters[i - 1] if i > 0 else " "

    dwg = svgwrite.Drawing(
        filename=os.path.join(OUTPUT_DIR, f"flap_{front_char}_{back_char}.svg"),
        size=(f"{CARD_WIDTH_MM}mm", f"{CARD_HEIGHT_MM}mm"),
        viewBox=f"0 0 {CARD_WIDTH_MM} {CARD_HEIGHT_MM}",
    )

    # Add divider line (light gray)
    dwg.add(dwg.line(
        start=(DIVIDER_X_MM, 0),
        end=(DIVIDER_X_MM, FLAP_HEIGHT_MM),
        stroke=svgwrite.rgb(200, 200, 200, '%'),
        stroke_width=0.5
    ))

    # Render glyphs
    def render_half_glyph(char, x_offset, align_top=True):
        # Get vector paths from font
        paths = renderer.render_glyph(char, scale=1.0)
        # Get bounding box to normalize
        min_x, min_y, max_x, max_y = renderer.get_glyph_bounds(char)
        glyph_height = max_y - min_y
        scale = FLAP_HEIGHT_MM / glyph_height

        # Move vertically to fit top or bottom half
        if align_top:
            clip_y_min = min_y + glyph_height * 0.0
            clip_y_max = min_y + glyph_height * 0.5
        else:
            clip_y_min = min_y + glyph_height * 0.5
            clip_y_max = min_y + glyph_height * 1.0

        for path_data in paths:
            points = []
            for (cmd, x, y) in path_data:
                if y < clip_y_min or y > clip_y_max:
                    continue
                # Scale and flip Y
                draw_x = x_offset + (x - min_x) * scale
                draw_y = (y - clip_y_min) * scale
                points.append((cmd, draw_x, draw_y))

            if points:
                d_attr = ""
                for cmd, x, y in points:
                    d_attr += f"{cmd} {x:.2f},{FLAP_HEIGHT_MM - y:.2f} "
                dwg.add(dwg.path(d=d_attr.strip(), stroke="black", fill="none", stroke_width=0.5))

    # Draw front (top half of current char)
    render_half_glyph(front_char, x_offset=0, align_top=True)

    # Draw back (bottom half of previous char)
    render_half_glyph(back_char, x_offset=DIVIDER_X_MM, align_top=False)

    dwg.save()

print(f"Generated {len(letters)} flap cards in {OUTPUT_DIR}/")