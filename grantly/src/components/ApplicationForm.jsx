import { useState } from "react";
import { FileText, Send, CheckCircle } from "lucide-react";
import scholarships from "./data/scholarshipData.js";

export default function ApplicationForm() {
  const [form, setForm] = useState({
    scholarshipId: "",
    name: "",
    email: "",
    college: "",
    course: "",
    statement: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selected = scholarships.find(
      item => item.id === Number(form.scholarshipId)
    );

    if (!selected) {
      setMessage("Please select a scholarship.");
      return;
    }

    const existing = JSON.parse(
      localStorage.getItem("grantlyApplications") || "[]"
    );

    if (existing.some(item => item.id === selected.id)) {
      setMessage("You have already added this scholarship application.");
      return;
    }

    const application = {
      id: selected.id,
      name: selected.name,
      studentName: form.name,
      email: form.email,
      college: form.college,
      course: form.course,
      statement: form.statement,
      status: "Submitted",
      submittedAt: new Date().toLocaleDateString()
    };

    localStorage.setItem(
      "grantlyApplications",
      JSON.stringify([...existing, application])
    );

    setMessage("Your demo application has been saved successfully!");

    setForm({
      scholarshipId: "",
      name: "",
      email: "",
      college: "",
      course: "",
      statement: ""
    });
  };

  return (
    <section className="application-page">
      <div className="application-heading">
        <span>YOUR NEXT OPPORTUNITY</span>
        <h1>Scholarship <strong>Application</strong></h1>
        <p>Complete your details to prepare your scholarship application.</p>
      </div>

      <form className="application-form" onSubmit={handleSubmit}>
        <h2><FileText size={22} /> Application Details</h2>

        <label>Select Scholarship</label>
        <select
          name="scholarshipId"
          value={form.scholarshipId}
          onChange={handleChange}
          required
        >
          <option value="">Choose a scholarship</option>
          {scholarships.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>College Name</label>
        <input
          name="college"
          value={form.college}
          onChange={handleChange}
          placeholder="Enter your college name"
          required
        />

        <label>Course</label>
        <input
          name="course"
          value={form.course}
          onChange={handleChange}
          placeholder="Example: B.E. Computer Science"
          required
        />

        <label>Why should you receive this scholarship?</label>
        <textarea
          name="statement"
          value={form.statement}
          onChange={handleChange}
          placeholder="Write a short statement about your academic goals..."
          rows="5"
          required
        />

        <button type="submit">
          <Send size={18} /> Save Application
        </button>

        {message && (
          <p className="application-message">
            <CheckCircle size={18} /> {message}
          </p>
        )}
      </form>

      <p className="application-note">
        Demo only: This saves application details in your browser.
        It does not submit an application to the scholarship provider.
      </p>
    </section>
  );
}