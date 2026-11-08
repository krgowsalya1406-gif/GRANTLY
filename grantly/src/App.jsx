
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import ScholarshipSection from "./components/ScholarshipSection";
import EligibilityChecker from "./components/EligibilityChecker";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import DeadlineReminders from "./components/DeadlineReminders";
import ApplicationForm from "./components/ApplicationForm";
import MyApplications from "./components/MyApplications";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">

        <Sidebar />

        <main className="main-content">

          <header className="top-header">
            <div className="welcome-text">
              Welcome to GRANTLY 🎓
            </div>

            <div className="header-actions">
              <Link to="/login" className="header-login">
                Login
              </Link>

              <Link to="/register" className="header-register">
                Register
              </Link>

              <Link to="/profile" className="header-profile">
                My Profile
              </Link>
            </div>
          </header>

          <div className="page-content">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/scholarships" element={<ScholarshipSection />} />
              <Route path="/eligibility" element={<EligibilityChecker />} />
              <Route path="/applications" element={<MyApplications />} />
              <Route path="/deadlines" element={<DeadlineReminders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/apply" element={<ApplicationForm />} />
            </Routes>
          </div>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
