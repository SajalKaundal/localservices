import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useNavigate, useParams } from 'react-router-dom';

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data based on ID for demonstration
  const serviceName = id === '1' ? 'AC Deep Cleaning' : 'AC Installation';
  const rate = id === '1' ? '45.00' : '35.00';
  const pricingType = id === '1' ? 'Fixed' : 'Hourly';

  return (
    <div className="provider-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Edit Service</h2>
        <Button variant="ghost" onClick={() => navigate('/provider/services')}>Back to Services</Button>
      </div>

      <Card elevation="medium">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input label="Service Name" defaultValue={serviceName} placeholder="e.g., AC Deep Cleaning" fullWidth />
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#E2E8F0' }}>Category</label>
              <select defaultValue="AC Repair" style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '15px' }}>
                <option value="AC Repair">AC Repair</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#E2E8F0' }}>Pricing Type</label>
              <select defaultValue={pricingType} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '15px' }}>
                <option value="Fixed">Fixed</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
          </div>
          <Input label="Rate (₹)" defaultValue={rate} placeholder="e.g., 45.00" fullWidth />
          <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#E2E8F0' }}>Description</label>
              <textarea defaultValue="Professional service provided by experts." style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '15px', minHeight: '100px' }} placeholder="Describe the service in detail..."></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Button variant="ghost" onClick={() => navigate('/provider/services')} type="button">Cancel</Button>
            <Button variant="primary" type="button" onClick={() => navigate('/provider/services')}>Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditService;
