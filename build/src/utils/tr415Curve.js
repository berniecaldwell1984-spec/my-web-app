// Enhanced TR‑415 Curve Builder
// Input: array of { moisture, wetWeight, dryWeight, moldVolume }
// Output: curve points + OMC + MDD

export function buildTR415Curve(points) {
  if (!points || points.length === 0)
    return { curve: [], maxDryDensity: 0, omc: 0 };

  const curve = points.map((p) => {
    const dryDensity = p.dryWeight / p.moldVolume;
    return {
      moisture: p.moisture,
      dryDensity,
    };
  });

  // Find peak
  let maxDryDensity = 0;
  let omc = 0;

  for (const p of curve) {
    if (p.dryDensity > maxDryDensity) {
      maxDryDensity = p.dryDensity;
      omc = p.moisture;
    }
  }

  return { curve, maxDryDensity, omc };
}
