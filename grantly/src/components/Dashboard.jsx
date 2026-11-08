import { useState } from "react";
import {
  LayoutDashboard, BookmarkCheck, FileText,
  Clock, ArrowUpRight, CalendarDays
} from "lucide-react";
import scholarships from "./data/scholarshipData.js";

export default function Dashboard() {
  const [saved] = useState(() =>
    JSON.parse(localStorage.getItem("grantlySaved") || "[]")
  );

  const [applications, setApplications] = useState(() =>
    JSON.parse(localStorage.getItem("grantlyApplications") || "[]")
  );

  const savedScholarships = scholarships.filter(item =>
    saved.includes(item.id)
  );

  const applyNow = (item) => {
    if (applications.some(app => app.id === item.id)) {
      alert("You have already added this application.");
      return;
    }

    const updated = [
      ...applications,
      { id: item.id, name: item.name, status: "Submitted" }
    ];

    setApplications(updated);
    localStorage.setItem("grantlyApplications", JSON.stringify(updated));
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div>
          <span className="dashboard-tag">STUDENT PORTAL</span>
          <h1>Welcome to Your <span>Dashboard</span></h1>
          <p>Track your scholarships and manage your applications.</p>
        </div>
        <LayoutDashboard size={45} />
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <BookmarkCheck />
          <h2>{saved.length}</h2>
          <p>Saved Scholarships</p>
        </div>

        <div className="dashboard-stat">
          <FileText />
          <h2>{applications.length}</h2>
          <p>Applications</p>
        </div>

        <div className="dashboard-stat">
          <Clock />
          <h2>{applications.filter(a => a.status === "Submitted").length}</h2>
          <p>Submitted</p>
        </div>

        <div className="dashboard-stat">
          <CalendarDays />
          <h2>{savedScholarships.filter(item =>
            new Date(item.deadline) >= new Date()
          ).length}</h2>
          <p>Upcoming Deadlines</p>
        </div>
      </div>

      <section className="dashboard-content">
        <div className="dashboard-section-title">
          <h2>My Saved Scholarships</h2>
          <span>{savedScholarships.length} Saved</span>
        </div>

        {savedScholarships.length === 0 ? (
          <div className="dashboard-empty">
            <BookmarkCheck size={40} />
            <h3>No saved scholarships yet</h3>
            <p>Visit Scholarships and bookmark opportunities you like.</p>
          </div>
        ) : (
          <div className="dashboard-list">
            {savedScholarships.map(item => (
              <div className="dashboard-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.provider}</p>
                  <small>Deadline: {item.deadline}</small>
                </div>
                <button onClick={() => applyNow(item)}>
                  {applications.some(a => a.id === item.id)
                    ? "Added"
                    : "Track Application"}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-content">
        <div className="dashboard-section-title">
          <h2>Application Tracking</h2>
          <span>{applications.length} Applications</span>
        </div>

        {applications.length === 0 ? (
          <div className="dashboard-empty">
            <FileText size={40} />
            <h3>No applications tracked</h3>
            <p>Save a scholarship and click Track Application to add it here.</p>
          </div>
        ) : (
          <div className="dashboard-list">
            {applications.map(app => (
              <div className="dashboard-item" key={app.id}>
                <div>
                  <h3>{app.name}</h3>
                  <p>Application status</p>
                </div>
                <span className="status-label">{app.status}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}