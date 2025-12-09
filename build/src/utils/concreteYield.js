// Concrete Yield — ASTM C138
// yield = batchVolume / unitWeight

export function calcConcreteYield(batchVolume, unitWeight) {
  const bv = parseFloat(batchVolume) || 0;
  const uw = parseFloat(unitWeight) || 0;

  if (!bv || !uw) return 0;

  return bv / uw; // cubic yards
}
