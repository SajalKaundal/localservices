import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { getStatusColor } from '../../utils/statusUtils';

const RequestListSidebar = ({
  requests,
  activeTab,
  setActiveTab,
  selectedRequestId,
  setSelectedRequestId,
  tabs
}) => {
  const filteredRequests = requests.filter((req) => {
    if (activeTab === "All") return true;
    if (activeTab === "Closed")
      return req.status === "Accepted" || req.status === "Rejected";
    return req.status === activeTab;
  });

  return (
    <div className="requests-sidebar">
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
      <div className="requests-list">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => {
            const statusStyle = getStatusColor(req.status);
            // Handle both provider and consumer formats
            const title = req.serviceId?.name || req.service?.name || "Service Request";
            const personName = req.providerId?.name || req.userId?.name || req.user?.name || "Unknown";
            const reqDate = req.messages?.[0]?.proposal?.startTime?.slice(0, 10) || req.requestedDate || "Unknown date";

            return (
              <Card
                key={req._id}
                elevation="medium"
                className={`request-card ${selectedRequestId === req._id ? "selected" : ""}`}
                onClick={() => setSelectedRequestId(req._id)}
              >
                <div className="card-compact-info">
                  <div className="info-header">
                    <h4 className="heading-6">{title}</h4>
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
                  <p className="provider-name-small">{personName}</p>
                  <p className="request-date-small">{reqDate}</p>
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
    </div>
  );
};

export default RequestListSidebar;
