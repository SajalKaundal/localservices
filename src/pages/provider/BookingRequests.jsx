import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { fetchRequests } from "../../services/requestService";
import { formatMessageTime } from "../../utils/formatMessageTime";
import "../consumer/Requests.css";

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [negotiationData, setNegotiationData] = useState({
    message: "",
    time: "",
    price: "",
    isSuggesting: false
  });

  const navigate = useNavigate(); 
  const location = useLocation();

  const tabs = ["All", "Pending", "Negotiating", "Action Required", "Closed"];

  useEffect(() => {
    if (location.state?.selectedRequestId) {
      setSelectedRequestId(location.state.selectedRequestId);
    }
  }, [location.state]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getRequests();
  }, []);

  const filteredRequests = requests.filter((req) => {
    if (activeTab === "All") return true;
    if (activeTab === "Closed") return req.status === "Accepted" || req.status === "Rejected" || req.status === "Expired";
    return req.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return { bg: "rgba(245, 158, 11, 0.2)", text: "#FCD34D" };
      case "Negotiating": return { bg: "rgba(59, 130, 246, 0.2)", text: "#93C5FD" };
      case "Action Required": return { bg: "rgba(249, 115, 22, 0.2)", text: "#FDBA74" };
      case "Accepted": return { bg: "rgba(34, 197, 94, 0.2)", text: "#86EFAC" };
      case "Rejected": return { bg: "rgba(239, 68, 68, 0.2)", text: "#FCA5A5" };
      case "Expired": return { bg: "rgba(113, 113, 122, 0.2)", text: "#D4D4D8" };
      default: return { bg: "rgba(255, 255, 255, 0.1)", text: "#FFFFFF" };
    }
  };

  const handleAction = async (id, action) => {
    if (action === "Accept") {
      alert("Proposal accepted! The job has moved to My Jobs.");
      
      const updatedRequests = requests.map(r => {
        if (r._id === id) {
          return {
            ...r,
            status: "Accepted"
          };
        }
        return r;
      });
      setRequests(updatedRequests);
      return;
    }

    if (action === "Send Proposal") {
      const newMessage = {
        sender: "provider",
        text: negotiationData.message,
        type: (negotiationData.time || negotiationData.price) ? "proposal" : "text",
        proposal: {
          price: negotiationData.price || null,
          startTime: negotiationData.time ? (() => {
            const date = new Date();
            const [hours, minutes] = negotiationData.time.split(':');
            date.setHours(hours, minutes, 0, 0);
            return date.toISOString();
          })() : null,
        },
        createdAt: new Date().toISOString()
      };
      
      const updatedRequests = requests.map(r => {
        if (r._id === id) {
          return {
            ...r,
            status: "Negotiating",
            messages: [...r.messages, newMessage]
          };
        }
        return r;
      });
      
      setRequests(updatedRequests);
      setNegotiationData({ message: "", time: "", price: "", isSuggesting: false });
      return;
    }
  };

  const selectedRequest = requests.find(r => r._id === selectedRequestId);

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1 className="heading-3">Booking Requests</h1>
        <p className="body-muted">Manage new service requests and negotiate with customers.</p>
      </div>

      <div className="requests-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">Loading requests...</div>
      ) : (
        <div className="requests-container">
          <div className="requests-list">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => {
                const statusStyle = getStatusColor(req.status);
                return (
                  <Card 
                    key={req._id} 
                    elevation="medium" 
                    className={`request-card ${selectedRequestId === req._id ? "selected" : ""}`}
                    onClick={() => setSelectedRequestId(req._id)}
                  >
                    <div className="card-compact-info">
                      <div className="info-header">
                        <h4 className="heading-6">{req.serviceId?.name || req.service?.name || 'Service Request'}</h4>
                        <Badge style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, fontSize: '12px' }}>
                          {req.status}
                        </Badge>
                      </div>
                      <p className="provider-name-small">Customer: {req.userId?.name || req.user?.name}</p>
                      <p className="request-date-small">
                        Requested: {req.messages?.[0]?.proposal?.startTime?.slice(0, 10) || req.requestedDate}
                      </p>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="empty-state-mini">
                <p>No requests found.</p>
              </div>
            )}
          </div>

          <div className="request-detail-view">
            {selectedRequest ? (
              <Card elevation="medium" className="detail-card">
                <div className="detail-header">
                  <div>
                    <h2 className="heading-4">{selectedRequest.serviceId?.name || selectedRequest.service?.name}</h2>
                    <p className="body-muted">Customer: <strong>{selectedRequest.userId?.name || selectedRequest.user?.name}</strong></p>
                  </div>
                  <Badge style={{ backgroundColor: getStatusColor(selectedRequest.status).bg, color: getStatusColor(selectedRequest.status).text }}>
                    {selectedRequest.status}
                  </Badge>
                </div>

                <div className="detail-meta">
                  <div className="meta-item">
                    <span className="label">Location</span>
                    <span className="value">{selectedRequest.address}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Requested Date</span>
                    <span className="value">
                      {selectedRequest.messages?.[0]?.proposal?.startTime?.slice(0, 10) || selectedRequest.requestedDate}
                    </span>
                  </div>
                </div>

                <div className="negotiation-history">
                  <h4 className="heading-6 section-title">Conversation & Proposals</h4>
                  <div className="message-thread">
                    {selectedRequest.messages?.map((msg, idx) => (
                      <div key={idx} className={`message-bubble ${msg.sender === 'provider' ? 'user' : 'provider'}`}>
                        {msg.text && <p className="message-text">{msg.text}</p>}
                        {msg.type === 'proposal' && (
                          <div className="proposal-box">
                            <div className="proposal-header">
                              Proposed Terms
                            </div>
                            {msg.proposal?.startTime && (
                              <div className="proposal-item">
                                <span>Start:</span>
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
                                <span>End:</span>
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
                                <span>Duration:</span>
                                <strong>{msg.proposal.estimatedDuration} mins</strong>
                              </div>
                            )}
                            {msg.proposal?.price && (
                              <div className="proposal-item">
                                <span>Price:</span>
                                <strong>₹{msg.proposal.price}</strong>
                              </div>
                            )}
                          </div>
                        )}
                        <span className="message-time">{formatMessageTime(msg.createdAt || msg.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-actions">
                  {selectedRequest.status !== 'Accepted' && selectedRequest.status !== 'Rejected' && (
                    <>
                      {negotiationData.isSuggesting ? (
                        <div className="suggestion-form">
                          <div className="form-row">
                            <Input type="time" label="Suggest Time" value={negotiationData.time} onChange={(e) => setNegotiationData({...negotiationData, time: e.target.value})} />
                            <Input type="number" label="Suggest Price (₹)" value={negotiationData.price} onChange={(e) => setNegotiationData({...negotiationData, price: e.target.value})} />
                          </div>
                          <Input label="Message" value={negotiationData.message} onChange={(e) => setNegotiationData({...negotiationData, message: e.target.value})} />
                          <div className="form-actions">
                            <Button variant="ghost" onClick={() => setNegotiationData({...negotiationData, isSuggesting: false})}>Cancel</Button>
                            <Button variant="primary" onClick={() => handleAction(selectedRequest._id, "Send Proposal")}>Send Proposal</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="action-row">
                          <Input 
                            placeholder="Type a message..." 
                            value={negotiationData.message} 
                            onChange={(e) => setNegotiationData({...negotiationData, message: e.target.value})} 
                            style={{flex: 1, marginBottom: 0}}
                          />
                          <Button variant="ghost" onClick={() => setNegotiationData({...negotiationData, isSuggesting: true})}>Propose terms</Button>
                          <Button variant="primary" onClick={() => handleAction(selectedRequest._id, "Send Proposal")}>Send</Button>
                        </div>
                      )}

                      {/* If the last message is from user and is a proposal, provider can accept */}
                      {selectedRequest.messages[selectedRequest.messages.length - 1].sender === 'user' && 
                       selectedRequest.messages[selectedRequest.messages.length - 1].type === 'proposal' && (
                        <div className="accept-panel">
                          <p className="notice">Customer has sent a proposal</p>
                          <Button variant="primary" style={{width: '100%'}} onClick={() => handleAction(selectedRequest._id, "Accept")}>
                            Accept Proposal
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                  
                  {selectedRequest.status === 'Accepted' && (
                    <div className="status-notice success">
                      <p>This request has been accepted. The job is now confirmed.</p>
                      <Button variant="primary" onClick={() => navigate(`/provider/jobs`)}>Go to My Jobs</Button>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <div className="select-prompt">
                <p>Select a request to view details and negotiate.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingRequests;
