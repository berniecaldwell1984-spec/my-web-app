// src/data/qcWorkflows.ts

export interface QCWorkflow {
  id: string;
  name: string;
  description: string;
  materials: string[];
  requiredSampling: string[];
  requiredTests: string[];
}

export const qcWorkflows: QCWorkflow[] = [
  // ------------------------------------------------------------
  // ASPHALT WORKFLOWS
  // ------------------------------------------------------------
  {
    id: "WF-HMA-ROADWAY",
    name: "Hot Mix Asphalt – Roadway Placement",
    description: "QC workflow for asphalt paving operations on roadway or bridge approaches.",
    materials: ["Hot-Mix Asphalt"],
    requiredSampling: ["MSM-HMA-ROADWAY"],
    requiredTests: ["TR-102", "TR-103", "TR-307", "TR-309", "TR-401"]
  },
  {
    id: "WF-HMA-PLANT",
    name: "Hot Mix Asphalt – Plant Production",
    description: "QC workflow for asphalt mix production at the plant.",
    materials: ["Hot-Mix Asphalt"],
    requiredSampling: ["MSM-HMA-PLANT"],
    requiredTests: ["TR-103", "TR-307", "TR-309"]
  },

  // ------------------------------------------------------------
  // CONCRETE WORKFLOWS
  // ------------------------------------------------------------
  {
    id: "WF-CONCRETE-STRUCTURAL",
    name: "Structural Concrete – Bridge / Roadway",
    description: "QC workflow for structural concrete used in bridge decks, caps, shafts, and roadway structures.",
    materials: ["Structural Concrete"],
    requiredSampling: ["MSM-CONCRETE-STRUCTURAL"],
    requiredTests: ["TR-230", "TR-231", "TR-232", "TR-233"]
  },

  // ------------------------------------------------------------
  // EMBANKMENT / SOIL WORKFLOWS
  // ------------------------------------------------------------
  {
    id: "WF-SOIL-EMBANKMENT",
    name: "Embankment / Subgrade Compaction",
    description: "QC workflow for roadway embankment and subgrade compaction.",
    materials: ["Embankment Soil", "Subgrade Soil"],
    requiredSampling: ["MSM-SOIL-EMBANKMENT"],
    requiredTests: ["TR-401-SOIL", "TR-403"]
  },

  // ------------------------------------------------------------
  // STABILIZATION WORKFLOWS
  // ------------------------------------------------------------
  {
    id: "WF-SOIL-STABILIZED",
    name: "Lime / Cement Stabilized Subgrade",
    description: "QC workflow for lime or cement treated soils.",
    materials: ["Lime Treated Soil", "Cement Treated Soil"],
    requiredSampling: ["MSM-SOIL-STABILIZED"],
    requiredTests: ["TR-411", "TR-412"]
  }
];
