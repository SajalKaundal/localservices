import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { fetchRequests } from "../../services/requestService";
import { formatMessageTime } from "../../utils/formatMessageTime";
import "../consumer/Requests.css";
import { sendTextMessage } from "../../services/requestService";
import { sendProposal } from "../../services/requestService";
import { updateRequestStatus } from "../../services/requestService";

const timeOptions = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const durationOptions = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
];

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
  // const location = useLocation();

  const tabs = ["All", "Pending", "Negotiating", "Action Required", "Closed"];

  // useEffect(() => {
  //   if (location.state?.selectedRequestId) {
  //     setSelectedRequestId(location.state.selectedRequestId);
  //   }
  // }, [location.state]);

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
    if (activeTab === "Closed")
      return req.status === "Accepted" || req.status === "Rejected";
    return req.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return { bg: "rgba(245, 158, 11, 0.2)", text: "#FCD34D" };
      case "Negotiating":
        return { bg: "rgba(59, 130, 246, 0.2)", text: "#93C5FD" };
      case "Action Required":
        return { bg: "rgba(249, 115, 22, 0.2)", text: "#FDBA74" };
      case "Accepted":
        return { bg: "rgba(34, 197, 94, 0.2)", text: "#86EFAC" };
      case "Rejected":
        return { bg: "rgba(239, 68, 68, 0.2)", text: "#FCA5A5" };
      case "Expired":
        return { bg: "rgba(113, 113, 122, 0.2)", text: "#D4D4D8" };
      default:
        return { bg: "rgba(255, 255, 255, 0.1)", text: "#FFFFFF" };
    }
  };

  const handleAction = async (id, action, data = {}) => {
    // console.log(negotiationData);

    if (action === "Accept") {
      try {
        await updateRequestStatus(id, data, action);
        alert("Proposal accepted!");
        navigate(`/provider/jobs`);
      } catch (err) {
        console.error(err.message);
      }
      return;
    } else if (action === "Send Proposal") {
      console.log(negotiationData);
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
      // console.log(price);
      const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

      const newMessage = {
        text: negotiationData.message,
        startTime,
        endTime,
        estimatedDuration: duration,
        price,
      };
      console.log(newMessage);
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

    // alert(`Action "${action}" triggered for request ${id}`);
  };

  const selectedRequest = requests.find((r) => r._id === selectedRequestId);
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [selectedRequest?.messages, selectedRequestId]);

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1 className="heading-3">Booking Requests</h1>
        <p className="body-muted">
          Manage new service requests and negotiate with customers.
        </p>
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
                        <h4 className="heading-6">
                          {req.serviceId?.name ||
                            req.service?.name ||
                            "Service Request"}
                        </h4>
                        <Badge
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                            fontSize: "12px",
                          }}
                        >
                          {req.status}
                        </Badge>
                      </div>
                      <p className="provider-name-small">
                        Customer: {req.userId?.name || req.user?.name}
                      </p>
                      <p className="request-date-small">
                        Requested:{" "}
                        {req.messages?.[0]?.proposal?.startTime?.slice(0, 10) ||
                          req.requestedDate}
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
                  <div className="message-thread">
                    {selectedRequest.messages?.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`message-bubble ${msg.sender === "provider" ? "user" : "provider"}`}
                      >
                        {msg.text && <p className="message-text">{msg.text}</p>}
                        {msg.type === "proposal" && (
                          <div className="proposal-box">
                            <div className="proposal-header">
                              Proposed Terms
                            </div>
                            {msg.proposal?.startTime && (
                              <div className="proposal-item">
                                <span>Start: </span>
                                <strong>
                                  {new Date(
                                    msg.proposal.startTime,
                                  ).toLocaleString([], {
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
                                  {new Date(
                                    msg.proposal.endTime,
                                  ).toLocaleString([], {
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
                                  {msg.proposal.estimatedDuration == 1
                                    ? " hour"
                                    : " hours"}
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
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="detail-actions">
                  {selectedRequest.status !== "Accepted" &&
                    selectedRequest.status !== "Rejected" && (
                      <>
                        {negotiationData.isSuggesting ? (
                          <div className="suggestion-form">
                            <div className="form-row">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  flex: 1,
                                }}
                              >
                                <div style={{ flex: 1 }}>
                                  {/* <Input
                                  type="number"
                                  label="Est. Duration (mins)"
                                  value={negotiationData.duration}
                                  onChange={(e) =>
                                    setNegotiationData({
                                      ...negotiationData,
                                      duration: e.target.value,
                                    })
                                  }
                                /> */}
                                  <label
                                    style={{
                                      fontSize: "12px",
                                      color: "var(--color-shade-50)",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.72px",
                                    }}
                                  >
                                    Est. Duration
                                  </label>
                                  <select
                                    defaultValue={
                                      selectedRequest.serviceId
                                        .estimatedDuration
                                    }
                                    disabled={
                                      selectedRequest.serviceId.pricingType ===
                                      "fixed"
                                    }
                                    value={negotiationData.estimatedDuration}
                                    onChange={(e) =>
                                      setNegotiationData({
                                        ...negotiationData,
                                        estimatedDuration: e.target.value,
                                      })
                                    }
                                    style={{
                                      width: "100%",
                                      backgroundColor: "transparent",
                                      color: "#FFFFFF",
                                      border: "1px solid #3F3F46",
                                      borderRadius: "8px",
                                      padding: "12px 16px",
                                      outline: "none",
                                      appearance: "auto",
                                      fontFamily: "inherit",
                                    }}
                                  >
                                    <option value="" style={{ color: "#000" }}>
                                      Select Duration
                                    </option>
                                    {durationOptions.map((t) => (
                                      <option
                                        key={t}
                                        value={t}
                                        style={{ color: "#000" }}
                                      >
                                        {t} {t === 1 ? "hour" : "hours"}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <label
                                  style={{
                                    fontSize: "12px",
                                    color: "var(--color-shade-50)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.72px",
                                  }}
                                >
                                  Suggest Time
                                </label>
                                <select
                                  value={negotiationData.time}
                                  onChange={(e) =>
                                    setNegotiationData({
                                      ...negotiationData,
                                      time: e.target.value,
                                    })
                                  }
                                  style={{
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    color: "#FFFFFF",
                                    border: "1px solid #3F3F46",
                                    borderRadius: "8px",
                                    padding: "12px 16px",
                                    outline: "none",
                                    appearance: "auto",
                                    fontFamily: "inherit",
                                  }}
                                >
                                  <option value="" style={{ color: "#000" }}>
                                    Select Time
                                  </option>
                                  {timeOptions.map((t) => (
                                    <option
                                      key={t}
                                      value={t}
                                      style={{ color: "#000" }}
                                    >
                                      {t}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  style={{
                                    fontSize: "12px",
                                    color: "var(--color-shade-50)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.72px",
                                  }}
                                >
                                  Suggest Date
                                </label>
                                <Input
                                  value={negotiationData.date}
                                  type="date"
                                  onChange={(e) =>
                                    setNegotiationData({
                                      ...negotiationData,
                                      date: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <Input
                              label="Message"
                              value={negotiationData.message}
                              onChange={(e) =>
                                setNegotiationData({
                                  ...negotiationData,
                                  message: e.target.value,
                                })
                              }
                            />
                            <div className="form-actions">
                              <Button
                                variant="ghost"
                                onClick={() =>
                                  setNegotiationData({
                                    ...negotiationData,
                                    isSuggesting: false,
                                  })
                                }
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  handleAction(
                                    selectedRequest._id,
                                    "Send Proposal",
                                  )
                                }
                              >
                                Send Proposal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="action-row">
                            <Input
                              placeholder="Type a message..."
                              value={negotiationData.message}
                              onChange={(e) =>
                                setNegotiationData({
                                  ...negotiationData,
                                  message: e.target.value,
                                })
                              }
                              style={{ flex: 1, marginBottom: 0 }}
                            />
                            <Button
                              variant="ghost"
                              onClick={() =>
                                setNegotiationData({
                                  ...negotiationData,
                                  isSuggesting: true,
                                })
                              }
                            >
                              Propose terms
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() =>
                                handleAction(selectedRequest._id, "Send Text", {
                                  text: negotiationData.message,
                                })
                              }
                            >
                              Send
                            </Button>
                          </div>
                        )}

                        {/* If the last message is from user and is a proposal, provider can accept */}
                        {selectedRequest.status === "Negotiating" ||
                        selectedRequest.status === "Pending" ? (
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
                        ) : null}
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
