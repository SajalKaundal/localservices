import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import {
  fetchRequests,
  updateRequestStatus,
  sendTextMessage,
  sendProposal,
} from "../../services/requestService";
import { useAuth } from "../../context/AuthContext";
import "./Requests.css";
import { getStatusColor } from "../../utils/statusUtils";
import MessageThread from "../../components/requests/MessageThread";
import RequestListSidebar from "../../components/requests/RequestListSidebar";
import NegotiationForm from "../../components/requests/NegotiationForm";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [negotiationData, setNegotiationData] = useState({
    message: "",
    time: "",
    date: "",
    isSuggesting: false,
  });

  const messagesEndRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const tabs = ["All", "Pending", "Negotiating", "Closed"];

  useEffect(() => {
    const getRequests = async () => {
      try {
        const requests = await fetchRequests();
        setRequests(requests);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };
    getRequests();
  }, [user]);

  const handleAction = async (id, action, data = {}) => {
    if (action === "Accept") {
      try {
        const { bookingId } = await updateRequestStatus(id, data, action);
        alert("Proposal accepted! Redirecting to booking details for payment.");
        navigate(`/consumer/booking/${bookingId}?status=PENDING_PAYMENT`);
      } catch (err) {
        console.error(err.message);
      }
      return;
    } else if (action === "Send Proposal") {
      const startTime = new Date(
        `${negotiationData.date}T${negotiationData.time}:00+05:30`,
      );
      const newMessage = {
        text: negotiationData.message,
        startTime,
      };

      const request = await sendProposal(id, newMessage);
      if (!request) {
        throw new Error("proposal not send");
      }
      const message = request.messages[request.messages.length - 1];
      const updatedRequests = requests.map((r) => {
        if (r._id === id) {
          return {
            ...r,
            messages: [...r.messages, message],
          };
        }
        return r;
      });

      setRequests(updatedRequests);
      setNegotiationData({
        message: "",
        time: "",
        duration: "",
        isSuggesting: false,
      });
      return;
    } else if (action === "Send Text") {
      setNegotiationData({
        message: "",
        time: "",
        duration: "",
        isSuggesting: false,
      });
      const message = await sendTextMessage(id, data.text);

      const updatedRequests = requests.map((r) => {
        if (r._id === id) {
          return {
            ...r,
            messages: [...r.messages, message],
          };
        }
        return r;
      });

      setRequests(updatedRequests);
    }
  };

  const selectedRequest = requests.find((r) => r._id === selectedRequestId);

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1 className="heading-3">My Requests</h1>
        <p className="body-muted">
          Manage your service requests and negotiations with providers.
        </p>
      </div>

      {loading ? (
        <div className="loading-state">Loading requests...</div>
      ) : (
        <div className="requests-container">
          <RequestListSidebar
            requests={requests}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedRequestId={selectedRequestId}
            setSelectedRequestId={setSelectedRequestId}
            tabs={tabs}
          />

          <div className="request-detail-view">
            {selectedRequest ? (
              <Card elevation="medium" className="detail-card">
                <div className="detail-header">
                  <div>
                    <h2 className="heading-4">
                      {selectedRequest.serviceId.name}
                    </h2>
                    <p className="body-muted">
                      Provider:{" "}
                      <strong>{selectedRequest.providerId.name}</strong>
                    </p>
                  </div>
                  <Badge
                    style={{
                      backgroundColor: getStatusColor(selectedRequest.status)
                        .bg,
                      color: getStatusColor(selectedRequest.status).text,
                    }}
                  >
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
                      {selectedRequest.messages[0]?.proposal?.startTime?.slice(
                        0,
                        10,
                      )}
                    </span>
                  </div>
                </div>

                <div className="negotiation-history">
                  <h4 className="heading-6 section-title">
                    Conversation & Proposals
                  </h4>
                  <MessageThread
                    messages={selectedRequest.messages}
                    messagesEndRef={messagesEndRef}
                    userRole="consumer"
                  />
                </div>

                <div className="detail-actions">
                  {selectedRequest.status !== "Accepted" &&
                    selectedRequest.status !== "Rejected" && (
                      <>
                        <NegotiationForm
                          negotiationData={negotiationData}
                          setNegotiationData={setNegotiationData}
                          handleAction={handleAction}
                          selectedRequest={selectedRequest}
                          isProvider={false}
                        />

                        {selectedRequest.messages[
                          selectedRequest.messages.length - 1
                        ]?.sender === "provider" &&
                          selectedRequest.messages[
                            selectedRequest.messages.length - 1
                          ]?.type === "proposal" && (
                            <div className="accept-panel">
                              <p className="notice">
                                Provider has sent a proposal
                              </p>
                              <Button
                                variant="primary"
                                style={{ width: "100%" }}
                                onClick={() =>
                                  handleAction(selectedRequest._id, "Accept")
                                }
                              >
                                Accept Proposal & Proceed
                              </Button>
                            </div>
                          )}
                      </>
                    )}

                  {selectedRequest.status === "Accepted" && (
                    <div className="status-notice success">
                      <p>
                        This request has been accepted. Booking is confirmed.
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/consumer/booking/BK-1001`)}
                      >
                        View Booking Details
                      </Button>
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
