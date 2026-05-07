import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

import { fetchProviderBookings } from "../../services/providerServices";

const MyJobs = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsData = await fetchProviderBookings(
          "69f36e3d65de75f0df8f8e7d",
        );
        const filteredBookings = bookingsData.filter(b => b.status !== "pending" && b.status !== "negotiating");
        setBookings(filteredBookings);
      } catch (err) {
        console.error(err.message);
      }
    };
    getBookings();
  }, []);

  return (
    <div className="provider-page">
      <h2 className="heading-3" style={{ marginBottom: "24px" }}>
        My Jobs
      </h2>

      <Card elevation="medium">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Service</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Earnings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 &&
              bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.bookingId}</td>
                  <td>{b.service.name}</td>
                  <td>{b.user.name}</td>
                  <td>{b.scheduledAt.slice(0, 10)}</td>
                  <td>
                    {b.status === "confirmed" ? (
                      <Badge
                        style={{
                          backgroundColor: "rgba(54, 244, 164, 0.2)",
                          color: "var(--color-neon-green)",
                        }}
                      >
                        Upcoming
                      </Badge>
                    ) : b.status === "in-progress" ? (
                      <Badge
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          color: "#60A5FA",
                        }}
                      >
                        In Progress
                      </Badge>
                    ) : (
                      <Badge
                        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      >
                        Completed
                      </Badge>
                    )}
                  </td>
                  <td>₹{b.service.basePrice}</td>
                  <td>
                    <Button
                      variant="ghost"
                      style={{ padding: "4px 8px" }}
                      onClick={() => navigate(`/provider/job/${b._id}`)}
                    >
                      Manage Job
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MyJobs;
