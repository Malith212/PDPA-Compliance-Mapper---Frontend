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
          <p className="masthead-eyebrow">Sri Lanka · Act No. 9 of 2022</p>
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
            className="landing-card landing-card-translator"
            onClick={() => setView("translator")}
          >
            <span className="landing-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 5h9" strokeLinecap="round" />
                <path d="M8.5 3v2.3C8.5 9 6.5 12 3.5 13.7" strokeLinecap="round" />
                <path d="M5.5 10.2c1.4 1.7 3.5 3 6 3.6" strokeLinecap="round" />
                <path d="M13.5 21l4-9.5 4 9.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.9 17.8h5.2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="landing-card-eyebrow">Tool 01</span>
            <span className="landing-card-title">Sinhala Translator</span>
            <p className="landing-card-desc">
              Translate privacy policy text or documents into Sinhala.
            </p>
            <span className="landing-card-cta">
              Open
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M3 8h9.5" strokeLinecap="round" />
                <path d="M8.5 3.5L13 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <button
            className="landing-card landing-card-compliance"
            onClick={() => setView("compliance")}
          >
            <span className="landing-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path
                  d="M12 3l7 3v5.2c0 4.5-2.9 8.2-7 9.8-4.1-1.6-7-5.3-7-9.8V6l7-3z"
                  strokeLinejoin="round"
                />
                <path d="M8.7 12.2l2.2 2.2 4.4-4.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="landing-card-eyebrow">Tool 02</span>
            <span className="landing-card-title">Compliance Mapper</span>
            <p className="landing-card-desc">
              Analyze a privacy policy's semantic similarity against the PDPA's
              8 core obligations and get a compliance report.
            </p>
            <span className="landing-card-cta">
              Open
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M3 8h9.5" strokeLinecap="round" />
                <path d="M8.5 3.5L13 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
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
          <header className="page-header page-header-compliance">
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
