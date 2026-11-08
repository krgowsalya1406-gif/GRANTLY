
import { useState } from "react";
import {
  Search,
  Bookmark,
  ArrowUpRight,
  X,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import scholarships from "./data/scholarshipData.js";

export default function ScholarshipSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("grantlySaved") || "[]");
    } catch {
      return [];
    }
  });

  const toggleSave = (id) => {
    const updated = saved.includes(id)
      ? saved.filter(item => item !== id)
      : [...saved, id];

    setSaved(updated);
    localStorage.setItem("grantlySaved", JSON.stringify(updated));
  };

  const filtered = scholarships.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.provider.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="scholarship-section" id="scholarships">

      <div className="section-heading">
        <span className="section-tag">DISCOVER OPPORTUNITIES</span>
        <h2>
          Find Your Perfect <span>Scholarship</span>
        </h2>
        <p>
          Explore financial opportunities designed to support your dreams.
        </p>
      </div>

      <div className="scholarship-toolbar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search scholarships or providers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Merit Based">Merit Based</option>
          <option value="Need Based">Need Based</option>
          <option value="Special Category">Special Category</option>
        </select>
      </div>

      <div className="scholarship-grid">
        {filtered.map(item => (
          <article className="scholarship-card" key={item.id}>

            <div className="card-top">
              <div className="scholarship-icon">
                {item.icon || <GraduationCap />}
              </div>

              <button
                className={`save-btn ${
                  saved.includes(item.id) ? "active" : ""
                }`}
                onClick={() => toggleSave(item.id)}
                aria-label="Save scholarship"
              >
                <Bookmark
                  size={20}
                  fill={
                    saved.includes(item.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            <span className="category-label">
              {item.category}
            </span>

            <h3>{item.name}</h3>
            <p className="provider">{item.provider}</p>

            <div className="amount">
              ₹{Number(item.amount).toLocaleString("en-IN")}
              <small> / scholarship amount</small>
            </div>

            <p className="description">
              {item.description}
            </p>

            <div className="card-footer">
              <span>Deadline: {item.deadline}</span>

              <button
                className="view-btn"
                onClick={() => setSelected(item)}
              >
                View Details <ArrowUpRight size={16} />
              </button>
            </div>

          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No scholarships found</h3>
          <p>Try another search or category.</p>
        </div>
      )}

      <p className="saved-count">
        <Bookmark size={16} />
        {saved.length} scholarships saved
      </p>

      {selected && (
        <div
          className="scholarship-modal-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="scholarship-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </button>

            <span className="category-label">
              {selected.category}
            </span>

            <h2>{selected.name}</h2>
            <p className="provider">{selected.provider}</p>

            <h3>
              ₹{Number(selected.amount).toLocaleString("en-IN")}
            </h3>

            <p>{selected.description}</p>

            <p>
              <strong>Education Level:</strong> {selected.level}
            </p>

            <p>
              <strong>Application Deadline:</strong> {selected.deadline}
            </p>

            <Link
              to="/apply"
              className="modal-apply-btn"
              onClick={() => setSelected(null)}
            >
              Apply Now <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      )}

      <p className="demo-notice">
        Demo scholarship data only. Verify eligibility, amounts and deadlines
        with the official scholarship provider.
      </p>

    </section>
  );
}
