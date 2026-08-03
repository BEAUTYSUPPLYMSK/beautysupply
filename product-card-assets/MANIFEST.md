# Product Card Assets Manifest

## Summary

| Metric | Value |
|--------|-------|
| Total Products | 12 |
| Final Images per Product | 5 |
| Total Final Images | 60 |
| Output Format | WebP (quality 92) |
| Resolution | 2048x2048 |

## Products

| # | Product | Slug | Brand | Status |
|---|---------|------|-------|--------|
| 1 | VOL.U.lift Body | `image-skincare-volu-lift-body` | Image Skincare | ✅ |
| 2 | VOL.U.lift Face | `image-skincare-volu-lift-face` | Image Skincare | ✅ |
| 3 | Vital C Cream | `image-skincare-vital-c-cream` | Image Skincare | ✅ |
| 4 | Ageless Retinol | `image-skincare-ageless-retinol` | Image Skincare | ✅ |
| 5 | SPF 30 | `image-skincare-daily-prevention-spf30` | Image Skincare | ✅ |
| 6 | SPF 75 | `image-skincare-daily-prevention-spf75` | Image Skincare | ✅ |
| 7 | Pillow Talk | `charlotte-tilbury-pillow-talk` | Charlotte Tilbury | ✅ |
| 8 | Curator Eyeshadow | `hourglass-curator-eyeshadow` | Hourglass | ✅ |
| 9 | Ambient Palette | `hourglass-ambient-lighting-palette` | Hourglass | ✅ |
| 10 | Ambient Blush | `hourglass-ambient-lighting-blush` | Hourglass | ✅ |
| 11 | Hollywood Contour | `charlotte-tilbury-hollywood-contour` | Charlotte Tilbury | ✅ |
| 12 | Restoring Serum | `image-md-restoring-youth-serum` | Image MD | ✅ |

## Output Structure

```
beautysupply/product-card-assets/
├── product-01-[slug]/
│   ├── selected-sources/
│   ├── final-cards/ (hero, angle, lifestyle, detail, wow).webp
│   └── metadata.json
└── public/product-cards/ (web-ready copies)
```

## Image Variants

| Variant | Description |
|---------|-------------|
| hero | Main product image |
| angle | Dynamic view with glow |
| lifestyle | Contextual placement |
| detail | Macro/texture focus |
| wow | Premium with bokeh effects |

*Generated: 2026-08-04*
