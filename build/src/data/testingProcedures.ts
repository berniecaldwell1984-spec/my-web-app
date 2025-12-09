// src/data/testingProcedures.ts

export interface TestingProcedure {
  id: string;                 // TR number
  title: string;              // Test name
  materialGroup: string;      // Asphalt, Concrete, Soil, etc.
  application: string[];      // Roadway, Bridge, Plant, Lab
  inputs: string[];           // What the calculator needs
  relatedSampling: string[];  // MSM sampling IDs
  notes?: string;             // Short field-use description
}

export const testingProcedures: TestingProcedure[] = [
  // ------------------------------------------------------------
  // ASPHALT ACCEPTANCE TESTS
  // ------------------------------------------------------------
  {
    id: "TR-102",
    title: "Bulk Specific Gravity of Compacted Asphalt (Gmb)",
    materialGroup: "Asphalt",
    application: ["Roadway", "Plant", "Lab"],
    inputs: ["Dry weight", "SSD weight", "Submerged weight"],
    relatedSampling: ["MSM-HMA-ROADWAY", "MSM-HMA-PLANT"],
    notes: "Used for density, air voids, and acceptance calculations."
  },
  {
    id: "TR-103",
    title: "Maximum Specific Gravity of Asphalt Mixtures (Gmm)",
    materialGroup: "Asphalt",
    application: ["Plant", "Lab"],
    inputs: ["Sample weight", "Pycnometer readings"],
    relatedSampling: ["MSM-HMA-PLANT"],
    notes: "Required for air voids and volumetric acceptance."
  },
  {
    id: "TR-307",
    title: "Asphalt Extraction / Ignition Oven (Binder Content)",
    materialGroup: "Asphalt",
    application: ["Plant", "Lab"],
    inputs: ["Initial weight", "Final weight", "Correction factors"],
    relatedSampling: ["MSM-HMA-PLANT"],
    notes: "Determines asphalt binder content for mix acceptance."
  },
  {
    id: "TR-309",
    title: "Asphalt Mixture Gradation",
    materialGroup: "Asphalt",
    application: ["Plant", "Lab"],
    inputs: ["Sieve weights", "Total sample weight"],
    relatedSampling: ["MSM-HMA-PLANT"],
    notes: "Used for aggregate gradation acceptance."
  },
  {
    id: "TR-401",
    title: "Roadway Density (Cores)",
    materialGroup: "Asphalt",
    application: ["Roadway"],
    inputs: ["Core Gmb", "Gmm", "Target density"],
    relatedSampling: ["MSM-HMA-ROADWAY"],
    notes: "Primary roadway acceptance test for asphalt density."
  },

  // ------------------------------------------------------------
  // CONCRETE QC TESTS
  // ------------------------------------------------------------
  {
    id: "TR-230",
    title: "Slump of Portland Cement Concrete",
    materialGroup: "Concrete",
    application: ["Roadway", "Bridge", "Structures"],
    inputs: ["Slump measurement"],
    relatedSampling: ["MSM-CONCRETE-STRUCTURAL"],
    notes: "Fresh concrete workability test."
  },
  {
    id: "TR-231",
    title: "Air Content of Fresh Concrete",
    materialGroup: "Concrete",
    application: ["Roadway", "Bridge"],
    inputs: ["Air meter readings"],
    relatedSampling: ["MSM-CONCRETE-STRUCTURAL"],
    notes: "Required for QC and acceptance of structural concrete."
  },
  {
    id: "TR-232",
    title: "Making and Curing Concrete Test Specimens",
    materialGroup: "Concrete",
    application: ["Roadway", "Bridge", "Lab"],
    inputs: ["Cylinder IDs", "Casting data"],
    relatedSampling: ["MSM-CONCRETE-STRUCTURAL"],
    notes: "Covers cylinder creation for compressive strength testing."
  },
  {
    id: "TR-233",
    title: "Compressive Strength of Concrete Cylinders",
    materialGroup: "Concrete",
    application: ["Lab"],
    inputs: ["Break load", "Cylinder dimensions"],
    relatedSampling: ["MSM-CONCRETE-STRUCTURAL"],
    notes: "Determines 7‑day and 28‑day strength for acceptance."
  },

  // ------------------------------------------------------------
  // EMBANKMENT / SOILS / STABILIZATION
  // ------------------------------------------------------------
  {
    id: "TR-401-SOIL",
    title: "Field Density (Sand Cone / Nuclear Gauge)",
    materialGroup: "Soils",
    application: ["Roadway", "Embankment"],
    inputs: ["Wet density", "Moisture", "Proctor max density"],
    relatedSampling: ["MSM-SOIL-EMBANKMENT"],
    notes: "Used for compaction acceptance of embankment and subgrade."
  },
  {
    id: "TR-403",
    title: "Moisture-Density Relationship (Proctor)",
    materialGroup: "Soils",
    application: ["Lab"],
    inputs: ["Wet weights", "Mold volume", "Moisture content"],
    relatedSampling: ["MSM-SOIL-EMBANKMENT"],
    notes: "Determines optimum moisture and max dry density."
  },
  {
    id: "TR-411",
    title: "Lime/Cement Treated Soil – Density & Moisture",
    materialGroup: "Stabilization",
    application: ["Roadway"],
    inputs: ["Wet density", "Moisture", "Target density"],
    relatedSampling: ["MSM-SOIL-STABILIZED"],
    notes: "Used for acceptance of treated subgrade layers."
  },
  {
    id: "TR-412",
    title: "Lime/Cement Spread Rate Verification",
    materialGroup: "Stabilization",
    application: ["Roadway"],
    inputs: ["Area", "Depth", "Dry density", "Percent additive"],
    relatedSampling: ["MSM-SOIL-STABILIZED"],
    notes: "Matches perfectly with your soil‑cement/lime calculators."
  }
];
