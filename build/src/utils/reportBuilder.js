export function getToday() {
  return new Date().toLocaleDateString();
}

export function buildStabilizationReport({
  job,
  location,
  material,
  percent,
  dryDensity,
  startStation,
  endStation,
  length,
  width,
  depth
}) {
  const volume = length * width * (depth / 12); // cubic feet
  const pounds = volume * dryDensity * (percent / 100);
  const tons = pounds / 2000;
  const areaSY = (length * width) / 9;
  const rate = pounds / areaSY;

  return {
    type: `${material.toUpperCase()} ${percent}%`,
    job,
    location,
    date: getToday(),
    station: `${startStation} to ${endStation}`,
    dims: { length, width, depth },
    formula: `${volume.toFixed(1)}cf × ${dryDensity}pcf × ${percent}% = ${pounds.toFixed(0)} lbs`,
    tons: tons.toFixed(2),
    rate: rate.toFixed(1)
  };
}

export function buildAsphaltReport({
  job,
  location,
  yieldFactor,
  startStation,
  endStation,
  length,
  width,
  thickness
}) {
  const areaSY = (length * width) / 9;
  const pounds = areaSY * thickness * yieldFactor;
  const tons = pounds / 2000;
  const trucks = tons / 22;

  return {
    type: `ASPHALT YIELD`,
    job,
    location,
    date: getToday(),
    station: `${startStation} to ${endStation}`,
    dims: { length, width, thickness },
    formula: `${areaSY.toFixed(2)}sy × ${thickness}" × ${yieldFactor} = ${pounds.toFixed(0)} lbs`,
    tons: tons.toFixed(2),
    trucks: trucks.toFixed(0)
  };
}
