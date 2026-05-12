import React, { useState, useRef } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import imageCompression from "browser-image-compression";

const EditProviderProfile = () => {
  const navigate = useNavigate();
  const { user, profileLoading } = useUser();
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.05, // 50 KB
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const imageUrl = URL.createObjectURL(compressedFile);
        setProfileImagePreview(imageUrl);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  if (profileLoading) {
    return <div className="loading-state">Loading profile...</div>;
  }

  const currentImage = profileImagePreview || user?.profileImage;
  const nameInitial = user?.name?.charAt(0) || "P";

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
        <h2 className="heading-3">Edit Profile</h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button variant="ghost" onClick={() => navigate("/provider/profile")}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/provider/profile")}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "24px" }}>
              Profile Photo
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-dark-forest)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--color-shade-70)",
                }}
              >
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      color: "var(--color-shade-50)",
                      fontSize: "32px",
                      fontWeight: "500",
                    }}
                  >
                    {nameInitial}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Photo
                </Button>
                <p
                  className="body-muted"
                  style={{ fontSize: "12px", marginTop: "8px" }}
                >
                  Recommended: Square image, max 2MB.
                </p>
              </div>
            </div>
          </Card>

          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Public Information
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <Input
                label="Provider Name / Business Name"
                defaultValue={user?.name || ""}
              />
              <Input label="Email" defaultValue={user?.email || ""} disabled />
              <Input label="Phone Number" defaultValue={user?.phone || ""} />
              <Input
                label="Years of Experience"
                defaultValue={user?.experience || ""}
              />
              <Input
                label="Price Per Hour (₹)"
                defaultValue={user?.pricePerHour || ""}
                type="number"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <label className="input-label">Bio</label>
              <textarea
                className="input-field focus-ring"
                rows="4"
                defaultValue={
                  user?.bio ||
                  "We provide top-notch services. Our verified experts are here to help."
                }
                style={{
                  resize: "vertical",
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "var(--color-dark-forest)",
                  border: "1px solid var(--color-shade-70)",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "15px",
                }}
              ></textarea>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                backgroundColor: "var(--color-dark-forest)",
                borderRadius: "8px",
                border: "1px solid var(--color-shade-70)",
              }}
            >
              <div>
                <h4
                  style={{
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBottom: "4px",
                  }}
                >
                  Availability Status
                </h4>

                <p className="body-muted" style={{ fontSize: "13px" }}>
                  Toggle to show if you are currently taking new requests.
                </p>
              </div>

              <label
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "52px",
                  height: "30px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={() => setIsAvailable((prev) => !prev)}
                  style={{
                    opacity: 0,
                    width: 0,
                    height: 0,
                    position: "absolute",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: isAvailable
                      ? "var(--color-neon-green)"
                      : "var(--color-shade-60)",
                    borderRadius: "999px",
                    transition: "0.25s",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    height: "24px",
                    width: "24px",
                    left: isAvailable ? "26px" : "3px",
                    top: "3px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "50%",
                    transition: "0.25s",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  }}
                />
              </label>
            </div>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Certifications
            </h3>
            <ul
              style={{
                marginBottom: "16px",
                color: "var(--color-shade-30)",
                fontSize: "14px",
                lineHeight: "2",
              }}
            >
              <li>✓ HVAC Certified (2020)</li>
              <li>✓ EPA Section 608</li>
            </ul>
            <Button variant="secondary" style={{ width: "100%" }}>
              Upload Certificate
            </Button>
          </Card>

          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Portfolio
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  aspectRatio: "1",
                  backgroundColor: "var(--color-dark-forest)",
                  borderRadius: "8px",
                }}
              ></div>
              <div
                style={{
                  aspectRatio: "1",
                  backgroundColor: "var(--color-dark-forest)",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
            <Button variant="secondary" style={{ width: "100%" }}>
              Add Photos
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProviderProfile;
