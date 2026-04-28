import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import './Messaging.css';

const Messaging = () => {
  return (
    <div className="messaging-page">
      <Card elevation="medium" className="messaging-card">
        <div className="chat-sidebar">
          <div className="chat-list-header">
            <h3 className="heading-5">Messages</h3>
          </div>
          <div className="chat-contacts">
            <div className="chat-contact active">
              <div className="contact-avatar">C</div>
              <div className="contact-info">
                <p className="contact-name">CoolBreeze AC</p>
                <p className="contact-preview body-muted">See you on Friday!</p>
              </div>
            </div>
            <div className="chat-contact">
              <div className="contact-avatar">J</div>
              <div className="contact-info">
                <p className="contact-name">Joe Plumber</p>
                <p className="contact-preview body-muted">Invoice sent.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="chat-main">
          <div className="chat-main-header">
            <h4 className="heading-6">CoolBreeze AC</h4>
            <span className="body-muted" style={{fontSize: '12px'}}>BK-1001</span>
          </div>
          
          <div className="chat-messages">
            <div className="message received">
              <div className="message-bubble">Hi there! I'll be arriving around 10:00 AM on Friday for the AC cleaning.</div>
              <span className="message-time">10:45 AM</span>
            </div>
            <div className="message sent">
              <div className="message-bubble">Sounds good, thanks for confirming! Let me know when you are close.</div>
              <span className="message-time">11:02 AM</span>
            </div>
            <div className="message received">
              <div className="message-bubble">Will do. See you on Friday!</div>
              <span className="message-time">11:05 AM</span>
            </div>
          </div>
          
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <input type="text" className="chat-input" placeholder="Type a message..." />
              <button className="chat-send-btn">Send</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messaging;
