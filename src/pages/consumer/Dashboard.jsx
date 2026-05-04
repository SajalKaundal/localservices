import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { FiZap, FiTool, FiTruck } from "react-icons/fi";
import "./Dashboard.css";
import { useEditable } from "@chakra-ui/react";
import { fetchUserBookings } from "../../services/bookingServices";
import { initiatePayment } from "../../utils/paymentUtils";

// const upcomingBookings = [
//   { id: 1, service: 'Deep Home Cleaning', provider: 'Fresh Home', date: 'Tomorrow, 10:00 AM', status: 'Confirmed' },
//   { id: 2, service: 'AC Repair', provider: 'CoolBreeze AC', date: 'Oct 15, 2:00 PM', status: 'Pending' },
// ];

const ConsumerDashboard = () => {
  const [upComingBookings, setUpComingsBookings] = useState([]);

  useEffect(() => {
    const getUpComingBookings = async () => {
      const upComingBookings = await fetchUserBookings(
        "69f3769965de75f0df8f8eac",
        true,
      );
      setUpComingsBookings(upComingBookings);
    };
    getUpComingBookings();
  });

  return (
    <div className="consumer-dashboard">
      <div className="dashboard-grid">
        <div className="main-column">
          <section className="dashboard-section">
            <h3 className="heading-5 section-header">Action Required</h3>
            <Card elevation="medium" style={{marginBottom: '24px', border: '1px solid var(--color-neon-green)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <h4 className="heading-6" style={{color: 'var(--color-neon-green)'}}>Payment Due</h4>
                  <p className="body-muted" style={{marginTop: '4px'}}>AC Deep Cleaning • Completed on Oct 25</p>
                </div>
                <Button variant="primary" onClick={() => {
                  initiatePayment({
                    amount: 42.50,
                    description: 'Remaining Balance for AC Deep Cleaning',
                    onSuccess: (txId) => alert(`Payment successful! ID: ${txId}`)
                  });
                }}>Pay ₹42.50</Button>
              </div>
            </Card>

            <h3 className="heading-5 section-header">Upcoming Bookings</h3>
            <div className="bookings-list">
              {upComingBookings.length > 0 &&
                upComingBookings.map((booking) => (
                  <Card key={booking._id} className="booking-card">
                    <div className="booking-info">
                      <h4 className="heading-6">{booking.service.name}</h4>
                      <p className="body-muted">
                        {booking.provider.name} • {`${booking.scheduledAt.slice(0, 10)} ,${booking.timeSlot}`}
                      </p>
                    </div>
                    <div className="booking-status">
                      <Badge
                        className={
                          booking.status === "confirmed"
                            ? "badge-success"
                            : "badge-warning"
                        }
                      >
                        {booking.status}
                      </Badge>
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
