import { useState } from "react";
import { translateText, translateDocument } from "../api.js";

export default function TranslatorPanel() {
  const [mode, setMode] = useState("text"); // "text" | "document"
  const [englishText, setEnglishText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleTranslateText() {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await translateText(englishText);
      setResult({ type: "text", translated_text: data.translated_text });
    } catch (err) {
      setError(err.message || "Could not reach the translator backend on http://localhost:8001.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleTranslateDocument() {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await translateDocument(file);
      setResult({
        type: "document",
        translated_text: data.translated_text,
        chunk_count: data.chunk_count,
        filename: data.filename,
      });
    } catch (err) {
      setError(err.message || "Could not reach the translator backend on http://localhost:8001.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="input-panel">
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === "text" ? "mode-btn-active" : ""}`}
          onClick={() => { setMode("text"); setResult(null); setError(null); }}
        >
          Translate text
        </button>
        <button
          className={`mode-btn ${mode === "document" ? "mode-btn-active" : ""}`}
          onClick={() => { setMode("document"); setResult(null); setError(null); }}
        >
          Translate PDF document
        </button>
      </div>

      {mode === "text" ? (
        <>
          <label className="input-label" htmlFor="english-input">
            English privacy-policy text
          </label>
          <textarea
            id="english-input"
            className="policy-input"
            value={englishText}
            onChange={(e) => setEnglishText(e.target.value)}
            placeholder="Paste an English sentence or paragraph to translate..."
          />
          <div className="input-actions">
            <button
              className="primary-btn"
              onClick={handleTranslateText}
              disabled={isLoading || !englishText.trim()}
            >
              {isLoading ? "Translating..." : "Translate to Sinhala"}
            </button>
          </div>
        </>
      ) : (
        <>
          <label className="input-label" htmlFor="pdf-input">
            Upload English privacy-policy PDF
          </label>
          <input
            id="pdf-input"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <div className="input-actions">
            <button
              className="primary-btn"
              onClick={handleTranslateDocument}
              disabled={isLoading || !file}
            >
              {isLoading ? "Translating document..." : "Translate document"}
            </button>
          </div>
        </>
      )}

      {error && <p className="error-note">{error}</p>}

      {isLoading && (
        <p className="loading-note">
          {mode === "document"
            ? "Extracting, chunking, and translating each section..."
            : "Retrieving vocabulary matches and translating..."}
        </p>
      )}

      {result && (
        <div className="translation-result">
          {result.type === "document" && (
            <p className="translation-meta">
              {result.filename} — translated in {result.chunk_count} chunk
              {result.chunk_count === 1 ? "" : "s"}
            </p>
          )}
          <p className="translation-output">{result.translated_text}</p>
        </div>
      )}
    </div>
  );
}