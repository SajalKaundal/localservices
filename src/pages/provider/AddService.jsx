import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { addService } from '../../services/providerServices';

const AddService = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    pricingType: "Fixed",
    basePrice: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

      const data = await addService("69f36e3d65de75f0df8f8e7d",formData)
      if(!data){
        throw new Error("Adding Service Failed")
      }
    }catch(err){
      console.error(err.message)
    }
    console.log("Submitted Data:", formData);

    // TODO: send to backend here

    navigate('/provider/services');
  };

  return (
    <div className="provider-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Add New Service</h2>
        <Button variant="ghost" onClick={() => navigate('/provider/services')}>
          Back to Services
        </Button>
      </div>

      <Card elevation="medium">
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <Input
            label="Service Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., AC Deep Cleaning"
            // fullWidth
          />

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#E2E8F0' }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '15px'
                }}
              >
                <option value="">Select a category</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#E2E8F0' }}>
                Pricing Type
              </label>
              <select
                name="pricingType"
                value={formData.pricingType}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '15px'
                }}
              >
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
          </div>

          <Input
            label="Rate (₹)"
            name="basePrice"
            value={formData.rate}
            onChange={handleChange}
            placeholder="e.g., 45.00"
            // fullWidth
          />

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#E2E8F0' }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '15px',
                minHeight: '100px'
              }}
              placeholder="Describe the service in detail..."
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Button
              variant="ghost"
              type="button"
              onClick={() => navigate('/provider/services')}
            >
              Cancel
            </Button>

            <Button variant="primary" type="submit">
              Save Service
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddService;