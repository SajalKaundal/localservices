import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import './ProviderPages.css';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/provider/dashboard');
  };

  return (
    <div className="provider-page" style={{maxWidth: '800px', margin: '0 auto', paddingTop: '40px'}}>
      <Card elevation="medium">
        <h2 className="heading-3" style={{marginBottom: '8px'}}>Provider Onboarding</h2>
        <p className="body-muted" style={{marginBottom: '24px'}}>Complete your profile to start receiving bookings.</p>
        
        <div className="wizard-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Verification</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Services</div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Bank Info</div>
        </div>

        <div className="wizard-content">
          {step === 1 && (
            <div className="step-content">
              <h4 className="heading-5" style={{marginBottom: '16px'}}>Identity Verification</h4>
              <Input label="Business Name" placeholder="e.g. Alex Auto Care" />
              <Input label="Registration Number" placeholder="If applicable" />
              <div style={{marginTop: '16px'}}>
                <label className="input-label" style={{display: 'block', marginBottom: '8px'}}>Upload ID Document</label>
                <div style={{border: '1px dashed var(--color-shade-50)', padding: '32px', textAlign: 'center', borderRadius: '8px'}}>
                  <p className="body-muted">Drag and drop file here, or click to browse</p>
                  <Button variant="secondary" style={{marginTop: '16px'}}>Select File</Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h4 className="heading-5" style={{marginBottom: '16px'}}>What services do you provide?</h4>
              <Input label="Primary Category" placeholder="e.g. Electrician" />
              <Input label="Experience Level" placeholder="e.g. 5 Years" />
              <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px'}}>
                <Input label="Add Service" placeholder="e.g. AC Deep Clean" />
                <Input label="Price ($)" placeholder="e.g. 45" />
              </div>
              <Button variant="secondary">Add Another Service</Button>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h4 className="heading-5" style={{marginBottom: '16px'}}>Payout Information</h4>
              <Input label="Bank Account Name" />
              <Input label="Account Number" />
              <Input label="Routing Number" />
            </div>
          )}
        </div>

        <div className="wizard-actions">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>
          )}
          <Button variant="primary" onClick={() => step < 3 ? setStep(step + 1) : handleComplete()} style={{marginLeft: 'auto'}}>
            {step === 3 ? 'Complete Setup' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
