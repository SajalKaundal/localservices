import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const EditConsumerProfile = () => {
  const navigate = useNavigate();
  
  const [addresses, setAddresses] = useState([
    { id: 1, title: 'Home', detail: '123 Main St, Apt 4B, New York, NY 10001' }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDetail, setNewDetail] = useState('');

  const handleAddAddress = () => {
    if (newTitle.trim() && newDetail.trim()) {
      setAddresses([...addresses, { id: Date.now(), title: newTitle, detail: newDetail }]);
      setIsAdding(false);
      setNewTitle('');
      setNewDetail('');
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="consumer-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Edit Profile</h2>
        <Button variant="ghost" onClick={() => navigate('/consumer/profile')}>Cancel</Button>
      </div>
      
      <Card elevation="medium" style={{marginBottom: '24px'}}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 className="heading-5" style={{marginBottom: '4px'}}>Personal Information</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <Input label="First Name" defaultValue="John" />
            <Input label="Last Name" defaultValue="Doe" />
            <Input label="Email" defaultValue="john.doe@example.com" />
            <Input label="Phone" defaultValue="+1 234 567 8900" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" type="button" onClick={() => navigate('/consumer/profile')}>Save Changes</Button>
            </div>
        </form>
      </Card>

      <Card elevation="medium">
        <h3 className="heading-5" style={{marginBottom: '16px'}}>Saved Addresses</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {addresses.map(addr => (
            <Card key={addr.id} elevation="subtle">
              <h5 className="heading-6">{addr.title}</h5>
              <p className="body-muted" style={{marginTop: '4px'}}>{addr.detail}</p>
              <div style={{marginTop: '12px'}}>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Edit</Button>
                <Button variant="ghost" style={{padding: '4px 8px', color: '#EF4444'}} onClick={() => handleDeleteAddress(addr.id)}>Delete</Button>
              </div>
            </Card>
          ))}
          
          {isAdding ? (
            <Card elevation="subtle" style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: '1px dashed var(--color-shade-50)' }}>
              <h5 className="heading-6">Add New Address</h5>
              <Input 
                placeholder="Title (e.g., Office)" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
              />
              <Input 
                placeholder="Full Address" 
                value={newDetail} 
                onChange={(e) => setNewDetail(e.target.value)} 
              />
              <div style={{display: 'flex', gap: '8px', marginTop: '4px'}}>
                <Button variant="primary" type="button" onClick={handleAddAddress}>Save Address</Button>
                <Button variant="ghost" type="button" onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </Card>
          ) : (
            <Button variant="secondary" type="button" style={{alignSelf: 'flex-start'}} onClick={() => setIsAdding(true)}>Add New Address</Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EditConsumerProfile;
