export default function SectionCard({ section }) {
  const statusLabel = {
    compliant: "Compliant",
    gap: "Not Compliant",
    violation: "Violation",
  }[section.status] || section.status;

  return (
    <div className="section-card">
      <div className="section-number">
        {section.section_number.replace("Section ", "§")}
      </div>

      <div className="section-body">
        <h3>{section.title}</h3>
        <p className="section-desc">{section.description}</p>

        {(section.status === "compliant" || section.status === "violation") &&
          section.best_match && (
            <p className="section-match">"{section.best_match.text}"</p>
          )}

        <p className="section-explanation">{section.explanation}</p>
      </div>

      <div className="section-stamp-col">
        <span className={`stamp stamp-${section.status}`}>{statusLabel}</span>
      </div>
    </div>
  );
}