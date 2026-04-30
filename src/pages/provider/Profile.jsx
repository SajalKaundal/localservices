import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const ProviderProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="provider-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Profile Management</h2>
        <Button variant="primary" onClick={() => navigate('/provider/profile/edit')}>Edit Profile</Button>
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px'}}>
        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Public Information</h3>
          
          <div style={{marginBottom: '16px'}}>
            <p className="body-muted" style={{fontSize: '12px'}}>Business Name</p>
            <p style={{fontSize: '16px', color: '#F8FAFC', marginTop: '4px'}}>CoolBreeze AC</p>
          </div>
          
          <div style={{marginBottom: '16px'}}>
            <p className="body-muted" style={{fontSize: '12px'}}>Bio</p>
            <p style={{fontSize: '14px', color: '#F8FAFC', lineHeight: '1.5', marginTop: '4px'}}>We provide top-notch air conditioning services. Whether you need a deep clean, gas refill, or full installation, our verified experts are here to help.</p>
          </div>
          
          <div>
            <p className="body-muted" style={{fontSize: '12px'}}>Years of Experience</p>
            <p style={{fontSize: '16px', color: '#F8FAFC', marginTop: '4px'}}>5</p>
          </div>
        </Card>

        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Certifications</h3>
            <ul style={{color: 'var(--color-shade-30)', fontSize: '14px', lineHeight: '2'}}>
              <li>✓ HVAC Certified (2020)</li>
              <li>✓ EPA Section 608</li>
            </ul>
          </Card>

          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Portfolio</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
              <div style={{aspectRatio: '1', backgroundColor: 'var(--color-dark-forest)', borderRadius: '8px'}}></div>
              <div style={{aspectRatio: '1', backgroundColor: 'var(--color-dark-forest)', borderRadius: '8px'}}></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
