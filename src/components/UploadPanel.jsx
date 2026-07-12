const SAMPLE_POLICY = `We care deeply about your privacy and take it seriously.

You may withdraw your consent to data processing at any time by emailing privacy@example.com.

You can request that we delete your personal data by contacting our support team.

Your data may be stored on servers located outside of Sri Lanka for backup purposes.

We use encryption to protect your information from unauthorized access.`;

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

        <button
          className="sample-link"
          type="button"
          onClick={() => setPolicyText(SAMPLE_POLICY)}
        >
          Load sample policy
        </button>
      </div>

      {error && <p className="error-note">{error}</p>}
    </div>
  );
}
