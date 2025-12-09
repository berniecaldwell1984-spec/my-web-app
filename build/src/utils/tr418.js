// TR‑418: Standard Proctor
// Input: array of { moisture, dryDensity }
// Output: max dry density + OMC

export function findMaxDensityAndOMC(points) {
  if (!points || points.length === 0)
    return { maxDryDensity: 0, omc: 0 };

  let maxDryDensity = 0;
  let omc = 0;

  for (const p of points) {
    if (p.dryDensity > maxDryDensity) {
      maxDryDensity = p.dryDensity;
      omc = p.moisture;
    }
  }

  return { maxDryDensity, omc };
}
