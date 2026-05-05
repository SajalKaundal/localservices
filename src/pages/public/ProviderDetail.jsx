import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import "./ProviderDetail.css";
import { fetchProvider } from "../../services/publicServices";

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [provider, setProvider] = useState([]);
  useEffect(() => {
    const getProvider = async () => {
      try {
        const provider = await fetchProvider(id);
        // console.log(provider);
        setProvider(provider);
      } catch (err) {
        console.error(err.message);
      }
    };
    getProvider();
  }, [id]);
  return (
    <div className="provider-detail-page">
      <div className="container">
        {/* Header Profile Section */}
        <section className="profile-header-section">
          <Card elevation="medium" className="profile-main-card">
            <div className="profile-header-top">
              <div className="profile-avatar-large">C</div>
              <div className="profile-title-area">
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <h1 className="heading-2">{provider.name}</h1>
                  {provider.isVerified && (
                    <Badge
                      style={{
                        backgroundColor: "rgba(54, 244, 164, 0.2)",
                        color: "var(--color-neon-green)",
                      }}
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <p
                  className="body-large body-muted"
                  style={{ marginTop: "8px" }}
                >
                  {`${provider.bio} • ${provider.experience} Years Experience`}
                </p>
                <div className="profile-stats">
                  <span style={{ color: "var(--color-neon-green)" }}>
                    ★ {provider.rating}
                  </span>
                  <span className="body-muted">(124 reviews)</span>
                  <span className="body-muted">• {provider.location}</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <div className="profile-content-grid">
          {/* Main Content */}
          <div className="profile-main-content">
            <section className="detail-section">
              <h2 className="heading-4" style={{ marginBottom: "16px" }}>
                About
              </h2>
              <p className="body-muted">
               {provider.about}
              </p>
            </section>

            <section className="detail-section">
              <h2 className="heading-4" style={{ marginBottom: "16px" }}>
                Services Offered
              </h2>
              <div className="services-list">
                {provider.services &&
                  provider.services.map((s) => (
                    <Card elevation="subtle" className="service-item-card">
                      <div>
                        <h4 className="heading-5">{s.name}</h4>
                        <p className="body-muted" style={{ marginTop: "4px" }}>
                          {s.description}
                        </p>
                      </div>
                      <div className="service-price">
                        <span className="heading-5">{`₹${s.basePrice}${s.pricingType==="hourly"?"/hr":""}`}</span>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            if (!userRole) {
                              alert("Please login to book a service");
                              navigate("/auth");
                            } else {
                              navigate(`/consumer/book?serviceId=${s._id}&providerId=${provider._id}`);
                            }
                          }}
                        >
                          Book
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </section>

            <section className="detail-section">
              <h2 className="heading-4" style={{ marginBottom: "16px" }}>
                Reviews
              </h2>
              <Card elevation="subtle" className="review-card">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 className="heading-6">Sarah Jenkins</h5>
                  <span style={{ color: "var(--color-neon-green)" }}>
                    ★ 5.0
                  </span>
                </div>
                <p className="body-muted" style={{ marginTop: "8px" }}>
                  Arrived on time and fixed the issue in 30 minutes. Highly
                  recommended!
                </p>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="profile-sidebar">
            <Card elevation="medium" className="booking-widget">
              <h3 className="heading-4">Book this Provider</h3>
              <p
                className="body-muted"
                style={{ marginTop: "8px", marginBottom: "24px" }}
              >
                Select a service to get started. Free cancellation up to 24
                hours before.
              </p>
              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={() => {
                  if (!userRole) {
                    alert("Please login to book a service");
                    navigate("/auth");
                  } else {
                    navigate(`/consumer/book?providerId=${provider._id}`);
                  }
                }}
              >
                Start Booking
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;
