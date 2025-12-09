import React, { useState } from "react";

// Views
import DashboardView from "./views/DashboardView.jsx";
import AsphaltLotManagerView from "./views/AsphaltLotManagerView.jsx";
import ConcretePourLogView from "./views/ConcretePourLogView.jsx";
import MaterialTestsView from "./views/MaterialTestsView.jsx";
import SamplingLibraryView from "./views/SamplingLibraryView.jsx";
import TestLibraryView from "./views/TestLibraryView.jsx";
import QCWorkflowView from "./views/QCWorkflowView.jsx";
import SafetyView from "./views/SafetyBriefingView.jsx";
import DailyLogView from "./views/DailyQCLogView.jsx";
import InspectionsView from "./views/InspectionsView.jsx";
import ResourcesView from "./views/LADOTDResources.jsx";
import AIView from "./views/AIAssistantView.jsx";
import HistoryView from "./views/ReportHistoryView.jsx";

// Modals
import TestModal from "./modals/TestModal.jsx";

// Data
import { load, save } from "./data/storage.js";

export default function App() {
  const [view, setView] = useState("dashboard");

  const [tests, setTests] = useState(load("tests", []));
  const [asphaltLots, setAsphaltLots] = useState(load("asphaltLots", []));
  const [concretePours, setConcretePours] = useState(load("concretePours", []));

  const [showTestModal, setShowTestModal] = useState(false);

  const addTest = (test) => {
    const updated = [...tests, test];
    setTests(updated);
    save("tests", updated);
  };

  const deleteTest = (id) => {
    const updated = tests.filter((t) => t.id !== id);
    setTests(updated);
    save("tests", updated);
  };

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return <DashboardView setView={setView} />;

      case "asphalt":
        return (
          <AsphaltLotManagerView
            data={asphaltLots}
            setData={setAsphaltLots}
          />
        );

      case "concrete":
        return (
          <ConcretePourLogView
            data={concretePours}
            setData={setConcretePours}
          />
        );

      case "tests":
        return (
          <MaterialTestsView
            data={tests}
            onDelete={deleteTest}
            onOpenModal={() => setShowTestModal(true)}
          />
        );

      case "sampling":
        return <SamplingLibraryView />;

      case "library":
        return <TestLibraryView />;

      case "workflow":
        return <QCWorkflowView />;

      case "safety":
        return <SafetyView />;

      case "daily":
        return <DailyLogView />;

      case "inspections":
        return <InspectionsView />;

      case "resources":
        return <ResourcesView />;

      case "ai":
        return <AIView />;

      case "history":
        return <HistoryView />;

      default:
        return <DashboardView setView={setView} />;
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("asphalt")}>Asphalt LOTs</button>
        <button onClick={() => setView("concrete")}>Concrete Pours</button>
        <button onClick={() => setView("tests")}>Material Tests</button>
        <button onClick={() => setView("sampling")}>Sampling Library</button>
        <button onClick={() => setView("library")}>Test Library</button>
        <button onClick={() => setView("workflow")}>QC Workflow</button>
        <button onClick={() => setView("safety")}>Safety</button>
        <button onClick={() => setView("daily")}>Daily Log</button>
        <button onClick={() => setView("inspections")}>Inspections</button>
        <button onClick={() => setView("resources")}>Resources</button>
        <button onClick={() => setView("ai")}>AI</button>
        <button onClick={() => setView("history")}>History</button>
      </aside>

      <main className="main-content">{renderView()}</main>

      {showTestModal && (
        <TestModal
          onClose={() => setShowTestModal(false)}
          onSave={addTest}
        />
      )}
    </div>
  );
}
