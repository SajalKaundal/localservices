import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import { useUser } from "../../context/UserContext";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { user, profileLoading } = useUser();
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        <Link
          to={userRole === "provider" ? "/provider/dashboard" : "/"}
          className="navbar-brand"
        >
          <span className="brand-text">Local</span>
          <span className="brand-accent">Serve</span>
        </Link>

        <div className="navbar-links">
          {userRole === "user" && (
            <>
              <Link
                to="/consumer/dashboard"
                className="nav-link"
                style={{ color: "var(--color-neon-green)" }}
              >
                My Dashboard
              </Link>
              <Link to="/consumer/bookings" className="nav-link">
                My Bookings
              </Link>
              <Link to="/consumer/profile" className="nav-link">
                Account Settings
              </Link>
            </>
          )}
          {userRole === "provider" && (
            <>
              <Link
                to="/provider/dashboard"
                className="nav-link"
                style={{ color: "var(--color-neon-green)" }}
              >
                Provider Dashboard
              </Link>
              <Link to="/provider/jobs" className="nav-link">
                Active Jobs
              </Link>
              <Link to="/provider/profile" className="nav-link">
                Account Settings
              </Link>
            </>
          )}
        </div>

        <div className="navbar-actions">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/dashboard")}
            style={{ color: "var(--color-shade-50)", marginRight: "8px" }}
          >
            Admin
          </Button>
          {userRole ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                className="avatar"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-dark-forest)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "500",
                  border: "1px solid var(--color-neon-green)",
                }}
              >
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
              <Button
                variant="ghost"
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              >
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/auth")}>
                Log in
              </Button>
            </>
          )}
          
          <button 
            className="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            {userRole === "user" && (
              <>
                <Link
                  to="/consumer/dashboard"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Dashboard
                </Link>
                <Link to="/consumer/bookings" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  My Bookings
                </Link>
                <Link to="/consumer/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Account Settings
                </Link>
              </>
            )}
            {userRole === "provider" && (
              <>
                <Link
                  to="/provider/dashboard"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Provider Dashboard
                </Link>
                <Link to="/provider/jobs" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Active Jobs
                </Link>
                <Link to="/provider/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Account Settings
                </Link>
              </>
            )}
            {!userRole && (
              <Link to="/auth" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Log in
              </Link>
            )}
            <Link to="/admin/dashboard" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
