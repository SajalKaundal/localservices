import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { initiatePayment } from "../../utils/paymentUtils";
import "./ConsumerPages.css";
import { fetchUserBooking } from "../../services/bookingServices";
import { createOrder } from "../../services/paymentServices";
import { submitReview } from "../../services/reviewServices";

const BookingDetails = () => {
  // const [searchParams] = useSearchParams();
  // const initialStatus = searchParams.get("status");

  const { id } = useParams();

  // const [bookingState, setBookingState] = useState(
  //   initialStatus || "Confirmed",
  // );

  const [bookingData, setBookingData] = useState({
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
    hasReviewed: false,
  });

  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.comment) return alert("Please enter a comment");
    try {
      setIsSubmittingReview(true);
      await submitReview({
        bookingId: id,
        providerId: bookingData.providerId._id || bookingData.providerId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      setReviewSubmitted(true);
      alert("Review submitted successfully!");
    } catch (err) {
      alert(err.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleAdvancePayment = async () => {
    const order = await createOrder(id);
    initiatePayment({
      order,
      description: `Advance Deposit for ${bookingData.serviceId.name}`,
      onSuccess: (txId) => {
        alert(`Payment successful! ID: ${txId}`);
        // setBookingData((prev) => ({
        //   ...prev,
        //   bookingStatus: "Confirmed",
        // }));
      },
    });
  };

  const handleFinalPayment = async () => {
    const order = await createOrder(id);

    initiatePayment({
      order,
      description: `Remaining Balance for ${bookingData.serviceId.name}`,
      onSuccess: (txId) => {
        alert(`Payment successful! ID: ${txId}`);
        // setBookingData((prev) => ({
        //   ...prev,
        //   bookingStatus: "Completed",
        // }));
      },
    });
  };

  const renderBadge = () => {
    switch (bookingData.bookingStatus) {
      case "Advance-Payment-Pending":
        return <Badge>Pending Payment</Badge>;

      case "Confirmed":
        return <Badge>Confirmed</Badge>;

      case "In-Progress":
        return <Badge>In Progress</Badge>;

      case "Final-Payment-Pending":
        return <Badge>Final Payment Pending</Badge>;

      case "Completed":
        return <Badge>Completed</Badge>;

      case "Cancelled":
        return <Badge>Cancelled</Badge>;

      default:
        return null;
    }
  };

  useEffect(() => {
    const getBooking = async () => {
      try {
        const booking = await fetchUserBooking(id);
        setBookingData(booking);
      } catch (err) {
        console.error(err.message);
      }
    };
    getBooking();

    const interval = setInterval(getBooking, 3000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="consumer-page">
      <div className="booking-details-header">
        <h2 className="heading-3">Booking Tracker</h2>
        {renderBadge()}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "24px",
        }}
      >
        {/* Service Header */}
        <Card elevation="medium">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 className="heading-5" style={{ marginBottom: "8px" }}>
                {bookingData.serviceId.name}
              </h3>

              <p className="body-muted">
                Provider: <strong>{bookingData.providerId.name}</strong>
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <p className="body-muted" style={{ fontSize: "12px" }}>
                Booking ID
              </p>

              <p style={{ fontWeight: 600 }}>{bookingData.bookingId}</p>
            </div>
          </div>
        </Card>

        {/* Pending Payment */}
        {bookingData.bookingStatus === "Advance-Payment-Pending" && (
          <Card
            elevation="medium"
            style={{
              border: "1px solid var(--color-shade-70)",
            }}
          >
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Advance Payment Required
            </h3>

            <p className="body-muted" style={{ marginBottom: "16px" }}>
              Please pay the advance payment to confirm booking.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>Total Price</span>
              <span>₹{bookingData.totalAmount}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span>Advance Payment</span>

              <span style={{ fontWeight: "bold" }}>
                ₹{bookingData.advanceAmount}
              </span>
            </div>

            <Button
              variant="primary"
              style={{ width: "100%" }}
              onClick={handleAdvancePayment}
            >
              Pay Now
            </Button>
          </Card>
        )}

        {/* Timeline */}
        {(bookingData.bookingStatus === "Confirmed" ||
          bookingData.bookingStatus === "In-Progress" ||
          bookingData.bookingStatus === "Final-Payment-Pending" ||
          bookingData.bookingStatus === "Completed") && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Booking Timeline
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                position: "relative",
                paddingLeft: "24px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "7px",
                  top: "10px",
                  bottom: "10px",
                  width: "2px",
                  backgroundColor: "var(--color-shade-70)",
                }}
              />

              {/* Confirmed */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-22px",
                    top: "4px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-neon-green)",
                  }}
                />

                <p style={{ fontWeight: "500" }}>Booking Confirmed</p>

                <span className="body-muted" style={{ fontSize: "12px" }}>
                  Scheduled for{" "}
                  {new Date(bookingData.scheduledAt).toLocaleDateString()} at{" "}
                  {new Date(bookingData.scheduledAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* In Progress */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-22px",
                    top: "4px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      bookingData.bookingStatus === "In-Progress" ||
                      bookingData.bookingStatus === "Final-Payment-Pending" ||
                      bookingData.bookingStatus === "Completed"
                        ? "var(--color-neon-green)"
                        : "var(--color-void)",

                    border:
                      bookingData.bookingStatus === "In-Progress" ||
                      bookingData.bookingStatus === "Final-Payment-Pending" ||
                      bookingData.bookingStatus === "Completed"
                        ? "none"
                        : "2px solid var(--color-shade-50)",
                  }}
                />

                <p
                  style={{
                    color:
                      bookingData.bookingStatus === "In-Progress" ||
                      bookingData.bookingStatus === "Final-Payment-Pending" ||
                      bookingData.bookingStatus === "Completed"
                        ? "white"
                        : "var(--color-shade-50)",
                  }}
                >
                  Service In Progress
                </p>
              </div>

              {/* Final Payment Pending */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-22px",
                    top: "4px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      bookingData.bookingStatus === "Final-Payment-Pending" ||
                      bookingData.bookingStatus === "Completed"
                        ? "var(--color-neon-green)"
                        : "var(--color-void)",

                    border:
                      bookingData.bookingStatus === "Final-Payment-Pending" ||
                      bookingData.bookingStatus === "Completed"
                        ? "none"
                        : "2px solid var(--color-shade-50)",
                  }}
                />

                <p
                  style={{
                    color:
                      bookingData.bookingStatus === "Final-Payment-Pending" ||
                      bookingData.bookingStatus === "Completed"
                        ? "white"
                        : "var(--color-shade-50)",
                  }}
                >
                  Final Payment Pending
                </p>
              </div>

              {/* Completed */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-22px",
                    top: "4px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      bookingData.bookingStatus === "Completed"
                        ? "var(--color-neon-green)"
                        : "var(--color-void)",

                    border:
                      bookingData.bookingStatus === "Completed"
                        ? "none"
                        : "2px solid var(--color-shade-50)",
                  }}
                />

                <p
                  style={{
                    color:
                      bookingData.bookingStatus === "Completed"
                        ? "white"
                        : "var(--color-shade-50)",
                  }}
                >
                  Booking Completed
                </p>
              </div>
            </div>

            {/* Actions */}
            {bookingData.bookingStatus === "Confirmed" && (
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <Button variant="ghost" style={{ flex: 1 }}>
                  Contact Provider
                </Button>

                <Button
                  variant="ghost"
                  style={{
                    flex: 1,
                    color: "#EF4444",
                  }}
                >
                  Cancel Booking
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Final Payment */}
        {bookingData.bookingStatus === "Final-Payment-Pending" && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Final Payment
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>Total Price</span>
              <span>₹{bookingData.totalAmount}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>Advance Paid</span>

              <span>- ₹{bookingData.advanceAmount}</span>
            </div>

            <hr
              style={{
                margin: "12px 0",
                borderColor: "var(--color-shade-70)",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: "500" }}>Remaining Amount</span>

              <span className="heading-5">₹{bookingData.remainingAmount}</span>
            </div>

            <Button
              variant="primary"
              style={{
                width: "100%",
                marginTop: "24px",
              }}
              onClick={handleFinalPayment}
            >
              Pay Remaining Amount
            </Button>
          </Card>
        )}

        {/* Completed */}
        {bookingData.bookingStatus === "Completed" && (
          <Card elevation="medium">
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: "var(--color-forest)",
              }}
            >
              <h3 className="heading-5" style={{ marginBottom: "8px" }}>
                Booking Completed
              </h3>

              <p className="body-muted">All payments completed successfully.</p>
            </div>

            {!reviewSubmitted && !bookingData.hasReviewed ? (
              <div style={{ marginTop: "24px", borderTop: "1px solid var(--color-dark-card-border)", paddingTop: "16px" }}>
                <h4 className="heading-5" style={{ marginBottom: "16px" }}>Leave a Review</h4>
                <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "var(--color-shade-50)" }}>Rating</label>
                    <select 
                      value={reviewData.rating}
                      onChange={(e) => setReviewData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "#FFFFFF",
                        border: "1px solid #3F3F46",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        outline: "none",
                      }}
                    >
                      <option value="5" style={{color: "#000"}}>5 Stars - Excellent</option>
                      <option value="4" style={{color: "#000"}}>4 Stars - Good</option>
                      <option value="3" style={{color: "#000"}}>3 Stars - Average</option>
                      <option value="2" style={{color: "#000"}}>2 Stars - Poor</option>
                      <option value="1" style={{color: "#000"}}>1 Star - Terrible</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "var(--color-shade-50)" }}>Comment</label>
                    <textarea 
                      required
                      value={reviewData.comment}
                      onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                      placeholder="Share your experience..."
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "#FFFFFF",
                        border: "1px solid #3F3F46",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        outline: "none",
                        fontFamily: "inherit",
                        resize: "vertical"
                      }}
                    />
                  </div>
                  <Button type="submit" variant="primary" disabled={isSubmittingReview}>
                    {isSubmittingReview ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </div>
            ) : (
              <div style={{ marginTop: "24px", padding: "16px", borderRadius: "8px", backgroundColor: "rgba(54, 244, 164, 0.1)", textAlign: "center" }}>
                <p style={{ color: "var(--color-neon-green)" }}>Thank you for your review!</p>
              </div>
            )}
          </Card>
        )}

        {/* Cancelled */}
        {bookingData.bookingStatus === "Cancelled" && (
          <Card elevation="medium">
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                textAlign: "center",
                border: "1px solid #EF4444",
              }}
            >
              <h3
                className="heading-5"
                style={{
                  marginBottom: "8px",
                  color: "#EF4444",
                }}
              >
                Booking Cancelled
              </h3>

              <p className="body-muted">This booking has been cancelled.</p>
            </div>
          </Card>
        )}

        {/* Dev Panel */}
        {/* <div
          style={{
            border: "1px dashed #444",
            padding: "8px",
            marginTop: "40px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              color: "#888",
            }}
          >
            Dev Test Panel
          </p>

          <div
            style={{
              display: "flex",
              gap: "4px",
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => setBookingState("Advance-Payment-Pending")}>
              Advance-Payment-Pending
            </button>

            <button onClick={() => setBookingState("Confirmed")}>
              Confirmed
            </button>

            <button onClick={() => setBookingState("In-Progress")}>
              In-Progress
            </button>

            <button onClick={() => setBookingState("Final-Payment-Pending")}>
              Final-Payment-Pending
            </button>

            <button onClick={() => setBookingState("Completed")}>
              Completed
            </button>

            <button onClick={() => setBookingState("Cancelled")}>
              Cancelled
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BookingDetails;
