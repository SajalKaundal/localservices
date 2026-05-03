import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import "./ConsumerPages.css";
import { fetchServiceDetails } from "../../services/bookingServices";

const AVAILABLE_SERVICES = [
  { id: "s1", name: "AC Deep Cleaning", price: 45 },
  { id: "s2", name: "AC Gas Refill", price: 85 },
  { id: "s3", name: "Plumbing Fix", price: 120 },
  { id: "s4", name: "Car Wash", price: 25 },
  { id: "s5", name: "Home Cleaning", price: 30 },
];

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
  console.log(`serviceId: ${serviceId} providerId :${providerId} `);
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(
    AVAILABLE_SERVICES[0].id,
  );
  const navigate = useNavigate();

  const selectedService = AVAILABLE_SERVICES.find(
    (s) => s.id === selectedServiceId,
  );

  const handlePaymentAndBook = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you offline?");
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      alert(
        "Razorpay Key is missing! Please add VITE_RAZORPAY_KEY_ID to your .env file.",
      );
      return;
    }

    const options = {
      key: razorpayKey,
      amount: selectedService.price * 100, // amount in smallest currency unit
      currency: "INR",
      name: "LocalServe",
      description: `Payment for ${selectedService.name}`,
      handler: function (response) {
        alert(
          `Payment Successful! Booking Confirmed. Payment ID: ${response.razorpay_payment_id}`,
        );
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
    if (step < 3) setStep(step + 1);
    else handlePaymentAndBook();
  };

  const [services,setServices] = useState([])
  useEffect(()=>{
    const getServices= async()=>{
      try{
        const services= await fetchServiceDetails(serviceId,providerId)
        setServices(services)
      }catch(err){
        console.err(err.message)
      }
    }
    getServices()
  },[serviceId,providerId])
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
                <label
                  className="input-label"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "var(--color-shade-50)",
                  }}
                >
                  Select Service
                </label>
                <select
                  className="input-field focus-ring"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid var(--color-dark-card-border)",
                    background: "var(--color-void)",
                    color: "var(--color-white)",
                    outline: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "16px",
                  }}
                >
                  {services.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} - ₹{s.basePrice}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Location / Address"
                placeholder="123 Main St, Apt 4B"
              />
              <Input
                label="Special Instructions"
                placeholder="Any specific requirements?"
              />
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h4 className="heading-5" style={{ marginBottom: "16px" }}>
                Select Date & Time
              </h4>
              <Input type="date" label="Preferred Date" />
              <Input type="time" label="Preferred Time" />
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h4 className="heading-5" style={{ marginBottom: "16px" }}>
                Review Booking
              </h4>
              <Card elevation="subtle" style={{ marginBottom: "16px" }}>
                <p className="body-muted">
                  Service: <strong>{selectedService.name}</strong>
                </p>
                <p className="body-muted">
                  Provider: <strong>Assigned Expert</strong>
                </p>
                <p className="body-muted">
                  Date: <strong>Selected Schedule</strong>
                </p>
                <hr
                  style={{
                    margin: "12px 0",
                    borderColor: "var(--color-shade-70)",
                  }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Booking Amount</span>
                  <span
                    className="heading-5"
                    style={{ color: "var(--color-neon-green)" }}
                  >
                    ₹{selectedService.price.toFixed(2)}
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
