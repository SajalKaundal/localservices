# 📩 User Dashboard – Requests Section (Complete Specification)

---

# 🎯 Purpose

The **Requests Section** is where users:

* Create service requests
* Negotiate time with providers
* Take action (accept/reject proposals)

👉 This is the **pre-booking phase** (nothing is confirmed yet)

---

# 🧭 UI Structure

## 🔹 Main Screen: “My Requests”

Display all requests grouped by status.

### Tabs (Recommended):

```text
[ All ]   [ Pending ]   [ Negotiating ]   [ Action Required ]   [ Closed ]
```

---

# 📦 Request Card Design

Each request should be shown as a **card/list item**.

## 🔹 Display Fields

* Service Name
* Provider Name
* Address
* Requested Date (if any)
* Latest Proposed Time (if exists)
* Estimated Duration (if available)
* Estimated Price (if available)
* Status Badge

---

## 🔹 Status Badge Examples

```text
🟡 Pending → Waiting for provider  
🔵 Negotiating → Back-and-forth ongoing  
🟠 Action Required → Provider responded, user must act  
🟢 Accepted → Ready for booking/payment  
🔴 Rejected → Closed  
⚫ Expired → No longer valid
```

---

# 🔔 Status-wise Behavior

---

## 🟡 1. Pending

### Meaning:

* User has sent request
* Provider has not responded yet

### Show:

```text
"Waiting for provider response"
```

### Actions:

* ❌ Cancel Request

---

## 🔵 2. Negotiating

### Meaning:

* Provider and user are exchanging time proposals

### Show:

* Latest proposed time
* Previous proposals (optional mini history)

### Actions:

* ✏️ Propose New Time
* 💬 Send Message (optional)
* ❌ Cancel Request

---

## 🟠 3. Action Required (IMPORTANT)

### Meaning:

* Provider has sent a proposal
* User must respond

### Highlight:

```text
"Provider proposed a time – respond now"
```

### Show:

* Proposed Start Time
* Calculated End Time
* Estimated Duration
* Estimated Price

---

### Actions:

* ✅ Accept Proposal
* ✏️ Suggest New Time
* ❌ Reject Request

---

## 🟢 4. Accepted

### Meaning:

* User accepted provider’s proposal
* Ready for booking/payment

### Show:

* Final Time Slot
* Estimated Cost

### Actions:

* 💳 Proceed to Payment
* ❌ Cancel (optional, before payment)

---

## 🔴 5. Rejected

### Meaning:

* Request was rejected (user or provider)

### Show:

```text
"This request was rejected"
```

### Actions:

* 🔁 Create New Request (optional CTA)

---

## ⚫ 6. Expired

### Meaning:

* Request timed out (based on expiresAt)

### Show:

```text
"This request has expired"
```

### Actions:

* 🔁 Re-request Service

---

# 💬 Negotiation View (Detailed Screen)

When user opens a request:

---

## 🔹 Top Section

* Service Name
* Provider Name
* Status
* Address

---

## 🔹 Proposal Timeline (Chat-like)

Display proposals as a list:

```text
Provider → 10:00 AM (2 hrs)  
User     → 12:00 PM  
Provider → 11:00 AM  
```

Each entry shows:

* Who proposed
* Start time
* Calculated end time
* Timestamp

---

## 🔹 Action Panel (Dynamic)

### If waiting for user:

* Accept
* Suggest new time

### If waiting for provider:

* Show:

```text
"Waiting for provider response"
```

---

# ⚙️ Important UI Logic

---

## 🔸 Always Highlight Latest Proposal

👉 Only latest proposal should be actionable

---

## 🔸 Disable Actions When Not Allowed

Example:

* Pending → no accept button
* Accepted → no negotiation

---

## 🔸 Auto-calculate End Time

Show:

```text
Start: 10:00  
Duration: 2 hours  
End: 12:00
```

---

# 🔔 Notifications (User Side)

Trigger notifications for:

* New proposal received
* Request accepted
* Request rejected
* Request expired

---

# 💡 UX Tips (Very Important)

* Keep negotiation simple (like chat, not forms)
* Highlight “Action Required” requests
* Show clear time + duration always
* Avoid showing technical data (IDs, raw timestamps)

---

# 🧩 Final Mental Model

```text
Requests = Conversation + Decision Phase
```

User uses this section to:

* Start service process
* Negotiate timing
* Decide whether to proceed

---

# ✅ Summary

In Requests Section, user can:

✔ View all requests
✔ Track request status
✔ Negotiate time
✔ Accept or reject proposals
✔ Cancel requests
✔ Proceed to booking/payment

---

END
