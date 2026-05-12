import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
const Profile = () => {
  const navigate = useNavigate();
  const { user, profileLoading } = useUser();
  if (profileLoading) {
    return <div className="loading-state">Loading requests...</div>;
  } else {
    const name = user.name.split(" ");
    const firstName = name[0];
    const lastName = name[1] || "";
    return (
      <div className="consumer-page">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2 className="heading-3">Profile Settings</h2>
          <Button
            variant="primary"
            onClick={() => navigate("/consumer/profile/edit")}
          >
            Edit Profile
          </Button>
        </div>

        <Card elevation="medium" style={{ marginBottom: "24px" }}>
          <h3 className="heading-5" style={{ marginBottom: "16px" }}>
            Personal Information
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div>
              <p className="body-muted" style={{ fontSize: "12px" }}>
                First Name
              </p>
              <p
                style={{ fontSize: "16px", color: "#F8FAFC", marginTop: "4px" }}
              >
                {firstName}
              </p>
            </div>
            <div>
              <p className="body-muted" style={{ fontSize: "12px" }}>
                Last Name
              </p>
              <p
                style={{ fontSize: "16px", color: "#F8FAFC", marginTop: "4px" }}
              >
                {lastName}
              </p>
            </div>
            <div>
              <p className="body-muted" style={{ fontSize: "12px" }}>
                Email
              </p>
              <p
                style={{ fontSize: "16px", color: "#F8FAFC", marginTop: "4px" }}
              >
                {user.email}
              </p>
            </div>
            <div>
              <p className="body-muted" style={{ fontSize: "12px" }}>
                Phone
              </p>
              <p
                style={{ fontSize: "16px", color: "#F8FAFC", marginTop: "4px" }}
              >
                {user.phone || ""}
              </p>
            </div>
          </div>
        </Card>

        <Card elevation="medium">
          <h3 className="heading-5" style={{ marginBottom: "16px" }}>
            Saved Addresses
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {user.savedAddress?.lenght > 0
              ? user.savedAddress.map((a) => (
                  <Card elevation="subtle">
                    <h5 className="heading-6">{a.title}</h5>
                    <p className="body-muted" style={{ marginTop: "4px" }}>
                      {a.address}
                    </p>
                  </Card>
                ))
              : "No Saved Address"}
          </div>
        </Card>
      </div>
    );
  }
};

export default Profile;
