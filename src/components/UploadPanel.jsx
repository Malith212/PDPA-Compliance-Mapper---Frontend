export default function UploadPanel({ policyText, setPolicyText, onAnalyze, isLoading, error }) {
  return (
    <div className="input-panel">
      <label className="input-label" htmlFor="policy-input">
        Paste privacy policy text
      </label>
      <textarea
        id="policy-input"
        className="policy-input"
        value={policyText}
        onChange={(e) => setPolicyText(e.target.value)}
        placeholder="Paste the full text of the privacy policy here..."
      />

      <div className="input-actions">
        <button
          className="primary-btn"
          onClick={onAnalyze}
          disabled={isLoading || !policyText.trim()}
        >
          {isLoading ? "Analyzing..." : "Run compliance check"}
        </button>
      </div>

      {error && <p className="error-note">{error}</p>}
    </div>
  );
}
