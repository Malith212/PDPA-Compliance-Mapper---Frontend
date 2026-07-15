import { useState } from "react";
import UploadPanel from "./components/UploadPanel.jsx";
import ReportView from "./components/ReportView.jsx";
import TranslatorPanel from "./components/TranslatorPanel.jsx";
import { analyzePolicy } from "./api.js";

export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "compliance" | "translator"

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
        "Could not reach the analysis backend. Make sure the FastAPI server is running on http://localhost:8000.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (view === "landing") {
    return (
      <div className="app-shell">
        <header className="masthead">
          <h1 className="masthead-title">
            Sinhala Translation Toolkit &amp; PDPA Compliance
          </h1>
          <p className="masthead-sub">
            Two tools for working with Sri Lankan legal and privacy
            documentation — translate policy text and documents into Sinhala
            using a legal terminology knowledge base built from Sri Lankan
            parliamentary acts, or map a privacy policy against the compliance
            obligations of the Personal Data Protection Act, No. 9 of 2022.
          </p>
        </header>

        <div className="landing-cards">
          <button
            className="landing-card"
            onClick={() => setView("translator")}
          >
            <span className="landing-card-eyebrow">Tool 01</span>
            <span className="landing-card-title">Sinhala Translator</span>
            <p className="landing-card-desc">
              Translate privacy policy text or documents into Sinhala.
            </p>
            <span className="landing-card-cta">Open →</span>
          </button>

          <button
            className="landing-card"
            onClick={() => setView("compliance")}
          >
            <span className="landing-card-eyebrow">Tool 02</span>
            <span className="landing-card-title">Compliance Mapper</span>
            <p className="landing-card-desc">
              Analyze a privacy policy's semantic similarity against the PDPA's
              8 core obligations and get a compliance report.
            </p>
            <span className="landing-card-cta">Open →</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <nav className="tab-nav">
        <button className="tab-btn" onClick={() => setView("landing")}>
          ← Home
        </button>

        <button
          className={`tab-btn ${view === "translator" ? "tab-btn-active" : ""}`}
          onClick={() => setView("translator")}
        >
          Sinhala Translator
        </button>

        <button
          className={`tab-btn ${view === "compliance" ? "tab-btn-active" : ""}`}
          onClick={() => setView("compliance")}
        >
          Compliance Mapper
        </button>
      </nav>

      {view === "compliance" ? (
        <>
          <header className="page-header">
            <h2 className="page-header-title">Compliance Mapper</h2>
            <p className="page-header-sub">
              Paste a privacy policy below to check it against the 8 core
              obligations of Sri Lanka's PDPA using semantic similarity
              analysis.
            </p>
            <div className="page-header-meta">
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
            <p className="loading-note">
              Extracting clauses and computing embeddings...
            </p>
          )}

          {report && <ReportView report={report} />}
        </>
      ) : (
        <>
          <header className="page-header">
            <h2 className="page-header-title">Sinhala Translator</h2>
            <p className="page-header-sub">
              Translate English privacy-policy text or PDF documents into
              Sinhala, using a domain-specific glossary for accurate legal
              terminology.
            </p>
          </header>

          <TranslatorPanel />
        </>
      )}
    </div>
  );
}
