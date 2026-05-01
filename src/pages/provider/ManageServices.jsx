import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { deleteService, fetchServices } from "../../services/providerServices";

const ManageServices = () => {

  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  const onDelete = async (sid) => {
    try {
      await deleteService("69f36e3d65de75f0df8f8e7d", sid);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getServices = async () => {
      try {
        const services = await fetchServices("69f36e3d65de75f0df8f8e7d");
        setServices(services);
      } catch (err) {
        console.error(err.message);
      }
    };

    getServices();
  }, []);

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
        <h2 className="heading-3">Manage Services</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/provider/services/add")}
        >
          Add New Service
        </Button>
      </div>

      <Card elevation="medium">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Pricing Type</th>
              <th>Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => {
              return (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.category}</td>
                  <td>{s.pricingType}</td>
                  <td>{`₹${s.basePrice}${s.pricingType === "hourly" ? " /hr" : ""}`}</td>
                  <td>
                    <Button
                      variant="ghost"
                      style={{ padding: "4px 8px" }}
                      onClick={() => navigate(`/provider/services/edit/${s._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      style={{ padding: "4px 8px", color: "#EF4444" }}
                      onClick={() => onDelete(s._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
            {/* <tr>
              <td>ACInstallation</td>
              <td>AC Repair</td>
              <td>Hourly</td>
              <td>₹35.00 / hr</td>
              <td>
                <Button
                  variant="ghost"
                  style={{ padding: "4px 8px" }}
                  onClick={() => navigate("/provider/services/edit/2")}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  style={{ padding: "4px 8px", color: "#EF4444" }}
                >
                  Delete
                </Button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManageServices;
