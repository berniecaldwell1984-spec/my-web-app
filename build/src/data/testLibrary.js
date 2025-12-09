export const TEST_LIBRARY = {
  Concrete: [
    {
      id: "slump",
      name: "Slump Test",
      procedure: "ASTM C143",
      dotd: null,
      type: "Field",
      fields: [
        { key: "slump", label: "Slump (inches)", unit: "in" },
        { key: "temperature", label: "Concrete Temperature", unit: "°F" },
      ],
    },
    {
      id: "air_pressure",
      name: "Air Content (Pressure Method)",
      procedure: "ASTM C231",
      dotd: "TR 202B",
      type: "Field",
      fields: [
        { key: "air", label: "Air Content (%)", unit: "%" },
        { key: "temperature", label: "Concrete Temperature", unit: "°F" },
      ],
    },
    {
      id: "air_volumetric",
      name: "Air Content (Volumetric Method)",
      procedure: "ASTM C173",
      dotd: "TR 202A",
      type: "Field",
      fields: [
        { key: "air", label: "Air Content (%)", unit: "%" },
        { key: "temperature", label: "Concrete Temperature", unit: "°F" },
      ],
    },
    {
      id: "unit_weight",
      name: "Unit Weight / Yield",
      procedure: "ASTM C138",
      type: "Field",
      fields: [
        { key: "unitWeight", label: "Unit Weight", unit: "pcf" },
        { key: "yield", label: "Yield", unit: "" },
      ],
    },
    {
      id: "cylinders",
      name: "Concrete Cylinders (Making & Curing)",
      procedure: "ASTM C31",
      dotd: "TR 226",
      type: "Field",
      fields: [
        { key: "numCylinders", label: "Number of Cylinders", unit: "" },
        { key: "curingMethod", label: "Curing Method", unit: "" },
      ],
    },
    {
      id: "compressive_strength",
      name: "Compressive Strength",
      procedure: "ASTM C39",
      dotd: "TR 230",
      type: "Lab",
      fields: [
        { key: "strength", label: "Strength", unit: "PSI" },
        { key: "age", label: "Age", unit: "days" },
      ],
    },
  ],

  Soil: [
    {
      id: "moisture_content",
      name: "Moisture Content",
      procedure: "TR 403",
      type: "Lab",
      fields: [
        { key: "wetWeight", label: "Wet Weight", unit: "g" },
        { key: "dryWeight", label: "Dry Weight", unit: "g" },
      ],
    },
    {
      id: "standard_proctor",
      name: "Standard Proctor",
      procedure: "TR 418",
      type: "Lab",
      fields: [
        { key: "moisture", label: "Moisture (%)", unit: "%" },
        { key: "dryDensity", label: "Dry Density", unit: "pcf" },
      ],
    },
    {
      id: "modified_proctor",
      name: "Modified Proctor",
      procedure: "TR 419",
      type: "Lab",
      fields: [
        { key: "moisture", label: "Moisture (%)", unit: "%" },
        { key: "dryDensity", label: "Dry Density", unit: "pcf" },
      ],
    },
    {
      id: "field_curve",
      name: "Field Moisture-Density Curve",
      procedure: "TR 415",
      type: "Field",
      fields: [
        { key: "moisture", label: "Moisture (%)", unit: "%" },
        { key: "dryDensity", label: "Dry Density", unit: "pcf" },
      ],
    },
    {
      id: "nuclear_density",
      name: "Nuclear Gauge Density",
      procedure: "ASTM D6938",
      type: "Field",
      fields: [
        { key: "wetDensity", label: "Wet Density", unit: "pcf" },
        { key: "moisture", label: "Moisture (%)", unit: "%" },
      ],
    },
    {
      id: "sand_cone",
      name: "Sand Cone Density",
      procedure: "ASTM D1556",
      type: "Field",
      fields: [
        { key: "dryDensity", label: "Dry Density", unit: "pcf" },
        { key: "moisture", label: "Moisture (%)", unit: "%" },
      ],
    },
  ],

  SoilCement: [
    {
      id: "soilcement_moisture",
      name: "Moisture Content",
      procedure: "TR 403",
      type: "Lab",
      fields: [
        { key: "wetWeight", label: "Wet Weight", unit: "g" },
        { key: "dryWeight", label: "Dry Weight", unit: "g" },
      ],
    },
    {
      id: "soilcement_field_curve",
      name: "Field Curve (Control Strip)",
      procedure: "TR 415",
      type: "Field",
      fields: [
        { key: "moisture", label: "Moisture (%)", unit: "%" },
        { key: "dryDensity", label: "Dry Density", unit: "pcf" },
      ],
    },
    {
      id: "soilcement_strength",
      name: "7-Day Compressive Strength",
      procedure: "ASTM D1633",
      type: "Lab",
      fields: [
        { key: "strength", label: "Strength", unit: "PSI" },
      ],
    },
  ],

  Asphalt: [
    {
      id: "asphalt_temp",
      name: "Asphalt Temperature",
      procedure: "Field",
      type: "Field",
      fields: [
        { key: "temperature", label: "Temperature", unit: "°F" },
      ],
    },
    {
      id: "mat_density",
      name: "Mat Density (Nuclear Gauge)",
      procedure: "ASTM D2950",
      type: "Field",
      fields: [
        { key: "wetDensity", label: "Wet Density", unit: "pcf" },
        { key: "moisture", label: "Moisture (%)", unit: "%" },
      ],
    },
    {
      id: "core_density",
      name: "Core Density",
      procedure: "ASTM D2726",
      type: "Lab",
      fields: [
        { key: "bulkSpecificGravity", label: "Bulk SG", unit: "" },
      ],
    },
    {
      id: "thickness",
      name: "Core Thickness",
      procedure: "TR 305",
      type: "Lab",
      fields: [
        { key: "thickness", label: "Thickness", unit: "in" },
      ],
    },
    {
      id: "rice",
      name: "Rice Specific Gravity (Gmm)",
      procedure: "TR 304",
      type: "Lab",
      fields: [
        { key: "gmm", label: "Gmm", unit: "" },
      ],
    },
  ],

  Aggregates: [
    {
      id: "sieve_analysis",
      name: "Sieve Analysis",
      procedure: "TR 113",
      type: "Lab",
      fields: [
        { key: "percentPassing", label: "Percent Passing", unit: "%" },
      ],
    },
    {
      id: "moisture",
      name: "Moisture Content",
      procedure: "TR 112",
      type: "Lab",
      fields: [
        { key: "moisture", label: "Moisture (%)", unit: "%" },
      ],
    },
  ],
};
