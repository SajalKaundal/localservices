import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

import Input from "../../components/ui/Input";
import { fetchProviderBookings } from "../../services/providerServices";

const MyJobs = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookings = await fetchProviderBookings(
          "69f36e3d65de75f0df8f8e7d",
        );
        setBookings(bookings);
      } catch (err) {
        console.error(err.message);
      }
    };
    getBookings();
  }, []);

  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(1);

  const handleConfirmJob = (bookingId) => {
    setBookings(
      bookings.map((b) =>
        b._id === bookingId ? { ...b, status: "confirmed" } : b,
      ),
    );
  };

  const handleStartJob = (bookingId) => {
    setBookings(
      bookings.map((b) =>
        b._id === bookingId ? { ...b, status: "in-progress" } : b,
      ),
    );
  };

  const openCompletionModal = (booking) => {
    setSelectedBooking(booking);
    setHoursWorked(1);
    if (booking.service.pricingType === "fixed") {
      // Complete directly without modal
      setBookings(
        bookings.map((b) =>
          b._id === booking._id ? { ...b, status: "completed" } : b,
        ),
      );
    } else {
      setCompletionModalOpen(true);
    }
  };

  const handleCompleteJob = () => {
    if (selectedBooking) {
      setBookings(
        bookings.map((b) =>
          b._id === selectedBooking._id
            ? {
                ...b,
                status: "completed",
                hoursWorked:
                  selectedBooking.service.pricingType === "hourly"
                    ? parseInt(hoursWorked)
                    : null,
              }
            : b,
        ),
      );
    }
    setCompletionModalOpen(false);
    setSelectedBooking(null);
  };

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
                <tr>
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
                    ) : b.status === "pending" ? (
                      <Badge
                        style={{
                          backgroundColor: "rgba(244, 67, 54, 0.2)",
                          color: "rgb(244, 67, 54)",
                        }}
                      >
                        Pending
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
                    {b.status === "pending" ? (
                      <Button
                        variant="ghost"
                        style={{ padding: "4px 8px" }}
                        onClick={() => handleConfirmJob(b._id)}
                      >
                        Confirm
                      </Button>
                    ) : b.status === "confirmed" ? (
                      <Button
                        variant="primary"
                        style={{ padding: "4px 8px" }}
                        onClick={() => handleStartJob(b._id)}
                      >
                        Start Job
                      </Button>
                    ) : b.status === "in-progress" ? (
                      <Button
                        variant="secondary"
                        style={{ padding: "4px 8px" }}
                        onClick={() => openCompletionModal(b)}
                      >
                        Complete
                      </Button>
                    ) : (
                      <Button variant="ghost" style={{ padding: "4px 8px" }}>
                        Details
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            {/* <tr>
              <td>BK-1001</td>
              <td>AC Deep Clean</td>
              <td>Sarah Jenkins</td>
              <td>Oct 25, 2026</td>
              <td>
                <Badge
                  style={{
                    backgroundColor: "rgba(54, 244, 164, 0.2)",
                    color: "var(--color-neon-green)",
                  }}
                >
                  Upcoming
                </Badge>
              </td>
              <td>₹45.00</td>
              <td>
                <Button variant="ghost" style={{ padding: "4px 8px" }}>
                  Message
                </Button>
              </td>
            </tr>
            <tr>
              <td>BK-0988</td>
              <td>AC Repair</td>
              <td>Mike Tyson</td>
              <td>Oct 20, 2026</td>
              <td>
                <Badge style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  Completed
                </Badge>
              </td>
              <td>₹85.00</td>
              <td>
                <Button variant="ghost" style={{ padding: "4px 8px" }}>
                  View Details
                </Button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </Card>

      {/* Completion Modal */}
      {completionModalOpen && selectedBooking && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <Card
            elevation="medium"
            style={{ maxWidth: "400px", width: "100%", padding: "24px" }}
          >
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Complete Job
            </h3>
            <p className="body-muted" style={{ marginBottom: "16px" }}>
              Please enter the total hours required to complete this job. This
              will be used to calculate the remaining balance for the consumer.
            </p>
            <Input
              label="Total Hours Worked"
              type="number"
              min="1"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "24px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="ghost"
                onClick={() => setCompletionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCompleteJob}>
                Submit & Complete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
