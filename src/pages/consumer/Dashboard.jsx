import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { FiZap, FiTool, FiTruck } from "react-icons/fi";
import "./Dashboard.css";
import { fetchUserBookings } from "../../services/bookingServices";
import { initiatePayment } from "../../utils/paymentUtils";
import { createOrder } from "../../services/paymentServices";

// const upcomingBookings = [
//   { id: 1, service: 'Deep Home Cleaning', provider: 'Fresh Home', date: 'Tomorrow, 10:00 AM', status: 'Confirmed' },
//   { id: 2, service: 'AC Repair', provider: 'CoolBreeze AC', date: 'Oct 15, 2:00 PM', status: 'Pending' },
// ];

const ConsumerDashboard = () => {
  const [upComingBookings, setUpComingsBookings] = useState([]);
  const [pendingPayment, setPendingPayment] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handlePendingPayment = async (booking) => {
    try {
      const order = await createOrder({ bookingId:booking._id, paymentType: "remaining" });
      initiatePayment({
        order,
        description: `Remaining Payment for ${booking.service.name}`,
        onSuccess: (txId) => {alert(`Payment successful! ID: ${txId}`)
      setRefresh((prev)=>!prev)},
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    const getUpComingBookings = async () => {
      const upComingBookings = await fetchUserBookings(
        "69f3769965de75f0df8f8eac",
        true,
      );
      setUpComingsBookings(upComingBookings);
    };
    const getPendingPayment = async () => {
      const pendingPayment = await fetchUserBookings(
        "69f3769965de75f0df8f8eac",
        false,
        true,
      );
      setPendingPayment(pendingPayment);
    };
    getPendingPayment();
    getUpComingBookings();
  }, [refresh]);

  return (
    <div className="consumer-dashboard">
      <div className="dashboard-grid">
        <div className="main-column">
          <section className="dashboard-section">
            {pendingPayment.length > 0 && (
              <>
                <h3 className="heading-5 section-header">Action Required</h3>

                {pendingPayment.map((p) => (
                  <Card
                    key={p._id}
                    elevation="medium"
                    style={{
                      marginBottom: "24px",
                      border: "1px solid var(--color-neon-green)",
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
                        <h4
                          className="heading-6"
                          style={{ color: "var(--color-neon-green)" }}
                        >
                          Payment Due
                        </h4>
                        <p className="body-muted" style={{ marginTop: "4px" }}>
                          {p.service.name} • Completed on{" "}
                          {p.updatedAt.slice(0, 10)}
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => handlePendingPayment(p)}
                      >
                        Pay ₹{p.remainingAmount}
                      </Button>
                    </div>
                  </Card>
                ))}
              </>
            )}

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
                          {booking.scheduledAt.slice(0, 10)} ,{" "}
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
                        <Badge
                          className={
                            ["confirmed", "completed"].includes(
                              booking.bookingStatus?.toLowerCase(),
                            )
                              ? "badge-success"
                              : ["cancelled"].includes(
                                    (
                                      booking.bookingStatus || booking.status
                                    )?.toLowerCase(),
                                  )
                                ? "badge-danger"
                                : ["in-progress"].includes(
                                      (
                                        booking.bookingStatus || booking.status
                                      )?.toLowerCase(),
                                    )
                                  ? "badge-info"
                                  : "badge-warning"
                          }
                        >
                          {booking.bookingStatus}
                        </Badge>
                        <Badge
                          className={
                            booking.paymentStatus === "paid"
                              ? "badge-success"
                              : booking.paymentStatus === "refunded"
                                ? "badge-danger"
                                : booking.paymentStatus === "partial"
                                  ? "badge-info"
                                  : "badge-warning"
                          }
                        >
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
                        border: "1px solid var(--color-deep-teal)",
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
                        <span
                          className="body-strong"
                          style={{ color: "var(--color-neon-green)" }}
                        >
                          ₹{booking.remainingAmount || 0}
                        </span>
                      </div>
                    </div>
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
