"""Social share images (Open Graph, 1200x630) for the main pages: public/og/<key>.jpg.

Base.astro picks public/og/<key>.jpg automatically, where key is the page path with "/" turned into "-"
("home" for "/", "zone-torino" for "/zone/torino/"). Pages without an image use site.ogImage (public/og-image.jpg).

Run from the project root:   python scripts/make-og.py
Re-run at launch after the placeholder photos in src/assets/media/ are replaced with the client's own
(the PHOTO map below says which photo each page uses). Needs Pillow; uses the Windows Georgia/Arial fonts,
falls back to DejaVu on other systems. No prices or unconfirmed numbers go on the images: they are not
updated when site.ts changes.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "src" / "assets" / "media"
OUT = ROOT / "public" / "og"
W, H, BAND = 1200, 630, 232
PETROL = (10, 56, 67)
SAND = (242, 199, 166)
SUB = "Venere Bagni · Torino e provincia"

PHOTO = {
    "hero": "hero-doccia-sicura.jpg", "solDoccia": "soluzione-doccia.jpg", "solSportello": "soluzione-sportello.jpg",
    "solSicuro": "soluzione-sicuro.jpg", "sopralluogo": "sopralluogo.jpg", "coppia": "coppia-bagno.jpg",
    "luminoso": "bagno-luminoso.jpg", "classico": "bagno-classico.jpg", "famiglia": "famiglia-bagno.jpg",
}
# Torino e provincia only since 2026-11-10.
ZONES = [
    ("torino", "a Torino e provincia", "coppia"),
]
# key, photo, title (keep it short: one or two lines at 56 px)
PAGES = [
    ("home", "hero", "Dalla vasca alla doccia in 8 ore"),
    ("vasca-in-doccia", "solDoccia", "Trasformazione vasca in doccia"),
    ("vasca-con-sportello", "solSportello", "Vasca con sportello: si entra senza scavalcare"),
    ("bagno-sicuro", "hero", "Un bagno sicuro per te o per un tuo genitore"),
    ("prezzi", "classico", "Quanto costa trasformare la vasca in doccia"),
    ("bonus-detrazioni", "luminoso", "Detrazioni per la doccia al posto della vasca nel 2026"),
    ("domande-frequenti", "sopralluogo", "Domande frequenti sulla vasca in doccia"),
    ("contatti", "sopralluogo", "Contatti e sopralluogo gratuito"),
    ("chi-siamo", "sopralluogo", "Chi c’è dietro Venere Bagni"),
    ("guide", "luminoso", "Guide per chi vuole togliere la vasca"),
    ("guide-doccia-a-norma-dm-236-detrazione", "hero", "Doccia a norma DM 236: cosa serve per la detrazione"),
    ("guide-piatto-doccia-filo-pavimento-o-ribassato", "solDoccia", "Piatto doccia filo pavimento o ribassato?"),
    ("guide-giorno-trasformazione-vasca-in-doccia", "coppia", "Il giorno della trasformazione, ora per ora"),
] + [(f"zone-{s}", p, f"Trasformazione vasca in doccia {at}") for s, at, p in ZONES]


def font(names, size):
    for n in names:
        for d in (Path("C:/Windows/Fonts"), Path("/usr/share/fonts/truetype/dejavu")):
            if (d / n).exists():
                return ImageFont.truetype(str(d / n), size)
    return ImageFont.load_default()


def cover(img):
    r = max(W / img.width, H / img.height)
    img = img.resize((round(img.width * r), round(img.height * r)), Image.LANCZOS)
    x, y = (img.width - W) // 2, max(0, (img.height - H) // 3)
    return img.crop((x, y, x + W, y + H))


def wrap(draw, text, f, maxw):
    lines, cur = [], ""
    for word in text.split():
        t = f"{cur} {word}".strip()
        if draw.textlength(t, font=f) <= maxw:
            cur = t
        else:
            lines.append(cur)
            cur = word
    return lines + [cur]


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sub_f = font(["arial.ttf", "DejaVuSans.ttf"], 30)
    for key, photo, title in PAGES:
        img = cover(Image.open(MEDIA / PHOTO[photo]).convert("RGB"))
        band = Image.new("RGBA", (W, BAND), PETROL + (232,))
        img.paste(band, (0, H - BAND), band)
        d = ImageDraw.Draw(img)
        size = 56
        while True:
            tf = font(["georgia.ttf", "DejaVuSerif.ttf"], size)
            lines = wrap(d, title, tf, W - 120)
            if len(lines) <= 2 or size <= 40:
                break
            size -= 4
        y = H - BAND + (34 if len(lines) == 2 else 52)
        for ln in lines[:2]:
            d.text((60, y), ln, font=tf, fill="white")
            y += size + 10
        d.text((60, H - 58), SUB, font=sub_f, fill=SAND)
        img.save(OUT / f"{key}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
        print("og/", key, ".jpg", sep="")
    # The site-wide default (site.ogImage) is the home image, so it never carries stale text.
    (ROOT / "public" / "og-image.jpg").write_bytes((OUT / "home.jpg").read_bytes())


if __name__ == "__main__":
    main()
