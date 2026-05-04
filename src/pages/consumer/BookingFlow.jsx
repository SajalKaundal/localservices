import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import "./ConsumerPages.css";
import {
  createBooking,
  fetchServiceDetails,
} from "../../services/bookingServices";
import { initiatePayment } from "../../utils/paymentUtils";
import { createOrder } from "../../services/paymentServices";

const BookingFlow = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const providerId = searchParams.get("providerId");

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const selectedService = services.find((s) => s._id === selectedServiceId);

  const [formData, setFormData] = useState({
    provider: providerId,
    service: "",
    address: "",
    scheduledAt: "",
    timeSlot: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (transactionId) => {
    const finalData = {
      ...formData,
      transactionId,
    };
    await createBooking("69f3769965de75f0df8f8eac", finalData);
    console.log("Final Booking Data:", finalData);

    // TODO: Call your backend API here
  };

  const handlePaymentAndBook = async () => {
    if (!selectedService) {
      alert("Please select a service");
      return;
    }

    const booking = await createBooking("69f3769965de75f0df8f8eac", formData);
    console.log(booking)
    const order = await createOrder({
      bookingId: booking._id,
      paymentType: "advance",
    });
    initiatePayment({
      order,
      description: `Payment for ${selectedService.name}`,
      onSuccess: (transactionId) => {
        alert(`Payment Successful! Payment ID: ${transactionId}`);
        handleSubmit(transactionId);
        navigate("/consumer/bookings");
      },
    });
  };

  // const handleNext = () => {
  //   if (step < 3) {
  //     setStep(step + 1);
  //   } else {
  //     handlePaymentAndBook();
  //   }
  // };

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServiceDetails(serviceId, providerId);
        setServices(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getServices();
  }, [serviceId, providerId]);

  return (
    <div
      className="consumer-page"
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >
      <Card
        elevation="medium"
        className="wizard-card"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h2 className="heading-3" style={{ marginBottom: "24px" }}>
          Book a Service
        </h2>
        <div className="wizard-progress">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
            1. Details
          </div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
            2. Schedule
          </div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
            3. Confirm & Pay
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // Step-wise validation
            if (step === 1) {
              if (!formData.service || !formData.address) {
                alert("Please fill all required fields");
                return;
              }
              setStep(2);
            } else if (step === 2) {
              if (!formData.scheduledAt || !formData.timeSlot) {
                alert("Please select date and time");
                return;
              }
              setStep(3);
            } else if (step === 3) {
              handlePaymentAndBook();
            }
          }}
        >
          <div
            className="wizard-content"
            style={{ marginTop: "24px", marginBottom: "32px" }}
          >
            {step === 1 && (
              <div className="step-content">
                <h4 className="heading-5" style={{ marginBottom: "16px" }}>
                  Service Details
                </h4>

                <div className="input-group" style={{ marginBottom: "16px" }}>
                  <label className="input-label">Select Service *</label>

                  <select
                    className="input-field"
                    value={selectedServiceId}
                    required
                    onChange={(e) => {
                      const selected = services.find(
                        (s) => s._id === e.target.value,
                      );

                      if (!selected) return;

                      setFormData((prev) => ({
                        ...prev,
                        service: selected._id,
                      }));

                      setSelectedServiceId(e.target.value);
                    }}
                  >
                    <option value="">Select a service</option>

                    {services.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} - ₹
                        {s.pricingType === "hourly"
                          ? s.basePrice.toFixed(2)
                          : (s.basePrice * 0.1).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Location / Address *"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Special Instructions"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <h4 className="heading-5" style={{ marginBottom: "16px" }}>
                  Select Date & Time
                </h4>

                <Input
                  type="date"
                  label="Preferred Date *"
                  name="scheduledAt"
                  onChange={handleChange}
                  required
                />

                <Input
                  type="time"
                  label="Preferred Time *"
                  name="timeSlot"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {step === 3 && selectedService && (
              <div className="step-content">
                <h4 className="heading-5" style={{ marginBottom: "16px" }}>
                  Review Booking
                </h4>

                <Card elevation="subtle" style={{ marginBottom: "16px" }}>
                  <p>
                    Service: <strong>{selectedService.name}</strong>
                  </p>
                  <p>
                    Date: <strong>{formData.scheduledAt}</strong>
                  </p>

                  <hr
                    style={{
                      margin: "12px 0",
                      borderColor: "var(--color-dark-card-border)",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span className="body-muted">Total Estimated Cost</span>
                    <span>
                      ₹{selectedService.basePrice.toFixed(2)}
                      {selectedService.pricingType === "hourly" ? " / hr" : ""}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span className="body-muted">
                      Deposit Required (
                      {selectedService.pricingType === "hourly"
                        ? "1st Hour"
                        : "10%"}
                      )
                    </span>
                    <span>
                      ₹
                      {selectedService.pricingType === "hourly"
                        ? selectedService.basePrice.toFixed(2)
                        : (selectedService.basePrice * 0.1).toFixed(2)}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px dashed var(--color-dark-card-border)",
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>Pay Now</span>
                    <span
                      className="heading-5"
                      style={{ color: "var(--color-neon-green)" }}
                    >
                      ₹
                      {selectedService.pricingType === "hourly"
                        ? selectedService.basePrice.toFixed(2)
                        : (selectedService.basePrice * 0.1).toFixed(2)}
                    </span>
                  </div>
                </Card>
                <p
                  className="body-muted"
                  style={{ fontSize: "12px", textAlign: "center" }}
                >
                  The remaining balance will be due after the service is
                  completed.
                </p>
              </div>
            )}
          </div>

          <div
            className="wizard-actions"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {step > 1 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}

            <Button type="submit" variant="primary">
              {step === 3 ? "Pay & Book" : "Continue"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BookingFlow;
