import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ProviderProfile = () => {
  return (
    <div className="provider-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Profile Management</h2>
      
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
              style={{resize: 'vertical'}}
            ></textarea>
          </div>
          <Input label="Years of Experience" defaultValue="5" />
          <Button variant="primary" style={{marginTop: '16px'}}>Save Changes</Button>
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

export default ProviderProfile;
