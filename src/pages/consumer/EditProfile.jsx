import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import imageCompression from "browser-image-compression";
import { updateUser } from "../../services/userService";

const EditConsumerProfile = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { user, profileLoading } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deletedAddresses, setdeletedAddresses] = useState([]);
  const [updating,setUpdating] = useState(false)
  const handleAddAddress = () => {
    if (newTitle.trim() && newAddress.trim()) {
      setAddresses([
        ...addresses,
        {
          id: new Date(),
          title: newTitle,
          address: newAddress,
          isNew: true,
        },
      ]);
      setIsAdding(false);
      setNewTitle("");
      setNewAddress("");
    }
  };

  const handleDeleteAddress = (id, isNew) => {
    if (!isNew) {
      console.log(id);
      setdeletedAddresses((prev) => [...prev, id]);
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } else {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
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
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: compressedFile,
        }));
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value.trim();
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNameChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let combinedName;
    if (key === "firstName") {
      combinedName = `${value} ${lastName}`;
    } else if (key === "lastName") {
      combinedName = `${firstName} ${value}`;
    }
    setFormData((prev) => ({
      ...prev,
      name: combinedName,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true)
    console.log(formData);
    console.log(deletedAddresses);
    console.log(addresses);
    const newAddress = addresses.filter((a) => a.isNew);
    const user = await updateUser(formData, newAddress, deletedAddresses);
    setUser(user);
    setUpdating(false)
    navigate("/consumer/profile");
  };

  useEffect(() => {
    if (user?.savedAddresses) {
      const getAddress = async () => {
        setAddresses(user.savedAddresses);
      };
      getAddress();
    }
    if (user?.name) {
      const getName = async () => {
        const name = user.name.split(" ");

        setFirstName(name[0]);
        setLastName(name[1] || "");
      };
      getName();
    }
  }, [user]);
  if(updating){
     return <div className="loading-state">Updating profile...</div>;
  }
  if (profileLoading) {
    return <div className="loading-state">Loading profile...</div>;
  } else {
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
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div>
              <h3 className="heading-5" style={{ marginBottom: "16px" }}>
                Profile Photo
              </h3>
              <div
                style={{ display: "flex", alignItems: "center", gap: "24px" }}
              >
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
                        fontSize: "24px",
                      }}
                    >
                      {firstName?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    name="profileImage"
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
                    Recommended: Square image, max 50KB.
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                height: "1px",
                backgroundColor: "var(--color-shade-70)",
                margin: "8px 0",
              }}
            ></div>

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
                <Input
                  name="firstName"
                  label="First Name"
                  defaultValue={firstName}
                  onChange={handleNameChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  defaultValue={lastName}
                  onChange={handleNameChange}
                />
                <Input
                  label="Email"
                  defaultValue={user?.email || ""}
                  disabled
                />
                <Input
                  name="phone"
                  label="Phone"
                  defaultValue={user?.phone || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "8px",
              }}
            >
              <Button
                variant="primary"
                type="submit"
                // onClick={() => navigate("/consumer/profile")}
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
              ? addresses.map((a) => (
                  <Card key={a._id || a.id} elevation="subtle">
                    <h5 className="heading-6">{a.title}</h5>
                    <p className="body-muted" style={{ marginTop: "4px" }}>
                      {a.address}
                    </p>
                    <div style={{ marginTop: "12px" }}>
                      {/* <Button variant="ghost" style={{ padding: "4px 8px" }}>
                        Edit
                      </Button> */}
                      <Button
                        variant="ghost"
                        style={{ padding: "4px 8px", color: "#EF4444" }}
                        onClick={() =>
                          handleDeleteAddress(a._id || a.id, a.isNew || false)
                        }
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
