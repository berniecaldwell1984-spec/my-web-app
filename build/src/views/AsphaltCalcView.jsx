import React, { useEffect, useRef, useState } from "react";
import { InputField } from "../components/Inputs";
import { Icons } from "../components/Icons";
import { parseStation } from "../utils/parseStation";
import { buildAsphaltReport } from "../utils/reportBuilder";
import { Report } from "../components/Report";
import { save, load } from "../utils/storage";

export function AsphaltCalcView() {
  const fileInputRef = useRef(null);

  const [segments, setSegments] = useState(() => load("asphaltSegments"));
  const [reports, setReports] = useState(() => load("reports"));

  const [current, setCurrent] = useState({
    job: "",
    location: "",
    startStation: "",
    endStation: "",
    length: "",
    width: "",
    thickness: "",
    density: 110,
    truckCapacity: 22,
    photo: null,
  });

  // Auto-calc length from station numbers
  useEffect(() => {
    if (current.startStation && current.endStation) {
      const start = parseStation(current.startStation);
      const end = parseStation(current.endStation);
      const dist = Math.abs(end - start);
      if (!isNaN(dist)) setCurrent((prev) => ({ ...prev, length: dist }));
    }
  }, [current.startStation, current.endStation]);

  const handlePhotoSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCurrent({
        ...current,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const calculate = (seg) => {
    const l = parseFloat(seg.length) || 0;
    const w = parseFloat(seg.width) || 0;
    const t = parseFloat(seg.thickness) || 0;
    const rate = parseFloat(seg.density) || 110;

    const sy = (l * w) / 9;
    const totalLbs = sy * t * rate;
    const tons = totalLbs / 2000;

    return { sy, tons, totalLbs };
  };

  const addSegment = () => {
    const id = crypto.randomUUID();
    const newSeg = { ...current, id };
    const updated = [...segments, newSeg];
    setSegments(updated);
    save("asphaltSegments", updated);

    // Build report
    const report = buildAsphaltReport({
      job: current.job,
      location: current.location,
      yieldFactor: current.density,
      startStation: current.startStation,
      endStation: current.endStation,
      length: parseFloat(current.length),
      width: parseFloat(current.width),
      thickness: parseFloat(current.thickness),
    });

    const updatedReports = [...reports, report];
    setReports(updatedReports);
    save("reports", updatedReports);
  };

  const removeSegment = (id) => {
    const updated = segments.filter((s) => s.id !== id);
    setSegments(updated);
    save("asphaltSegments", updated);
  };

  const totalTons = segments.reduce((acc, s) => acc + calculate(s).tons, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-white uppercase tracking-tight">
        Asphalt Yield
      </h2>

      {/* Job + Location */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="JOB NAME / NUMBER"
          value={current.job}
          onChange={(v) => setCurrent({ ...current, job: v })}
        />
        <InputField
          label="LOCATION"
          value={current.location}
          onChange={(v) => setCurrent({ ...current, location: v })}
        />
      </div>

      {/* Stations */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="START STATION"
          value={current.startStation}
          onChange={(v) => setCurrent({ ...current, startStation: v })}
        />
        <InputField
          label="END STATION"
          value={current.endStation}
          onChange={(v) => setCurrent({ ...current, endStation: v })}
        />
      </div>

      {/* Dimensions */}
      <InputField
        label="CALCULATED LENGTH (FT)"
        value={current.length}
        onChange={(v) => setCurrent({ ...current, length: v })}
      />
      <InputField
        label="WIDTH (FT)"
        value