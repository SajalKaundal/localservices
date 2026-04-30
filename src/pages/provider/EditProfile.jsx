import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const EditProviderProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="provider-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Edit Profile</h2>
        <Button variant="ghost" onClick={() => navigate('/provider/profile')}>Cancel</Button>
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px'}}>
        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Public Information</h3>
          <Input label="Business Name" defaultValue="CoolBreeze AC" />
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px'}}>
            <label className="input-label">Bio</label>
            <textarea 
              className="input-field focus-ring" 
              rows="4" 
              defaultValue="We provide top-notch air conditioning services. Whether you need a deep clean, gas refill, or full installation, our verified experts are here to help."
              style={{resize: 'vertical', width: '100%', padding: '10px 14px', backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '15px'}}
            ></textarea>
          </div>
          <Input label="Years of Experience" defaultValue="5" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button variant="primary" onClick={() => navigate('/provider/profile')}>Save Changes</Button>
          </div>
        </Card>

        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Certifications</h3>
            <ul style={{marginBottom: '16px', color: 'var(--color-shade-30)', fontSize: '14px', lineHeight: '2'}}>
              <li>✓ HVAC Certified (2020)</li>
              <li>✓ EPA Section 608</li>
            </ul>
            <Button variant="secondary" style={{width: '100%'}}>Upload Certificate</Button>
          </Card>

          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Portfolio</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px'}}>
              <div style={{aspectRatio: '1', backgroundColor: 'var(--color-dark-forest)', borderRadius: '8px'}}></div>
              <div style={{aspectRatio: '1', backgroundColor: 'var(--color-dark-forest)', borderRadius: '8px'}}></div>
            </div>
            <Button variant="secondary" style={{width: '100%'}}>Add Photos</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProviderProfile;
