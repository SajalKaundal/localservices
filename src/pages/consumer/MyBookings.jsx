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
                    <td>{b.service.name}</td>
                    <td>{b.provider.name}</td>
                    <td>{b.createdAt.slice(0, 10)}</td>
                    <td>
                      <Badge>
                        {b.bookingStatus === "in-progress"
                          ? "In Progress"
                          : b.bookingStatus}
                      </Badge>
                    </td>
                    <td>
                      ₹
                      {b.paymentStatus === "pending"
                        ? b.advanceAmount || (b.totalAmount * 0.1)
                        : b.paymentStatus === "partial"
                          ? b.remainingAmount || (b.totalAmount * 0.9)
                          : b.totalAmount || 0}
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
