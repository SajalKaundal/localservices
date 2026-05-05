import React from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import "./ConsumerPages.css";
import { fetchUserBookings } from "../../services/bookingServices";
import { initiatePayment } from "../../utils/paymentUtils";
import { useState, useEffect } from "react";
import { createOrder } from "../../services/paymentServices";

// const myBookings = [
//   {
//     id: "BK-1001",
//     service: "AC Deep Cleaning",
//     provider: "CoolBreeze AC",
//     date: "Oct 25, 2026",
//     status: "Confirmed",
//     price: "₹45",
//   },
//   {
//     id: "BK-0998",
//     service: "Plumbing Fix",
//     provider: "Joe Plumber",
//     date: "Oct 10, 2026",
//     status: "Completed",
//     price: "₹120",
//   },
//   {
//     id: "BK-0985",
//     service: "Car Wash",
//     provider: "Alex Auto Care",
//     date: "Sep 28, 2026",
//     status: "Cancelled",
//     price: "₹15",
//   },
// ];

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handlePayment = async (booking) => {
    const paymentType =
      booking.paymentStatus === "pending" ? "advance" : "remaining";
    try {
      const order = await createOrder({ bookingId: booking._id, paymentType });
      initiatePayment({
        order,
        description: `${booking.paymentStatus === "pending" ? "Advance" : "Remaining"} Payment for ${booking.service.name}`,
        onSuccess: (txId) => {
          alert(`Payment successful! ID: ${txId}`);
          setRefresh((prev) => !prev);
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookings = await fetchUserBookings("69f3769965de75f0df8f8eac");
        // console.log(bookings)
        setBookings(bookings);
      } catch (err) {
        console.error(err.message);
      }
    };
    getBookings();
    // console.log(bookings)
  }, [refresh]);

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
                      <Badge
                        style={{
                          backgroundColor:
                            b.bookingStatus === "created"
                              ? "rgba(54, 244, 164, 0.2)"
                              : b.bookingStatus === "confirmed"
                                ? "rgba(59, 130, 246, 0.2)"
                                : b.bookingStatus === "completed"
                                  ? "rgba(255,255,255,0.1)"
                                  : "rgba(245, 158, 11, 0.2)",
                          color:
                            b.bookingStatus === "created"
                              ? "var(--color-neon-green)"
                              : b.bookingStatus === "confirmed"
                                ? "#60A5FA"
                                : b.bookingStatus === "completed"
                                  ? "white"
                                  : "#FCD34D",
                        }}
                      >
                        {b.bookingStatus === "in-progress"
                          ? "In Progress"
                          : b.bookingStatus}
                      </Badge>
                    </td>
                    <td>
                      ₹
                      {b.paymentStatus === "pending"
                        ? b.advanceAmount
                        : b.paymentStatus === "partial"
                          ? b.remainingAmount
                          : b.totalAmount}
                    </td>
                    <td>
                      {(b.bookingStatus === "confirmed" ||
                        b.bookingStatus === "created") && (
                        <Button
                          variant="ghost"
                          style={{
                            padding: "4px 8px",
                            fontSize: "14px",
                            color: "#EF4444",
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                      {b.bookingStatus === "in-progress" && (
                        <span
                          className="body-muted"
                          style={{ fontSize: "14px" }}
                        >
                          Service Ongoing
                        </span>
                      )}
                      {(b.paymentStatus === "pending" ||
                        b.paymentStatus === "partial") &&
                        b.paymentStatus !== "in-progress" &&
                        b.remainingAmount !== 0 && (
                          <div style={{ display: "flex", gap: "8px" }}>
                            <Button
                              variant="primary"
                              style={{ padding: "8px 16px", fontSize: "14px" }}
                              onClick={() => {
                                handlePayment(b);
                              }}
                            >
                              {/* {b.paymentStatus === "pending"
                              ? "Pay Advance"
                              : b.paymentStatus === "partial"
                                ? "Pay Balance"
                                : ""} */}
                              Pay
                            </Button>
                            {/* <Button
                            variant="ghost"
                            style={{ padding: "4px 8px", fontSize: "14px" }}
                          >
                            Review
                          </Button> */}
                          </div>
                        )}
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
