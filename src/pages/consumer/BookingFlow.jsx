import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import "./ConsumerPages.css";
import { fetchServiceDetails } from "../../services/bookingServices";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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
    price: "",
    address: "",
    scheduledAt: "",
    timeSlot: "",
    notes: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (transactionId) => {
    const finalData = {
      ...formData,
      transactionId,
    };

    console.log("Final Booking Data:", finalData);

    // TODO: Call your backend API here
  };

  const handlePaymentAndBook = async () => {
    if (!selectedService) {
      alert("Please select a service");
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      alert("Missing Razorpay Key in .env");
      return;
    }

    const amount = Math.round(formData.price * 100);

    const options = {
      key: razorpayKey,
      amount,
      currency: "INR",
      name: "LocalServe",
      description: `Payment for ${selectedService.name}`,

      handler: function (response) {
        const transactionId = response.razorpay_payment_id;

        alert(`Payment Successful! Payment ID: ${transactionId}`);

        handleSubmit(transactionId);
        navigate("/consumer/bookings");
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
      },

      theme: {
        color: "#36f4a4",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handlePaymentAndBook();
    }
  };

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
                <label className="input-label">Select Service</label>

                <select
                  className="input-field"
                  value={selectedServiceId}
                  onChange={(e) => {
                    const selected = services.find(
                      (s) => s._id === e.target.value,
                    );

                    if (!selected) return;

                    setFormData((prev) => ({
                      ...prev,
                      service: selected._id,
                      price:
                        selected.pricingType === "hourly"
                          ? selected.basePrice
                          : selected.basePrice * 0.1,
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
                label="Location / Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
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
                label="Preferred Date"
                name="scheduledAt"
                onChange={handleChange}
              />

              <Input
                type="time"
                label="Preferred Time"
                name="timeSlot"
                onChange={handleChange}
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

                <hr />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Booking Amount</span>
                  <span>
                    ₹
                    {selectedService.pricingType === "hourly"
                      ? selectedService.basePrice.toFixed(2)
                      : (selectedService.basePrice * 0.1).toFixed(2)}
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>

        <div
          className="wizard-actions"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div></div>
          )}

          <Button variant="primary" onClick={handleNext}>
            {step === 3 ? "Pay & Book" : "Continue"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookingFlow;
