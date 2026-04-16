import React from 'react';
import Button from '../Button/Button';
import './LoginPromptModal.css';

const LoginPromptModal = ({ onLogin, onSkip }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content shadow-medium">
        <h3 className="heading-3">Sign in required</h3>
        <p className="body-muted">
          For a seamless tracking and booking experience, please log in. You can also continue as a guest, but your data might not be fully synchronized across devices.
        </p>
        
        <div className="modal-actions">
          <Button variant="primary" fullWidth onClick={onLogin}>Log In / Sign Up</Button>
          <Button variant="secondary" fullWidth onClick={onSkip}>Continue as Guest</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
