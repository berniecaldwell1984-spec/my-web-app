// src/data/samplingProcedures.ts

export interface SamplingProcedure {
  id: string;
  material: string;
  context: string[];        // Roadway, Bridge, Plant, Lab
  location: string[];       // Where sample is taken
  frequency: string;        // Per LOT, per sublot, per truck, etc.
  sampleSize: string;       // Weight/volume
  relatedTests: string[];   // TR numbers
}

export const samplingProcedures: SamplingProcedure[] = [
  // ------------------------------------------------------------
  // ASPHALT SAMPLING
  // ------------------------------------------------------------
  {
    id: "MSM-HMA-PLANT",
    material: "Hot-Mix Asphalt",
    context: ["Plant"],
    location: ["Truck bed", "Sampling chute"],
    frequency: "Per sublot / per LOT as specified",
    sampleSize: "Approx. 25–50 lbs",
    relatedTests: ["TR-307", "TR-309", "TR-103"]
  },
  {
    id: "MSM-HMA-ROADWAY",
    material: "Hot-Mix Asphalt",
    context: ["Roadway"],
    location: ["Behind paver", "Random locations per LOT"],
    frequency: "Per sublot / per LOT",
    sampleSize: "Core samples (4–6 inch)",
    relatedTests: ["TR-102", "TR-401"]
  },

  // ------------------------------------------------------------
  // CONCRETE SAMPLING
  // ------------------------------------------------------------
  {
    id: "MSM-CONCRETE-STRUCTURAL",
    material: "Structural Concrete",
    context: ["Bridge", "Roadway"],
    location: ["Discharge point", "Placement point"],
    frequency: "Per truck or per volume per MSM",
    sampleSize: "Set of cylinders + slump + air",
    relatedTests: ["TR-230", "TR-231", "TR-232", "TR-233"]
  },

  // ------------------------------------------------------------
  // EMBANKMENT / SOIL SAMPLING
  // ------------------------------------------------------------
  {
    id: "MSM-SOIL-EMBANKMENT",
    material: "Embankment / Subgrade Soil",
    context: ["Roadway"],
    location: ["Test section", "Random locations"],
    frequency: "Per lift / per 500 ft / per MSM",
    sampleSize: "Moisture sample + density test",
    relatedTests: ["TR-401-SOIL", "TR-403"]
  },

  // ------------------------------------------------------------
  // STABILIZED SOIL SAMPLING
  // ------------------------------------------------------------
  {
    id: "MSM-SOIL-STABILIZED",
    material: "Lime/Cement Treated Soil",
    context: ["Roadway"],
    location: ["Treatment area", "Random locations"],
    frequency: "Per station range / per lift",
    sampleSize: "Density + moisture + additive verification",
    relatedTests: ["TR-411", "TR-412"]
  }
];
