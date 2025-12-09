// Sand Cone Density — ASTM D1556
// dryDensity = dryWeight / holeVolume

export function calcSandConeDensity(dryWeight, holeVolume) {
  const dw = parseFloat(dryWeight) || 0;
  const hv = parseFloat(holeVolume) || 0;

  if (!dw || !hv) return 0;

  return dw / hv; // pcf
}
