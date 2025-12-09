// Core Thickness — DOTD TR 305
// average = (top + bottom) / 2

export function calcCoreThickness(top, bottom) {
  const t = parseFloat(top) || 0;
  const b = parseFloat(bottom) || 0;

  if (!t || !b) return 0;

  return (t + b) / 2; // inches
}
