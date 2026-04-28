import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Profile = () => {
  return (
    <div className="consumer-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Profile Settings</h2>
      
      <Card elevation="medium" style={{marginBottom: '24px'}}>
        <h3 className="heading-5" style={{marginBottom: '16px'}}>Personal Information</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
          <Input label="First Name" defaultValue="John" />
          <Input label="Last Name" defaultValue="Doe" />
          <Input label="Email" defaultValue="john.doe@example.com" />
          <Input label="Phone" defaultValue="+1 234 567 8900" />
        </div>
        <Button variant="primary" style={{marginTop: '16px'}}>Save Changes</Button>
      </Card>

      <Card elevation="medium">
        <h3 className="heading-5" style={{marginBottom: '16px'}}>Saved Addresses</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <Card elevation="subtle">
            <h5 className="heading-6">Home</h5>
            <p className="body-muted" style={{marginTop: '4px'}}>123 Main St, Apt 4B, New York, NY 10001</p>
          </Card>
          <Button variant="secondary" style={{alignSelf: 'flex-start'}}>Add New Address</Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
