
import {
  GraduationCap,
  LayoutDashboard,
  Award,
  ClipboardCheck,
  FileText,
  CalendarDays,
  UserRound,
  Bell
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Scholarships", path: "/scholarships", icon: Award },
    { name: "Eligibility", path: "/eligibility", icon: ClipboardCheck },
    { name: "My Applications", path: "/applications", icon: FileText },
    { name: "Deadlines", path: "/deadlines", icon: CalendarDays },
    { name: "My Profile", path: "/profile", icon: UserRound },
  ];

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        <GraduationCap size={34} />
        <span>GRANTLY</span>
      </Link>

      <Link to="/dashboard" className="sidebar-link">
  <LayoutDashboard size={21} />
  <span>Dashboard</span>
</Link>

      <p className="sidebar-subtitle">
        Your Scholarship Companion
      </p>

      <div className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <Icon size={21} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
