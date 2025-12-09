// TR‑419: Modified Proctor
// Same math as TR‑418, just different hammer energy.
// We keep the logic identical — only the dataset differs.

import { findMaxDensityAndOMC } from './tr418.js';

export function runModifiedProctor(points) {
  return findMaxDensityAndOMC(points);
}
