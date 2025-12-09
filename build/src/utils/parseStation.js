export function parseStation(val) {
  if (!val) return 0;
  const str = val.toString().trim();
  if (str.includes('+')) {
    const parts = str.split('+');
    const stations = parseFloat(parts[0]) || 0;
    const feet = parseFloat(parts[1]) || 0;
    return (stations * 100) + feet;
  }
  return parseFloat(str) || 0;
}
