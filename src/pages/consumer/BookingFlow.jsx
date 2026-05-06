import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import "./ConsumerPages.css";
import {
  fetchServiceDetails,
} from "../../services/bookingServices";
import { createRequest } from "../../services/requestService";

const BookingFlow = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const providerId = searchParams.get("providerId");

  const navigate = useNavigate();
  const { userRole } = useAuth();

  useEffect(() => {
    if (!userRole) {
      alert("Please login to access the booking flow");
      navigate("/auth");
    }
  }, [userRole, navigate]);

  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const selectedService = services.find((s) => s._id === selectedServiceId);

  const [formData, setFormData] = useState({
    provider: providerId,
    service: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendRequest = async () => {
    if (!selectedService) {
      alert("Please select a service");
      return;
    }

    try {

      const startTime = new Date(
        `${formData.preferredDate}T${formData.preferredTime}:00`,
      ).toISOString();

      const finalData = {
        userId: "69f3769965de75f0df8f8eac",
        serviceId: formData.service,
        providerId: formData.provider,
        address: formData.address,
        description: formData.notes,
        startTime,
      };

       const data=await createRequest(finalData)
      if(data){
        alert("Request sent to provider! Awaiting their proposal.");
      }
      navigate("/consumer/requests"); // Navigate to the new requests hub
    } catch (error) {
      console.error(error);
      alert("Failed to send request.");
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
    console.log(formData);
    getServices();
  }, [serviceId, providerId, formData]);

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
          Create Booking Request
        </h2>
        <div className="wizard-progress">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
            1. Details
          </div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
            2. Schedule
          </div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
            3. Review & Request
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
              setStep(3);
            } else if (step === 3) {
              handleSendRequest();
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
                  label="Special Instructions (Optional)"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <h4 className="heading-5" style={{ marginBottom: "16px" }}>
                  Preferred Date & Time
                </h4>
                <p
                  className="body-muted"
                  style={{ marginBottom: "16px", fontSize: "14px" }}
                >
                  These are preferred times. The provider will confirm or
                  propose a new time slot based on availability.
                </p>

                <Input
                  type="date"
                  label="Preferred Date (Optional)"
                  name="preferredDate"
                  onChange={handleChange}
                />

                <Input
                  type="time"
                  label="Preferred Time (Optional)"
                  name="preferredTime"
                  onChange={handleChange}
                />
              </div>
            )}

            {step === 3 && selectedService && (
              <div className="step-content">
                <h4 className="heading-5" style={{ marginBottom: "16px" }}>
                  Review Request
                </h4>

                <Card elevation="subtle" style={{ marginBottom: "16px" }}>
                  <p>
                    Service: <strong>{selectedService.name}</strong>
                  </p>
                  <p>
                    Preferred Date:{" "}
                    <strong>{formData.scheduledAt || "Flexible"}</strong>
                  </p>
                  <p>
                    Preferred Time:{" "}
                    <strong>{formData.timeSlot || "Flexible"}</strong>
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
                    <span className="body-muted">Base Rate</span>
                    <span>
                      ₹{selectedService.basePrice.toFixed(2)}
                      {selectedService.pricingType === "hourly" ? " / hr" : ""}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px dashed var(--color-dark-card-border)",
                    }}
                  >
                    <p className="body-muted" style={{ fontSize: "13px" }}>
                      <strong style={{ color: "var(--color-white)" }}>
                        Next Step:
                      </strong>{" "}
                      You will receive a final price and time proposal from the
                      provider. You will only pay the advance deposit after
                      accepting their proposal.
                    </p>
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
              {step === 3 ? "Send Request" : "Continue"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BookingFlow;
