import React, { useEffect } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { fetchService, updateService } from "../../services/providerServices";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data based on ID for demonstration
  // const serviceName = id === '1' ? 'AC Deep Cleaning' : 'AC Installation';
  // const rate = id === '1' ? '45.00' : '35.00';
  // const pricingType = id === '1' ? 'Fixed' : 'Hourly';
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    basePrice: "",
    image: "",
    isActive: "",
    pricingType: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateService("69f36e3d65de75f0df8f8e7d", id, formData);
      alert("Data Updated Successfully")
      // setFormData(service);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getService = async () => {
      try {
        const service = await fetchService("69f36e3d65de75f0df8f8e7d", id);
        setFormData(service);
      } catch (err) {
        console.error(err.message);
      }
    };
    getService();
  }, [id]);
  // console.log(formData);
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
        <h2 className="heading-3">Edit Service</h2>
        <Button variant="ghost" onClick={() => navigate("/provider/services")}>
          Back to Services
        </Button>
      </div>

      <Card elevation="medium">
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit}
        >
          <Input
            label="Service Name"
            name="name"
            onChange={handleChange}
            defaultValue={formData.name}
            placeholder="e.g., AC Deep Cleaning"
            fullWidth
          />
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#E2E8F0",
                }}
              >
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                value={formData.category}
                defaultValue={formData.category}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#F8FAFC",
                  fontSize: "15px",
                }}
              >
                <option value="AC Repair">AC Repair</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#E2E8F0",
                }}
              >
                Pricing Type
              </label>
              <select
                name="pricingType"
                onChange={handleChange}
                value={formData.pricingType}
                defaultValue={formData.pricingType}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#F8FAFC",
                  fontSize: "15px",
                }}
              >
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
          </div>
          <Input
            label="Rate (₹)"
            name="basePrice"
            onChange={handleChange}
            defaultValue={formData.basePrice}
            placeholder="e.g., 45.00"
            fullWidth
          />
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#E2E8F0",
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              defaultValue={formData.description}
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#F8FAFC",
                fontSize: "15px",
                minHeight: "100px",
              }}
              placeholder="Describe the service in detail..."
            ></textarea>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "12px",
            }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/provider/services")}
              type="button"
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditService;
