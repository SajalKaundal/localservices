import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const ProviderProfile = () => {
  const navigate = useNavigate();
  const { user, profileLoading } = useUser();

  if (profileLoading) {
    return <div className="loading-state">Loading profile...</div>;
  }

  const nameInitial = user?.name?.charAt(0) || "P";
  const profileImage = user?.profileImage;

  return (
    <div className="provider-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Profile Management</h2>
        <Button variant="primary" onClick={() => navigate('/provider/profile/edit')}>Edit Profile</Button>
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <Card elevation="medium" style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
            <div 
              style={{
                width: "120px", 
                height: "120px", 
                borderRadius: "50%", 
                backgroundColor: "var(--color-dark-forest)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--color-shade-70)",
                flexShrink: 0
              }}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ color: "var(--color-shade-50)", fontSize: "40px", fontWeight: "500" }}>
                  {nameInitial}
                </span>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h3 className="heading-4" style={{ marginBottom: '4px' }}>{user?.name || "Provider Name"}</h3>
                  <p className="body-muted" style={{ fontSize: '14px' }}>{user?.email || "No email provided"}</p>
                  <p className="body-muted" style={{ fontSize: '14px', marginTop: '2px' }}>{user?.phone || "No phone provided"}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  {user?.isAvailable ? (
                    <span style={{ backgroundColor: 'rgba(54, 244, 164, 0.1)', color: 'var(--color-neon-green)', padding: '4px 12px', borderRadius: '9999px', fontSize: '13px', fontWeight: '500', border: '1px solid rgba(54, 244, 164, 0.2)' }}>
                      Available
                    </span>
                  ) : (
                    <span style={{ backgroundColor: 'var(--color-shade-70)', color: 'var(--color-shade-30)', padding: '4px 12px', borderRadius: '9999px', fontSize: '13px', fontWeight: '500', border: '1px solid var(--color-shade-60)' }}>
                      Unavailable
                    </span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#F59E0B', fontSize: '16px' }}>★</span>
                    <span style={{ color: '#F8FAFC', fontWeight: '500' }}>{user?.rating || "New"}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '20px'}}>Professional Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <p className="body-muted" style={{fontSize: '13px', marginBottom: '4px'}}>Years of Experience</p>
                <p style={{fontSize: '18px', color: '#F8FAFC', fontWeight: '500'}}>{user.experience || "0"}</p>
              </div>
              <div>
                <p className="body-muted" style={{fontSize: '13px', marginBottom: '4px'}}>Price Per Hour</p>
                <p style={{fontSize: '18px', color: 'var(--color-neon-green)', fontWeight: '500'}}>₹{user?.pricePerHour || "0"}</p>
              </div>
            </div>

            <div>
              <p className="body-muted" style={{fontSize: '13px', marginBottom: '8px'}}>Bio</p>
              <p style={{fontSize: '15px', color: '#F8FAFC', lineHeight: '1.6'}}>
                {user?.bio || "No bio provided. Update your profile to add a description of your services."}
              </p>
            </div>
          </Card>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          {/* <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Certifications</h3>
            <ul style={{color: 'var(--color-shade-30)', fontSize: '14px', lineHeight: '2'}}>
              <li>✓ HVAC Certified (2020)</li>
              <li>✓ EPA Section 608</li>
            </ul>
          </Card> */}

          <Card elevation="medium">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Portfolio
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {user.portfolio && user.portfolio.length > 0 ? (
                user.portfolio.map((photo, index) => (
                  <div
                    key={index}
                    style={{
                      aspectRatio: "1",
                      backgroundColor: "var(--color-dark-forest)",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid var(--color-shade-70)",
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={`Portfolio ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))
              ) : (
                <>
                  <div
                    style={{
                      aspectRatio: "1",
                      backgroundColor: "var(--color-dark-forest)",
                      borderRadius: "8px",
                      border: "1px solid var(--color-shade-70)",
                    }}
                  ></div>
                  <div
                    style={{
                      aspectRatio: "1",
                      backgroundColor: "var(--color-dark-forest)",
                      borderRadius: "8px",
                      border: "1px solid var(--color-shade-70)",
                    }}
                  ></div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
