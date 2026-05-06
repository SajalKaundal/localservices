import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { FiZap, FiTool, FiTruck } from "react-icons/fi";
import "./Dashboard.css";
import { fetchUserBookings } from "../../services/bookingServices";
import { fetchUserRequests } from "../../services/requestService";

const ConsumerDashboard = () => {
  const [upComingBookings, setUpComingsBookings] = useState([]);
  const [pendingPayment, setPendingPayment] = useState([]);
  const [actionRequiredRequests, setActionRequiredRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUpComingBookings = async () => {
      try {
        const upComingBookings = await fetchUserBookings(
          "69f3769965de75f0df8f8eac",
          true,
        );
        setUpComingsBookings(upComingBookings);
      } catch (e) {
        console.error(e);
      }
    };
    const getPendingPayment = async () => {
      try {
        const pendingPayment = await fetchUserBookings(
          "69f3769965de75f0df8f8eac",
          false,
          true,
        );
        setPendingPayment(pendingPayment);
      } catch (e) {
        console.error(e);
      }
    };
    const getActionRequiredRequests = async () => {
      try {
        // Mocking for now as we don't have real data yet
        const requests = [
          {
            _id: "req2",
            service: { name: "AC Maintenance" },
            status: "Action Required",
            provider: { name: "Cooling Experts" }
          }
        ];
        setActionRequiredRequests(requests);
      } catch (e) {
        console.error(e);
      }
    };
    getPendingPayment();
    getUpComingBookings();
    getActionRequiredRequests();
  }, []);

  return (
    <div className="consumer-dashboard">
      <div className="dashboard-grid">
        <div className="main-column">
          <section className="dashboard-section">
            {pendingPayment.length > 0 || actionRequiredRequests.length > 0 ? (
              <>
                <h3 className="heading-5 section-header">Action Required</h3>

                {actionRequiredRequests.map((req) => (
                  <Card
                    key={req._id}
                    elevation="medium"
                    style={{
                      marginBottom: "24px",
                      border: "1px solid var(--color-neon-green)",
                      background: "rgba(54, 244, 164, 0.05)"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h4 className="heading-6" style={{color: "var(--color-neon-green)"}}>
                          Proposal Received
                        </h4>
                        <p className="body-muted" style={{ marginTop: "4px" }}>
                          {req.service.name} • From {req.provider.name}
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/consumer/requests`)}
                      >
                        Respond Now
                      </Button>
                    </div>
                  </Card>
                ))}

                {pendingPayment.map((p) => (
                  <Card
                    key={p._id}
                    elevation="medium"
                    style={{
                      marginBottom: "24px",
                      border: "1px solid var(--color-shade-70)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h4 className="heading-6">
                          Payment Due
                        </h4>
                        <p className="body-muted" style={{ marginTop: "4px" }}>
                          {p.service.name} • Completed on{" "}
                          {p.updatedAt?.slice(0, 10)}
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/consumer/booking/${p._id}`)}
                      >
                        Manage Booking
                      </Button>
                    </div>
                  </Card>
                ))}
              </>
            ) : null}

            <h3 className="heading-5 section-header">Upcoming Bookings</h3>
            <div className="bookings-list">
              {upComingBookings.length > 0 &&
                upComingBookings.map((booking) => (
                  <Card
                    key={booking._id}
                    className="booking-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div
                      className="booking-header"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <div className="booking-info">
                        <h4 className="heading-6">{booking.service.name}</h4>
                        <p className="body-muted" style={{ marginTop: "4px" }}>
                          {booking.provider.name} •{" "}
                          {booking.scheduledAt?.slice(0, 10)} ,{" "}
                          {booking.timeSlot}
                        </p>
                      </div>
                      <div
                        className="booking-statuses"
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Badge>
                          {booking.bookingStatus}
                        </Badge>
                        <Badge>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </div>

                    <div
                      className="booking-amounts"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "var(--color-forest)",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid var(--color-shade-70)",
                        width: "100%",
                      }}
                    >
                      <div className="amount-item">
                        <span
                          className="body-small"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "var(--color-shade-50)",
                          }}
                        >
                          Total Amount
                        </span>
                        <span className="body-strong">
                          ₹{booking.totalAmount || 0}
                        </span>
                      </div>
                      <div className="amount-item">
                        <span
                          className="body-small"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "var(--color-shade-50)",
                          }}
                        >
                          Advance Paid
                        </span>
                        <span className="body-strong">
                          ₹{booking.advanceAmount || 0}
                        </span>
                      </div>
                      <div
                        className="amount-item"
                        style={{ textAlign: "right" }}
                      >
                        <span
                          className="body-small"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "var(--color-shade-50)",
                          }}
                        >
                          Balance Due
                        </span>
                        <span className="body-strong">
                          ₹{booking.remainingAmount || 0}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="secondary" 
                      style={{width: '100%', marginTop: '8px'}}
                      onClick={() => navigate(`/consumer/booking/${booking._id}`)}
                    >
                      Track Job Progress
                    </Button>
                  </Card>
                ))}
            </div>
          </section>
          <section className="dashboard-section">
            <h3 className="heading-5 section-header">Recommended for You</h3>
            <div className="recommendations-grid">
              <Card elevation="subtle" className="rec-card">
                <div className="rec-icon">
                  <FiZap />
                </div>
                <h4>Electrician</h4>
              </Card>
              <Card elevation="subtle" className="rec-card">
                <div className="rec-icon">
                  <FiTool />
                </div>
                <h4>Plumbing</h4>
              </Card>
              <Card elevation="subtle" className="rec-card">
                <div className="rec-icon">
                  <FiTruck />
                </div>
                <h4>Car Wash</h4>
              </Card>
            </div>
          </section>
        </div>

        <div className="side-column">
          <Card elevation="medium" className="action-card">
            <h4 className="heading-5">Need something else?</h4>
            <p
              className="body-muted"
              style={{ marginTop: "8px", marginBottom: "16px" }}
            >
              Search our network of verified professionals.
            </p>
            <Button variant="primary" style={{ width: "100%" }}>
              Search Services
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
