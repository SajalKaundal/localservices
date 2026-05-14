import React, { useState, useRef } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import imageCompression from "browser-image-compression";
import { updateProvider } from "../../services/providerServices";

const EditProviderProfile = () => {
  const navigate = useNavigate();
  const { user, profileLoading, setUser } = useUser();

  const fileInputRef = useRef(null);
  const portfolioInputRef = useRef(null);

  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  const [newPortfolioImages, setNewPortfolioImages] = useState([]);

  const [deletedPortfolioImageIds, setDeletedPortfolioImageIds] = useState([]);

  const [portfolio, setPortfolio] = useState(user?.portfolio || []);

  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    experience: user?.experience || "",
    pricePerHour: user?.pricePerHour || "",
    bio:
      user?.bio ||
      "We provide top-notch services. Our verified experts are here to help.",
  });

  const [updating,setUpdating] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 0.05,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        setProfileImage(compressedFile);

        const imageUrl = await convertToBase64(compressedFile);

        setProfileImagePreview(imageUrl);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handlePortfolioUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      try {
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFiles = await Promise.all(
          files.map((file) => imageCompression(file, options)),
        );

        const previewImages = await Promise.all(
          compressedFiles.map((file) => convertToBase64(file)),
        );

        const formattedImages = compressedFiles.map((file, index) => ({
          file,
          preview: previewImages[index],
          isNew: true,
        }));

        setNewPortfolioImages((prev) => [...prev, ...compressedFiles]);

        setPortfolio((prev) => [...prev, ...formattedImages]);
      } catch (error) {
        console.error("Error uploading portfolio photos:", error);
      }
    }
  };

  const handleDeletePhoto = (index) => {
    const image = portfolio[index];

    if (image?._id) {
      setDeletedPortfolioImageIds((prev) => [...prev, image._id]);
    }

    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true)

  try {
    const data = await updateProvider({
      formData,
      profileImage,
      newPortfolioImages,
      deletedPortfolioImageIds,
      isAvailable,
    });

    console.log(data);
    setUser(data.provider)
    setUpdating(false)
    navigate("/provider/profile");
  } catch (error) {
    console.error(error.message);
  }
};
  if (profileLoading) {
    return <div className="loading-state">Loading profile...</div>;
  }
  if (updating) {
    return <div className="loading-state">Updating profile...</div>;
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

          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "24px" }}>
              Profile Photo
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
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
                  style={{
                    fontSize: "12px",
                    marginTop: "8px",
                  }}
                >
                  Recommended: Square image, max 50KB.
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
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <Input label="Email" defaultValue={user?.email || ""} disabled />

              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label="Years of Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />

              <Input
                label="Price Per Hour (₹)"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleChange}
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
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="input-field focus-ring"
                rows="4"
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
              />
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Portfolio
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {portfolio.map((photo, index) => (
                <div
                  key={index}
                  style={{
                    aspectRatio: "1",
                    backgroundColor: "var(--color-dark-forest)",
                    borderRadius: "8px",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid var(--color-shade-70)",
                  }}
                >
                  <img
                    src={photo?.preview || photo?.url}
                    alt={`Portfolio ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <button
                    onClick={() => handleDeletePhoto(index)}
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      backgroundColor: "rgba(255, 0, 0, 0.7)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      zIndex: 2,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {portfolio.length === 0 && (
                <>
                  <div
                    style={{
                      aspectRatio: "1",
                      backgroundColor: "var(--color-dark-forest)",
                      borderRadius: "8px",
                      border: "2px dashed var(--color-shade-70)",
                    }}
                  />

                  <div
                    style={{
                      aspectRatio: "1",
                      backgroundColor: "var(--color-dark-forest)",
                      borderRadius: "8px",
                      border: "2px dashed var(--color-shade-70)",
                    }}
                  />
                </>
              )}
            </div>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={portfolioInputRef}
              style={{ display: "none" }}
              onChange={handlePortfolioUpload}
            />

            {portfolio.length < 4 && (
              <Button
                variant="secondary"
                style={{ width: "100%" }}
                onClick={() => portfolioInputRef.current?.click()}
              >
                Add Photos
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProviderProfile;
