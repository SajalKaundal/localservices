import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import "./ConsumerPages.css";
import { fetchUserBookings } from "../../services/bookingServices";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookings = await fetchUserBookings();
        setBookings(bookings);
      } catch (err) {
        console.error(err.message);
      }
    };
    getBookings();
  }, []);

  return (
    <div className="consumer-page" style={{ maxWidth: "1000px" }}>
      <h2 className="heading-3" style={{ marginBottom: "24px" }}>
        Booking History
      </h2>

      <Card elevation="medium">
        <div style={{ overflowX: "auto" }}>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Service</th>
                <th>Provider</th>
                <th>Date</th>
                <th>Status</th>
                <th>Due</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 &&
                bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.bookingId}</td>
                    <td>{b.serviceId.name}</td>
                    <td>{b.providerId.name}</td>
                    <td>{b.createdAt.slice(0, 10)}</td>
                    <td>
                    {b.bookingStatus === "Advance-Payment-Pending" ||
                    b.bookingStatus === "Final-Payment-Pending" ? (
                      <Badge
                        style={{
                          backgroundColor: "rgba(245, 158, 11, 0.2)",
                          color: "#F59E0B",
                        }}
                      >
                        Payment Pending
                      </Badge>
                    ) : b.bookingStatus === "Confirmed" ? (
                      <Badge
                        style={{
                          backgroundColor: "rgba(54, 244, 164, 0.2)",
                          color: "var(--color-neon-green)",
                        }}
                      >
                        Upcoming
                      </Badge>
                    ) : b.bookingStatus === "In-Progress" ? (
                      <Badge
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          color: "#60A5FA",
                        }}
                      >
                        In Progress
                      </Badge>
                    ) : b.bookingStatus === "Completed" ? (
                      <Badge
                        style={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "#FFFFFF",
                        }}
                      >
                        Completed
                      </Badge>
                    ) : b.bookingStatus === "Cancelled" ? (
                      <Badge
                        style={{
                          backgroundColor: "rgba(239, 68, 68, 0.2)",
                          color: "#EF4444",
                        }}
                      >
                        Cancelled
                      </Badge>
                    ) : (
                      <Badge
                        style={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                      >
                        Unknown
                      </Badge>
                    )}
                  </td>
                    <td>
                      ₹
                      {b.bookingStatus === "Advance-Payment-Pending"
                        ? b.advanceAmount 
                        : b.paymentStatus === "Final-Payment-Pending"
                          ? b.remainingAmount 
                          : 0}
                    </td>
                    <td>
                      <Button
                        variant="ghost"
                        style={{ padding: "4px 8px" }}
                        onClick={() => navigate(`/consumer/booking/${b._id}`)}
                      >
                        Manage Booking
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MyBookings;
