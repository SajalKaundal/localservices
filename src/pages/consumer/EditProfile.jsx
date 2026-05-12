import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import imageCompression from 'browser-image-compression';

const EditConsumerProfile = () => {
  const navigate = useNavigate();
  const { user, profileLoading } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleAddAddress = () => {
    if (newTitle.trim() && newAddress.trim()) {
      setAddresses([
        ...addresses,
        { id: Date.now(), title: newTitle, address: newAddress },
      ]);
      setIsAdding(false);
      setNewTitle("");
      setNewAddress("");
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

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

  useEffect(() => {
    if (user?.savedAddress) {
      setAddresses(user.savedAddress);
    }
  }, [user]);

  if (profileLoading) {
    return <div className="loading-state">Loading requests...</div>;
  } else {
    const name = user?.name?.split(" ") || ["", ""];
    const firstName = name[0];
    const lastName = name[1] || "";
    const currentImage = profileImagePreview || user?.profileImage;

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
          <h2 className="heading-3">Edit Profile</h2>
          <Button variant="ghost" onClick={() => navigate("/consumer/profile")}>
            Cancel
          </Button>
        </div>

        <Card elevation="medium" style={{ marginBottom: "24px" }}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div>
              <h3 className="heading-5" style={{ marginBottom: "16px" }}>
                Profile Photo
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div 
                  style={{
                    width: "80px", 
                    height: "80px", 
                    borderRadius: "50%", 
                    backgroundColor: "var(--color-dark-forest)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--color-shade-70)"
                  }}
                >
                  {currentImage ? (
                    <img src={currentImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ color: "var(--color-shade-50)", fontSize: "24px" }}>
                      {firstName?.charAt(0) || "U"}
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
                  <p className="body-muted" style={{ fontSize: "12px", marginTop: "8px" }}>
                    Recommended: Square image, max 50KB.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ height: "1px", backgroundColor: "var(--color-shade-70)", margin: "8px 0" }}></div>

            <div>
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
                <Input label="First Name" defaultValue={firstName} />
                <Input label="Last Name" defaultValue={lastName} />
                <Input label="Email" defaultValue={user?.email || ""} disabled />
                <Input label="Phone" defaultValue={user?.phone || ""} />
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <Button
                variant="primary"
                type="button"
                onClick={() => navigate("/consumer/profile")}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

        <Card elevation="medium">
          <h3 className="heading-5" style={{ marginBottom: "16px" }}>
            Saved Addresses
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {addresses.length > 0
              ? addresses.map((addr) => (
                  <Card key={addr._id} elevation="subtle">
                    <h5 className="heading-6">{addr.title}</h5>
                    <p className="body-muted" style={{ marginTop: "4px" }}>
                      {addr.address}
                    </p>
                    <div style={{ marginTop: "12px" }}>
                      <Button variant="ghost" style={{ padding: "4px 8px" }}>
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        style={{ padding: "4px 8px", color: "#EF4444" }}
                        onClick={() => handleDeleteAddress(addr._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
              : "No Saved Address"}

            {isAdding ? (
              <Card
                elevation="subtle"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  border: "1px dashed var(--color-shade-50)",
                }}
              >
                <h5 className="heading-6">Add New Address</h5>
                <Input
                  placeholder="Title (e.g., Office)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <Input
                  placeholder="Full Address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddAddress}
                  >
                    Save Address
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            ) : (
              <Button
                variant="secondary"
                type="button"
                style={{ alignSelf: "flex-start" }}
                onClick={() => setIsAdding(true)}
              >
                Add New Address
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }
};

export default EditConsumerProfile;
