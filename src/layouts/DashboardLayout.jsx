import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiTool,
  FiClipboard,
  FiDollarSign,
  FiSearch,
  FiHome,
  FiCalendar,
  FiMessageSquare,
  FiUser,
  FiCreditCard,
  FiMenu,
  FiX,
  FiInbox,
} from "react-icons/fi";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import "./DashboardLayout.css";
import { useUser } from "../context/UserContext";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isProvider = location.pathname.includes("/provider");

  const navLinks = isProvider
    ? [
        { name: "Dashboard", path: "/provider/dashboard", icon: <FiGrid /> },
        { name: "Requests", path: "/provider/requests", icon: <FiInbox /> },
        { name: "My Jobs", path: "/provider/jobs", icon: <FiTool /> },
        { name: "Services", path: "/provider/services", icon: <FiClipboard /> },
        {
          name: "Earnings",
          path: "/provider/earnings",
          icon: <FiDollarSign />,
        },
      ]
    : [
        { name: "Home / Search", path: "/", icon: <FiSearch /> },
        { name: "Dashboard", path: "/consumer/dashboard", icon: <FiHome /> },
        {
          name: "My Requests",
          path: "/consumer/requests",
          icon: <FiClipboard />,
        },
        {
          name: "My Bookings",
          path: "/consumer/bookings",
          icon: <FiCalendar />,
        },
        {
          name: "Messages",
          path: "/consumer/messages",
          icon: <FiMessageSquare />,
        },
        {
          name: "Payments",
          path: "/consumer/payments",
          icon: <FiCreditCard />,
        },
        { name: "Profile", path: "/consumer/profile", icon: <FiUser /> },
      ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const { user, profileLoading } = useUser();
  return (
    <div className="dashboard-layout">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <Link
            to={isProvider ? "/provider/dashboard" : "/"}
            className="navbar-brand"
          >
            <span className="brand-text">Local</span>
            <span className="brand-accent">Serve</span>
          </Link>
          <button
            className="mobile-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Button variant="ghost" className="logout-btn" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <FiMenu />
            </button>
            <h2 className="heading-4">
              {navLinks.find((l) => l.path === location.pathname)?.name ||
                "Dashboard"}
            </h2>
          </div>
          <div className="user-profile">
            <div className="avatar">
              {profileLoading ? (
                ""
              ) : user?.profileImage ? (
                <img
                    src={user.profileImage}
                    alt={user.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
              ) : (
                `${user?.name?.charAt(0).toUpperCase()}`
              )}
            </div>
          </div>
        </header>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
