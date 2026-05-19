import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { FiZap, FiTool, FiTruck } from "react-icons/fi";
import "./Dashboard.css";
import { fetchUserBookings } from "../../services/bookingServices";
import StatCard from "../../components/dashboard/StatCard";
import ConsumerBookingCard from "../../components/dashboard/ConsumerBookingCard";

const ConsumerDashboard = () => {
  const [upComingBookings, setUpComingsBookings] = useState([]);
  const [pendingPayment, setPendingPayment] = useState([]);
  const [actionRequiredRequests, setActionRequiredRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUpComingBookings = async () => {
      try {
        const upComingBookings = await fetchUserBookings(true);
        setUpComingsBookings(upComingBookings);
      } catch (e) {
        console.error(e);
      }
    };
    const getPendingPayment = async () => {
      try {
        const pendingPayment = await fetchUserBookings(false, true);
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
            provider: { name: "Cooling Experts" },
          },
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
            {/* {actionRequiredRequests.length > 0 ? ( */}

            {/* <h3 className="heading-5 section-header">Action Required</h3> */}

            {/* {actionRequiredRequests.map((req) => (
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
                ))} */}

            {pendingPayment.length > 0
              ? pendingPayment.map((p) => (
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
                        <h4 className="heading-6">Payment Due</h4>
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
                ))
              : null}

            <h3 className="heading-5 section-header">Upcoming Bookings</h3>
            <div className="bookings-list">
              {upComingBookings.length > 0
                ? upComingBookings.map((booking) => (
                    <ConsumerBookingCard
                      key={booking._id}
                      booking={booking}
                      onManage={() =>
                        navigate(`/consumer/booking/${booking._id}`)
                      }
                    />
                  ))
                : "No Upcoming Bookings"}
            </div>
          </section>
          <section className="dashboard-section">
            <h3 className="heading-5 section-header">Recommended for You</h3>
            <div className="recommendations-grid">
              <StatCard title="Electrician" icon={<FiZap />} />
              <StatCard title="Plumbing" icon={<FiTool />} />
              <StatCard title="Car Wash" icon={<FiTruck />} />
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
            <Button
              variant="primary"
              style={{ width: "100%" }}
              onClick={() => navigate("/services")}
            >
              Search Services
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
