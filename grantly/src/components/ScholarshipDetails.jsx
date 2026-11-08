import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, GraduationCap, IndianRupee } from "lucide-react";
import scholarships from "./data/scholarshipData.js";

export default function ScholarshipDetails() {
  const { id } = useParams();

  const scholarship = scholarships.find(
    (item) => String(item.id) === id
  );

  if (!scholarship) {
    return (
      <div className="details-page">
        <h2>Scholarship not found</h2>
        <Link to="/scholarships">Back to Scholarships</Link>
      </div>
    );
  }

  return (
    <section className="details-page">
      <Link to="/scholarships" className="back-link">
        <ArrowLeft size={18} /> Back to Scholarships
      </Link>

      <div className="details-card">
        <div className="details-icon">{scholarship.icon || "🎓"}</div>
        <p className="details-label">SCHOLARSHIP OPPORTUNITY</p>
        <h1>{scholarship.name}</h1>
        <p className="details-provider">{scholarship.provider}</p>

        <div className="details-info">
          <div>
            <IndianRupee />
            <span>Amount</span>
            <strong>{scholarship.amount}</strong>
          </div>

          <div>
            <GraduationCap />
            <span>Study Level</span>
            <strong>{scholarship.level}</strong>
          </div>

          <div>
            <CalendarDays />
            <span>Deadline</span>
            <strong>{scholarship.deadline}</strong>
          </div>
        </div>

        <h3>About this scholarship</h3>
        <p>{scholarship.description}</p>

        <p><strong>Category:</strong> {scholarship.category}</p>

        <Link to="/apply" className="primary-btn details-apply">
          Apply Through GRANTLY
        </Link>

        <p className="demo-note">
          Demo scholarship information. Verify details with the official provider
          before applying.
        </p>
      </div>
    </section>
  );
}