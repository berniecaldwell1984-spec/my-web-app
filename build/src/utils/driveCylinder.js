// Drive Cylinder Density — ASTM D2937
// dryDensity = dryWeight / cylinderVolume

export function calcDriveCylinderDensity(dryWeight, cylinderVolume) {
  const dw = parseFloat(dryWeight) || 0;
  const cv = parseFloat(cylinderVolume) || 0;

  if (!dw || !cv) return 0;

  return dw / cv; // pcf
}
