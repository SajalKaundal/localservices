import React from 'react';
import { formatMessageTime } from '../../utils/formatMessageTime';

const MessageThread = ({ messages, messagesEndRef, userRole }) => {
  return (
    <div className="message-thread">
      {messages?.map((msg, idx) => {
        const isOwnMessage = (msg.sender === 'user' && userRole === 'consumer') || 
                             (msg.sender === 'provider' && userRole === 'provider');
                             
        return (
          <div key={idx} className={`message-bubble ${isOwnMessage ? "user" : "provider"}`}>
            {msg.text && <p className="message-text">{msg.text}</p>}
            {msg.type === "proposal" && (
              <div className="proposal-box">
                <div className="proposal-header">Proposed Terms</div>
                {msg.proposal?.startTime && (
                  <div className="proposal-item">
                    <span>Start: </span>
                    <strong>
                      {new Date(msg.proposal.startTime).toLocaleString([], {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </strong>
                  </div>
                )}
                {msg.proposal?.endTime && (
                  <div className="proposal-item">
                    <span>End: </span>
                    <strong>
                      {new Date(msg.proposal.endTime).toLocaleString([], {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </strong>
                  </div>
                )}
                {msg.proposal?.estimatedDuration && (
                  <div className="proposal-item">
                    <span>Duration: </span>
                    <strong>
                      {msg.proposal.estimatedDuration}{" "}
                      {msg.proposal.estimatedDuration == 1 ? "hour" : "hours"}
                    </strong>
                  </div>
                )}
                {msg.proposal?.price && (
                  <div className="proposal-item">
                    <span>Price: </span>
                    <strong>₹{msg.proposal.price}</strong>
                  </div>
                )}
              </div>
            )}
            <span className="message-time">
              {formatMessageTime(msg.createdAt || msg.timestamp)}
            </span>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageThread;
