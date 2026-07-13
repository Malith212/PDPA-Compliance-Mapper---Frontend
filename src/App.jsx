import { useState } from "react";
import UploadPanel from "./components/UploadPanel.jsx";
import ReportView from "./components/ReportView.jsx";
import { analyzePolicy } from "./api.js";

export default function App() {
  const [policyText, setPolicyText] = useState("");
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze() {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const result = await analyzePolicy(policyText);
      setReport(result);
    } catch (err) {
      setError(
        "Could not reach the analysis backend. Make sure the FastAPI server is running on http://localhost:8000."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="masthead">
        <h1 className="masthead-title">PDPA Compliance Mapper</h1>
        <p className="masthead-sub">
          Checks a privacy policy against the 8 core obligations of Sri Lanka's Personal Data Protection Act, No. 9 of 2022, using semantic similarity analysis.
        </p>
        <div className="masthead-meta">
          <span>8 obligations checked</span>
        </div>
      </header>

      <UploadPanel
        policyText={policyText}
        setPolicyText={setPolicyText}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
        error={error}
      />

      {isLoading && (
        <p className="loading-note">Extracting clauses and computing embeddings...</p>
      )}

      {report && <ReportView report={report} />}
    </div>
  );
}
