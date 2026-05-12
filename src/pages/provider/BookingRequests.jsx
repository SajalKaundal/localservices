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
import "../consumer/Requests.css";
import { getStatusColor } from "../../utils/statusUtils";
import MessageThread from "../../components/requests/MessageThread";
import RequestListSidebar from "../../components/requests/RequestListSidebar";
import NegotiationForm from "../../components/requests/NegotiationForm";

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [negotiationData, setNegotiationData] = useState({
    message: "",
    time: "",
    date: "",
    duration: "",
  });

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const tabs = ["All", "Pending", "Negotiating", "Closed"];
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
    const interval = setInterval(getRequests,3000)
    return ()=>clearInterval(interval)
  }, []);

  const handleAction = async (id, action, data = {}) => {

    if (action === "Accept") {
      console.log("accepted")
      try {
        await updateRequestStatus(id, data, action);
        alert("Proposal accepted!");
      } catch (err) {
        console.error(err.message);
      }
      return;
    } else if (action === "Send Proposal") {
      const startTime = new Date(
        `${negotiationData.date}T${negotiationData.time}:00+05:30`,
      );
      const selectedReq = requests.find((r) => r._id === id);
      const duration = negotiationData.estimatedDuration
        ? negotiationData.estimatedDuration
        : selectedReq.serviceId.estimatedDuration;
      const price =
        selectedReq.serviceId.pricingType === "hourly"
          ? selectedReq.serviceId.basePrice * duration
          : selectedReq.serviceId.basePrice;
      const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

      const newMessage = {
        text: negotiationData.message,
        startTime,
        endTime,
        estimatedDuration: duration,
        price,
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
        <h1 className="heading-3">Booking Requests</h1>
        <p className="body-muted">
          Manage new service requests and negotiate with customers.
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
                      {selectedRequest.serviceId?.name}
                    </h2>
                    <p className="body-muted">
                      Customer: <strong>{selectedRequest.userId?.name}</strong>
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
                      {selectedRequest.messages?.[0]?.proposal?.startTime?.slice(
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
                    userRole="provider"
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
                          isProvider={true}
                        />

                        {(selectedRequest.status === "Negotiating" ||
                          selectedRequest.status === "Pending") && (
                          <div
                            className="accept-panel"
                            style={{ marginTop: "24px" }}
                          >
                            <p className="notice">
                              {selectedRequest.messages[
                                selectedRequest.messages.length - 1
                              ]?.sender === "user" &&
                              selectedRequest.messages[
                                selectedRequest.messages.length - 1
                              ]?.type === "proposal"
                                ? "Customer has sent a proposal"
                                : "Ready to take this job?"}
                            </p>
                            <Button
                              variant="primary"
                              style={{ width: "100%" }}
                              onClick={() =>
                                handleAction(selectedRequest._id, "Accept")
                              }
                            >
                              {selectedRequest.messages[
                                selectedRequest.messages.length - 1
                              ]?.sender === "user" &&
                              selectedRequest.messages[
                                selectedRequest.messages.length - 1
                              ]?.type === "proposal"
                                ? "Accept Proposal"
                                : "Accept Request"}
                            </Button>
                          </div>
                        )}
                      </>
                    )}

                  {selectedRequest.status === "Accepted" && (
                    <div className="status-notice success">
                      <p>
                        This request has been accepted. The job is now
                        confirmed.
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/provider/jobs`)}
                      >
                        Go to My Jobs
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

export default BookingRequests;
