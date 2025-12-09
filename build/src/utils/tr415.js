// TR‑415: Field Moisture‑Density Curve
// Uses field‑mixed material instead of lab‑prepared.
// Input: array of { wetWeight, dryWeight, moldVolume, moisture }

import { findMaxDensityAndOMC } from './tr418.js';

export function buildTR415Curve(points) {
  if (!points || points.length === 0)
    return { curve: [], maxDryDensity: 0, omc: 0 };

  const curve = points.map((p) => {
    const dryDensity = p.dryWeight / p.moldVolume; // pcf
    return {
      moisture: p.moisture,
      dryDensity,
    };
  });

  const { maxDryDensity, omc } = findMaxDensityAndOMC(curve);

  return { curve, maxDryDensity, omc };
}
