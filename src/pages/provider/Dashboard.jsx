import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { fetchProviderBookings } from "../../services/providerServices";
import { fetchRequests } from "../../services/requestService";
import StatCard from "../../components/dashboard/StatCard";
import ProviderJobCard from "../../components/dashboard/ProviderJobCard";
// Reusing consumer dashboard CSS for grid structure
import "../consumer/Dashboard.css";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [newRequests, setNewRequests] = useState([]);
  const [upcomingJobs, setUpcomingJobs] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      const requests = await fetchRequests();
      const newRequests = requests.filter(
        (r) => r.status === "Pending" || r.status === "Negotiating",
      );
      setNewRequests(newRequests);
      // setLoading(false);
    };
    const getBookings = async () => {
      try {
        const bookings = await fetchProviderBookings(
          "69f36e3d65de75f0df8f8e7d",
        );

        const upcoming = bookings.filter(
          (b) =>
            b.bookingStatus === "confirmed" ||
            b.bookingStatus === "in-progress",
        );
        setUpcomingJobs(upcoming);
      } catch (err) {
        console.error(err.message);
      }
    };
    getRequests();
    getBookings();
  }, []);

  console.log(newRequests);
  return (
    <div className="provider-dashboard">
      <div className="dashboard-grid">
        <div className="main-column">
          {/* Stats Row */}
          <section className="dashboard-section">
            <div className="recommendations-grid">
              <StatCard title="Monthly Earnings" value="₹1,240" />
              <StatCard title="Completed Jobs" value="18" />
              <StatCard title="Rating" value="4.9" />
            </div>
          </section>

          {/* New Requests */}
          <section className="dashboard-section">
            <h3 className="heading-5 section-header">New Booking Requests</h3>
            <div className="bookings-list">
              {newRequests.length > 0 ? (
                newRequests.map((req) => (
                  <ProviderJobCard
                    key={req._id}
                    title={req.serviceId?.name}
                    badgeText="New Request"
                    subtitle={`${req.userId?.name} • ${req.messages[0]?.proposal?.startTime?.slice(0, 10)}`}
                    buttonText="Review & Propose"
                    buttonVariant="primary"
                    onAction={() =>
                      navigate(`/provider/requests`, {
                        state: { selectedRequestId: req._id },
                      })
                    }
                  />
                ))
              ) : (
                <p className="body-muted">
                  No new booking requests at the moment.
                </p>
              )}
            </div>
          </section>

          {/* Upcoming Jobs */}
          <section className="dashboard-section">
            <h3 className="heading-5 section-header">
              Upcoming & Ongoing Jobs
            </h3>
            <div className="bookings-list">
              {upcomingJobs.length > 0 ? (
                upcomingJobs.map((job) => (
                  <ProviderJobCard
                    key={job._id}
                    title={job.service?.name}
                    badgeText={
                      job.bookingStatus === "in-progress" || job.status === "in-progress"
                        ? "In Progress"
                        : "Confirmed"
                    }
                    subtitle={`${job.user?.name} • ${job.scheduledAt?.slice(0, 10)}`}
                    buttonText="Manage Job"
                    buttonVariant="secondary"
                    onAction={() => navigate(`/provider/job/${job._id}`)}
                  />
                ))
              ) : (
                <p className="body-muted">No upcoming jobs.</p>
              )}
            </div>
          </section>
        </div>

        <div className="side-column">
          <Card elevation="medium" className="action-card">
            <h4 className="heading-5">Profile Strength</h4>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "4px",
                margin: "16px 0",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  backgroundColor: "var(--color-neon-green)",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
            <p
              className="body-muted"
              style={{ marginBottom: "16px", fontSize: "14px" }}
            >
              Add 2 more photos to your portfolio to reach 100%.
            </p>
            <Button
              variant="secondary"
              style={{ width: "100%" }}
              onClick={() => navigate("/provider/profile/edit")}
            >
              Edit Profile
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
