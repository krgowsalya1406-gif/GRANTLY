import { useState } from "react";
import { UserRound, GraduationCap, Save, CheckCircle } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(() =>
    JSON.parse(localStorage.getItem("grantlyProfile") || "null") || {
      name: "",
      email: "",
      phone: "",
      college: "",
      course: "B.E. Computer Science",
      year: "2nd Year",
      percentage: "",
      skills: ""
    }
  );

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setMessage("");
  };

  const saveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("grantlyProfile", JSON.stringify(profile));
    setMessage("Your profile has been saved successfully!");
  };

  const completion = Object.values(profile).filter(
    value => String(value).trim() !== ""
  ).length;

  const percentage = Math.round((completion / 8) * 100);

  return (
    <section className="profile-page">
      <div className="profile-heading">
        <span>STUDENT ACCOUNT</span>
        <h1>My <strong>Profile</strong></h1>
        <p>Manage your personal and academic information.</p>
      </div>

      <div className="profile-layout">
        <div className="profile-summary">
          <div className="profile-avatar">
            <UserRound size={45} />
          </div>

          <h2>{profile.name || "Your Name"}</h2>
          <p>{profile.course}</p>

          <div className="completion-info">
            <div>
              <strong>Profile Completion</strong>
              <strong>{percentage}%</strong>
            </div>
            <div className="progress-track">
              <div style={{ width: `${percentage}%` }} />
            </div>
          </div>

          <p className="profile-tip">
            Complete your information to prepare for scholarship applications.
          </p>
        </div>

        <form className="profile-form" onSubmit={saveProfile}>
          <h2><UserRound size={21} /> Personal Information</h2>

          <div className="profile-fields">
            <div>
              <label>Full Name</label>
              <input name="name" value={profile.name} onChange={handleChange} placeholder="Enter your name" required />
            </div>

            <div>
              <label>Email Address</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>

            <div>
              <label>Phone Number</label>
              <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Enter phone number" />
            </div>

            <div>
              <label>College Name</label>
              <input name="college" value={profile.college} onChange={handleChange} placeholder="Enter college name" />
            </div>

            <div>
              <label>Course</label>
              <select name="course" value={profile.course} onChange={handleChange}>
                <option>B.E. Computer Science</option>
                <option>B.Tech Information Technology</option>
                <option>B.Sc Computer Science</option>
                <option>B.Com</option>
                <option>B.A.</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Current Year</label>
              <select name="year" value={profile.year} onChange={handleChange}>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>Final Year</option>
              </select>
            </div>

            <div>
              <label>Academic Percentage</label>
              <input type="number" name="percentage" min="0" max="100" value={profile.percentage} onChange={handleChange} placeholder="Example: 85" />
            </div>

            <div>
              <label>Skills</label>
              <input name="skills" value={profile.skills} onChange={handleChange} placeholder="HTML, CSS, Python..." />
            </div>
          </div>

          <button type="submit" className="profile-save">
            <Save size={18} /> Save Profile
          </button>

          {message && (
            <p className="profile-success">
              <CheckCircle size={18} /> {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}