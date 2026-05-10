import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import "./ProviderPages.css";
import { fetchProviderBooking, updateBookingStatus } from "../../services/providerServices";
import { useParams } from "react-router-dom";

const BookingDetails = () => {
  // Mocking the complex state machine
  // const [bookingState, setBookingState] = useState("CONFIRMED");
  // State flow: PENDING_PAYMENT -> CONFIRMED -> IN_PROGRESS -> COMPLETED -> FINAL_PAYMENT_PENDING -> CLOSED
  const { id } = useParams();
  // const [jobDetails] = useState({
  //   time: "10:00 AM",
  //   price: 1200,
  // });

  const renderBadge = () => {
    switch (booking.bookingStatus) {
      case "Advance-Payment-Pending":
      case "Final-Payment-Pending":
        return (
          <Badge
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              color: "#F59E0B",
            }}
          >
            Payment Pending
          </Badge>
        );

      case "Confirmed":
        return (
          <Badge
            style={{
              backgroundColor: "rgba(54, 244, 164, 0.2)",
              color: "var(--color-neon-green)",
            }}
          >
            Confirmed - Upcoming
          </Badge>
        );

      case "In-Progress":
        return (
          <Badge
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              color: "#60A5FA",
            }}
          >
            Job In Progress
          </Badge>
        );

      case "Completed":
        return (
          <Badge
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#FFFFFF",
            }}
          >
            Completed
          </Badge>
        );

      case "Cancelled":
        return (
          <Badge
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#EF4444",
            }}
          >
            Cancelled
          </Badge>
        );

      default:
        return null;
    }
  };
  const [booking, setBooking] = useState({
    bookingId: "",
    userId: "",
    providerId: { providerId: "" },
    serviceId: { name: "" },
    address: "",
    scheduledAt: "",
    completeAt: "",
    totalAmount: "",
    advanceAmount: "",
    remainingAmount: "",
    bookingStatus: "Advance-Payment-Pending",
  });

  const handleBookingStatusUpdate = async (action)=>{
    try{
      const booking = await updateBookingStatus(id,action)
      console.log(booking)
      setBooking(booking)
    }
    catch(err){
      console.error(err.message)
    }
  }

  useEffect(() => {
    const getBooking = async () => {
      try {
        const booking = await fetchProviderBooking(id);
        setBooking(booking);
      } catch (err) {
        console.log(err.message);
      }
    };
    getBooking();
  }, [id]);
  return (
    <div className="provider-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 className="heading-3">Job Details</h2>
        {renderBadge()}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        {/* Customer & Request Info Header */}
        <Card elevation="medium">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h3 className="heading-5" style={{ marginBottom: "8px" }}>
                {booking.serviceId.name}
              </h3>
              <p className="body-muted">
                Customer: <strong>{booking.userId.name}</strong>
              </p>
              <p className="body-muted" style={{ marginTop: "4px" }}>
                Address: <strong>{booking.address}</strong>
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p className="body-muted" style={{ fontSize: "12px" }}>
                Booking ID
              </p>
              <p style={{ fontWeight: 600 }}>{booking.bookingId}</p>
              <p
                className="body-muted"
                style={{ fontSize: "12px", marginTop: "8px" }}
              >
                Scheduled Date
              </p>
              <p style={{ fontWeight: 600 }}>
                {booking.scheduledAt.slice(0, 10)}
              </p>
            </div>
          </div>
        </Card>

        {/* Pending Advance Payment Screen */}
        {booking.bookingStatus === "Advance-Payment-Pending" && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Waiting for Advance Payment
            </h3>
            <p className="body-muted" style={{ marginBottom: "16px" }}>
              The customer has accepted your proposal and is required to pay an
              advance deposit to confirm the booking.
            </p>
            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--color-shade-80)",
                borderRadius: "8px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "var(--color-white)",
                  fontWeight: 500,
                }}
              >
                Waiting for customer to pay...
              </p>
            </div>
          </Card>
        )}

        {/* Job Management (Confirmed -> In Progress -> Complete) */}
        {(booking.bookingStatus === "Confirmed" ||
          booking.bookingStatus === "In-Progress" ||
          booking.bookingStatus === "Final-Payment-Pending" ||
          booking.bookingStatus === "Completed") && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Job Execution
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span className="body-muted">Agreed Time</span>
              <span style={{ fontWeight: 500 }}>
                {booking.scheduledAt.slice(0, 10)} at{" "}
                {new Date(booking.scheduledAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <span className="body-muted">Agreed Price</span>
              <span style={{ fontWeight: 500 }}>₹{booking.totalAmount}</span>
            </div>

            {booking.bookingStatus === "Confirmed" && (
              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={()=>handleBookingStatusUpdate("start")}
              >
                Start Service
              </Button>
            )}

            {booking.bookingStatus === "In-Progress" && (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "var(--color-forest)",
                    border: "1px solid var(--color-shade-70)",
                    borderRadius: "8px",
                    marginBottom: "24px",
                  }}
                >
                  <p style={{ color: "var(--color-white)", fontWeight: 500 }}>
                    Service is currently in progress.
                  </p>
                </div>
                <Button
                  variant="primary"
                  style={{ width: "100%" }}
                  onClick={() => handleBookingStatusUpdate("completed")}
                >
                  Mark as Completed
                </Button>
              </div>
            )}

            {(
              booking.bookingStatus === "Final-Payment-Pending") && (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "var(--color-shade-80)",
                  borderRadius: "8px",
                }}
              >
                <h4 className="heading-5" style={{ marginBottom: "8px" }}>
                  Job Completed
                </h4>
                <p className="body-muted">
                  Waiting for the customer to pay the remaining balance of ₹
                  {booking.remainingAmount}.
                </p>
              </div>
            )}

            {booking.bookingStatus === "Completed" && (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "var(--color-forest)",
                  border: "1px solid var(--color-shade-70)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "var(--color-white)", fontWeight: 500 }}>
                  Payment Received. Job Closed.
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Test Dev Controls - Hidden in production */}
        {/* <div
          style={{
            border: "1px dashed #444",
            padding: "8px",
            marginTop: "40px",
          }}
        >
          <p style={{ fontSize: "10px", color: "#888" }}>
            Dev Test Panel (State Trigger):
          </p>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            <button
              onClick={() => setBookingState("PENDING_PAYMENT")}
              style={{ fontSize: "10px" }}
            >
              PENDING_PAYMENT
            </button>
            <button
              onClick={() => setBookingState("CONFIRMED")}
              style={{ fontSize: "10px" }}
            >
              CONFIRMED
            </button>
            <button
              onClick={() => setBookingState("IN_PROGRESS")}
              style={{ fontSize: "10px" }}
            >
              IN_PROGRESS
            </button>
            <button
              onClick={() => setBookingState("FINAL_PAYMENT_PENDING")}
              style={{ fontSize: "10px" }}
            >
              FINAL_PAYMENT
            </button>
            <button
              onClick={() => setBookingState("CLOSED")}
              style={{ fontSize: "10px" }}
            >
              CLOSED
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BookingDetails;
