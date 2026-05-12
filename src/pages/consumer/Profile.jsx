import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
 
  return (
    <div className="consumer-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Profile Settings</h2>
        <Button variant="primary" onClick={() => navigate('/consumer/profile/edit')}>Edit Profile</Button>
      </div>
      
      <Card elevation="medium" style={{marginBottom: '24px'}}>
        <h3 className="heading-5" style={{marginBottom: '16px'}}>Personal Information</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
          <div>
            <p className="body-muted" style={{fontSize: '12px'}}>First Name</p>
            <p style={{fontSize: '16px', color: '#F8FAFC', marginTop: '4px'}}>John</p>
          </div>
          <div>
            <p className="body-muted" style={{fontSize: '12px'}}>Last Name</p>
            <p style={{fontSize: '16px', color: '#F8FAFC', marginTop: '4px'}}>Doe</p>
          </div>
          <div>
            <p className="body-muted" style={{fontSize: '12px'}}>Email</p>
            <p style={{fontSize: '16px', color: '#F8FAFC', marginTop: '4px'}}>john.doe@example.com</p>
          </div>
          <div>
            <p className="body-muted" style={{fontSize: '12px'}}>Phone</p>
            <p style={{fontSize: '16px', color: '#F8FAFC', marginTop: '4px'}}>+1 234 567 8900</p>
          </div>
        </div>
      </Card>

      <Card elevation="medium">
        <h3 className="heading-5" style={{marginBottom: '16px'}}>Saved Addresses</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <Card elevation="subtle">
            <h5 className="heading-6">Home</h5>
            <p className="body-muted" style={{marginTop: '4px'}}>123 Main St, Apt 4B, New York, NY 10001</p>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
