const loadedFonts = new Set();

export function loadGoogleFont(fontName) {
  if (!fontName) return;

  const family = fontName.trim();
  if (loadedFonts.has(family)) return;

  const fontQuery = family.replace(/\s+/g, "+");

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontQuery}:wght@300;400;600;700&display=swap`;

  document.head.appendChild(link);
  loadedFonts.add(family);
}
