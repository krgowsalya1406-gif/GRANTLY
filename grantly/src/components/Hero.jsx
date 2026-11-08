import { ArrowRight, Search, GraduationCap } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="announcement">
          ✨ Your future deserves an opportunity
        </div>

        <h1>
          Your Dreams.
          <br />
          Your Education.
          <br />
          <span>Your Scholarship.</span>
        </h1>

        <p>
          Discover scholarships that match your goals.
          Find opportunities, check your eligibility and
          manage every application in one place.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Explore Scholarships <ArrowRight size={18} />
          </button>

          <button className="secondary-btn">
            Check Eligibility
          </button>
        </div>

        <div className="hero-search">
          <Search size={20} />
          <input placeholder="Search scholarships, courses..." />
          <button>Search</button>
        </div>

        <div className="hero-stats">
          <div>
            <strong>500+</strong>
            <small>Opportunities</small>
          </div>
          <div>
            <strong>100+</strong>
            <small>Institutions</small>
          </div>
          <div>
            <strong>Free</strong>
            <small>To Discover</small>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="visual-circle">
          <GraduationCap size={110} />
        </div>

        <div className="floating-card">
          <span>🎓</span>
          <div>
            <strong>Your next opportunity awaits!</strong>
            <small>Start exploring today</small>
          </div>
        </div>
      </div>
    </section>
  );
}