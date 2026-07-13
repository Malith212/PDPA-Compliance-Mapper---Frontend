import SectionCard from "./SectionCard.jsx";

export default function ReportView({ report }) {
  return (
    <div className="report">
      <div className="report-summary">
        <div className="summary-breakdown">
          <div className="summary-chip chip-compliant">
            <b>{report.compliant_count}</b>
            Compliant
          </div>
          <div className="summary-chip chip-gap">
            <b>{report.gap_count}</b>
            Not Compliant
          </div>
        </div>
      </div>

      {report.sections.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}