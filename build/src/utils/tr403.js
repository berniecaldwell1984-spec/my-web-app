// TR‑403: Moisture Content
// Formula: w% = (Wwet - Wdry) / Wdry * 100

export function calcMoistureContent(wetWeight, dryWeight) {
  const wWet = parseFloat(wetWeight) || 0;
  const wDry = parseFloat(dryWeight) || 0;

  if (!wWet || !wDry) return 0;

  return ((wWet - wDry) / wDry) * 100;
}
