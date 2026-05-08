import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const timeOptions = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00",
];

const durationOptions = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
];

const NegotiationForm = ({
  negotiationData,
  setNegotiationData,
  handleAction,
  selectedRequest,
  isProvider
}) => {
  if (negotiationData.isSuggesting) {
    return (
      <div className="suggestion-form">
        <div className="form-row">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
            {isProvider && (
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "12px", color: "var(--color-shade-50)", textTransform: "uppercase", letterSpacing: "0.72px" }}>
                  Est. Duration
                </label>
                <select
                  defaultValue={selectedRequest.serviceId?.estimatedDuration}
                  disabled={selectedRequest.serviceId?.pricingType === "fixed"}
                  value={negotiationData.estimatedDuration || ""}
                  onChange={(e) => setNegotiationData({ ...negotiationData, estimatedDuration: e.target.value })}
                  className="input-field focus-ring"
                  style={{ backgroundColor: "transparent", appearance: "auto" }}
                >
                  <option value="" style={{ color: "#000" }}>Select Duration</option>
                  {durationOptions.map((t) => (
                    <option key={t} value={t} style={{ color: "#000" }}>
                      {t} {t === 1 ? "hour" : "hours"}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <label style={{ fontSize: "12px", color: "var(--color-shade-50)", textTransform: "uppercase", letterSpacing: "0.72px" }}>
              Suggest Time
            </label>
            <select
              value={negotiationData.time || ""}
              onChange={(e) => setNegotiationData({ ...negotiationData, time: e.target.value })}
              className="input-field focus-ring"
              style={{ backgroundColor: "transparent", appearance: "auto" }}
            >
              <option value="" style={{ color: "#000" }}>Select Time</option>
              {timeOptions.map((t) => (
                <option key={t} value={t} style={{ color: "#000" }}>{t}</option>
              ))}
            </select>
            <label style={{ fontSize: "12px", color: "var(--color-shade-50)", textTransform: "uppercase", letterSpacing: "0.72px" }}>
              Suggest Date
            </label>
            <Input
              value={negotiationData.date || ""}
              type="date"
              onChange={(e) => setNegotiationData({ ...negotiationData, date: e.target.value })}
            />
          </div>
        </div>
        <Input
          label="Message"
          value={negotiationData.message || ""}
          onChange={(e) => setNegotiationData({ ...negotiationData, message: e.target.value })}
        />
        <div className="form-actions">
          <Button variant="ghost" onClick={() => setNegotiationData({ ...negotiationData, isSuggesting: false })}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleAction(selectedRequest._id, "Send Proposal")}>
            Send Proposal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="action-row">
      <Input
        placeholder="Type a message..."
        value={negotiationData.message || ""}
        onChange={(e) => setNegotiationData({ ...negotiationData, message: e.target.value })}
        style={{ flex: 1, marginBottom: 0 }}
      />
      <Button variant="ghost" onClick={() => setNegotiationData({ ...negotiationData, isSuggesting: true })}>
        Propose terms
      </Button>
      <Button variant="primary" onClick={() => handleAction(selectedRequest._id, "Send Text", { text: negotiationData.message })}>
        Send
      </Button>
    </div>
  );
};

export default NegotiationForm;
