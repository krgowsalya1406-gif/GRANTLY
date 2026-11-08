import { useState } from "react";
import { GraduationCap, CheckCircle, Sparkles } from "lucide-react";

export default function EligibilityChecker() {
  const [form, setForm] = useState({
    course: "B.E. Computer Science",
    percentage: "",
    income: "",
    category: "General",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
  };

  const checkEligibility = (e) => {
    e.preventDefault();

    const marks = Number(form.percentage);
    const income = Number(form.income);

    if (marks < 0 || marks > 100 || income < 0) {
      setResult("Please enter valid academic marks and family income.");
      return;
    }

    if (marks >= 60 && income <= 500000) {
      setResult("You match the sample eligibility criteria! Explore suitable scholarships.");
    } else {
      setResult("You do not match these sample criteria. Try checking other scholarship requirements.");
    }
  };

  return (
    <section className="eligibility-section">
      <div className="eligibility-heading">
        <span><Sparkles size={16} /> SMART ELIGIBILITY</span>
        <h1>Check Your <strong>Eligibility</strong></h1>
        <p>Enter your details to see whether you match our sample scholarship criteria.</p>
      </div>

      <form className="eligibility-form" onSubmit={checkEligibility}>
        <label>Course</label>
        <select name="course" value={form.course} onChange={handleChange}>
          <option>B.E. Computer Science</option>
          <option>B.Tech Information Technology</option>
          <option>B.Sc Computer Science</option>
          <option>B.Com</option>
          <option>B.A.</option>
          <option>Other</option>
        </select>

        <label>Academic Percentage</label>
        <input
          type="number"
          name="percentage"
          placeholder="Example: 85"
          min="0"
          max="100"
          value={form.percentage}
          onChange={handleChange}
          required
        />

        <label>Annual Family Income (₹)</label>
        <input
          type="number"
          name="income"
          placeholder="Example: 250000"
          min="0"
          value={form.income}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option>General</option>
          <option>OBC</option>
          <option>SC</option>
          <option>ST</option>
          <option>Other</option>
        </select>

        <button type="submit">
          <GraduationCap size={19} /> Check My Eligibility
        </button>

        {result && (
          <div className="eligibility-result">
            <CheckCircle size={22} />
            <p>{result}</p>
          </div>
        )}
      </form>

      <p className="eligibility-note">
        Note: This is a frontend demonstration using sample rules, not an official scholarship eligibility decision.
      </p>
    </section>
  );
}