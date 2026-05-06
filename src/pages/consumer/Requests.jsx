import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { fetchUserRequests, updateRequestStatus } from "../../services/requestService";
import { useAuth } from "../../context/AuthContext";
import "./Requests.css";

const Requests = () => {
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
  const { user } = useAuth();

  const tabs = ["All", "Pending", "Negotiating", "Action Required", "Closed"];

  useEffect(() => {
    const getRequests = async () => {
      try {
        // Mock data as per BOOKINGFLOW.md and the logic previously in BookingDetails.jsx
        const mockRequests = [
          {
            _id: "req1",
            service: { name: "Deep Home Cleaning" },
            provider: { name: "Sparkle Cleaners" },
            address: "123 Green Valley, Sector 5",
            status: "Pending",
            requestedDate: "2026-05-10",
            createdAt: "2026-05-06T10:00:00Z",
            messages: [
              { sender: "user", text: "I need a deep clean for my 3BHK.", timestamp: "10:00 AM" }
            ]
          },
          {
            _id: "req2",
            service: { name: "AC Maintenance" },
            provider: { name: "Cooling Experts" },
            address: "456 Blue Ridge, Block C",
            status: "Action Required",
            requestedDate: "2026-05-12",
            latestProposal: {
              startTime: "11:00 AM",
              endTime: "01:00 PM",
              duration: "2 hours",
              price: 1200,
            },
            createdAt: "2026-05-05T14:30:00Z",
            messages: [
              { sender: "user", text: "Looking for AC servicing.", timestamp: "02:30 PM" },
              { 
                sender: "provider", 
                text: "I can do it on Tuesday. Here is my proposal.", 
                type: "proposal", 
                price: 1200, 
                time: "11:00 AM",
                timestamp: "03:00 PM" 
              }
            ]
          },
          {
            _id: "req3",
            service: { name: "Plumbing Repair" },
            provider: { name: "Pro Plumbers" },
            address: "789 Pine Street",
            status: "Negotiating",
            requestedDate: "2026-05-08",
            latestProposal: {
              startTime: "03:00 PM",
              endTime: "04:30 PM",
              duration: "1.5 hours",
              price: 800,
            },
            createdAt: "2026-05-06T09:15:00Z",
            messages: [
              { sender: "user", text: "Pipe leak in kitchen.", timestamp: "09:15 AM" },
              { sender: "provider", text: "I can come at 3 PM for 1000.", type: "proposal", price: 1000, time: "03:00 PM", timestamp: "09:30 AM" },
              { sender: "user", text: "Can you do it for 800?", type: "proposal", price: 800, time: "03:00 PM", timestamp: "09:45 AM" }
            ]
          }
        ];

        setTimeout(() => {
          setRequests(mockRequests);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };
    getRequests();
  }, [user]);

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

  const handleAction = async (id, action, data = {}) => {
    if (action === "Accept") {
      alert("Proposal accepted! Redirecting to booking details for payment.");
      // In a real app, this would update the request and create a booking
      navigate(`/consumer/booking/BK-1001?status=PENDING_PAYMENT`); 
      return;
    }

    if (action === "Send Proposal") {
      const selectedReq = requests.find(r => r._id === id);
      const newMessage = {
        sender: "user",
        text: negotiationData.message,
        type: (negotiationData.time || negotiationData.price) ? "proposal" : "text",
        price: negotiationData.price || null,
        time: negotiationData.time || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

    alert(`Action "${action}" triggered for request ${id}`);
  };

  const selectedRequest = requests.find(r => r._id === selectedRequestId);

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1 className="heading-3">My Requests</h1>
        <p className="body-muted">Manage your service requests and negotiations with providers.</p>
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
                        <h4 className="heading-6">{req.service.name}</h4>
                        <Badge style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, fontSize: '12px' }}>
                          {req.status}
                        </Badge>
                      </div>
                      <p className="provider-name-small">{req.provider.name}</p>
                      <p className="request-date-small">{req.requestedDate}</p>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="empty-state-mini">
                <p>No requests.</p>
              </div>
            )}
          </div>

          <div className="request-detail-view">
            {selectedRequest ? (
              <Card elevation="medium" className="detail-card">
                <div className="detail-header">
                  <div>
                    <h2 className="heading-4">{selectedRequest.service.name}</h2>
                    <p className="body-muted">Provider: <strong>{selectedRequest.provider.name}</strong></p>
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
                    <span className="value">{selectedRequest.requestedDate}</span>
                  </div>
                </div>

                <div className="negotiation-history">
                  <h4 className="heading-6 section-title">Conversation & Proposals</h4>
                  <div className="message-thread">
                    {selectedRequest.messages?.map((msg, idx) => (
                      <div key={idx} className={`message-bubble ${msg.sender}`}>
                        {msg.text && <p className="message-text">{msg.text}</p>}
                        {msg.type === 'proposal' && (
                          <div className="proposal-box">
                            {msg.time && <div>Time: {msg.time}</div>}
                            {msg.price && <div>Price: ₹{msg.price}</div>}
                          </div>
                        )}
                        <span className="message-time">{msg.timestamp}</span>
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

                      {selectedRequest.messages[selectedRequest.messages.length - 1].sender === 'provider' && 
                       selectedRequest.messages[selectedRequest.messages.length - 1].type === 'proposal' && (
                        <div className="accept-panel">
                          <p className="notice">Provider has sent a proposal</p>
                          <Button variant="primary" style={{width: '100%'}} onClick={() => handleAction(selectedRequest._id, "Accept")}>
                            Accept Proposal & Proceed
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                  
                  {selectedRequest.status === 'Accepted' && (
                    <div className="status-notice success">
                      <p>This request has been accepted. Booking is confirmed.</p>
                      <Button variant="primary" onClick={() => navigate(`/consumer/booking/BK-1001`)}>View Booking Details</Button>
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

export default Requests;
