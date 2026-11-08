
import { useState } from "react";

export default function MyApplications() {
  const [applications, setApplications] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("grantlyApplications") || "[]"
      );
    } catch {
      return [];
    }
  });

  const updateStatus = (id, status) => {
    const updated = applications.map(app =>
      app.id === id ? { ...app, status } : app
    );

    setApplications(updated);
    localStorage.setItem("grantlyApplications", JSON.stringify(updated));
  };

  return (
    <section className="applications-page">
      <h1>My Applications</h1>
      <p>Track your scholarship applications.</p>

      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        applications.map((app, index) => (
          <div className="application-row" key={app.id || index}>
            <h3>
              {app.scholarshipName || app.scholarshipTitle || "Scholarship Application"}
            </h3>

            <p>{app.college || "Student Application"}</p>

            <select
              value={app.status || "Submitted"}
              onChange={e => updateStatus(app.id, e.target.value)}
            >
              <option>Submitted</option>
              <option>Under Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        ))
      )}
    </section>
  );
}
