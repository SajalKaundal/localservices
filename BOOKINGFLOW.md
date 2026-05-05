# 📱 Booking Flow UI (User + Provider)

---

# 👤 USER SIDE UI

---

## 1. 📩 Create Request Screen

**Fields:**

* Service Name (auto-filled)
* Address
* Preferred Date (optional)
* Preferred Time (optional)
* Notes (optional)

**Button:**

* 🚀 Send Request

---

## 2. 🔔 Proposal / Negotiation Screen (IMPORTANT)

This screen acts like a **mini chat + offer system**

### 📦 Show:

* Provider name
* Proposed Time Slot (start → end)
* Proposed Price
* Provider message

---

### 💬 Negotiation Section:

(Chat-style UI)

Each message can be:

* Text message
* Time proposal
* Price proposal

---

### 👇 User Actions:

* ✏️ Suggest New Time
* 💰 Suggest New Price (optional)
* 💬 Send Message

---

### ✅ Final Action:

* Accept Proposal → goes to payment

---

## 3. 💳 Advance Payment Screen

* Service details
* Final agreed time
* Final agreed price
* Advance amount

**Button:**

* Pay Now

---

## 4. 📅 Booking Status Screen

### Show:

* Status:

  * Waiting for Provider
  * Scheduled
  * In Progress
  * Completed
* Time slot
* Provider details

---

### 🔘 Actions:

* Cancel (before start)
* Contact Provider

---

## 5. 🟢 Service In Progress Screen

* Status: **Provider Started Service**
* Show start time

---

## 6. ✅ Service Completed Screen

* Status: Completed
* Show:

  * Final price
  * Advance paid
  * Remaining amount

---

### 💳 Final Payment:

* Button: **Pay Remaining Amount**

---

---

# 🧑‍🔧 PROVIDER SIDE UI

---

## 1. 📩 Incoming Request Screen

### Show:

* User details
* Service requested
* Preferred time
* Notes

---

### 🔘 Actions:

* Accept & Propose
* Reject

---

## 2. 📝 Proposal Screen

### Input:

* Start Time
* End Time
* Price
* Message (optional)

---

### Buttons:

* Send Proposal

---

## 3. 💬 Negotiation Screen

(Same UI as user chat)

### Provider can:

* Modify time
* Modify price
* Send message

---

### Final Action:

* Wait for user acceptance

---

## 4. 📅 Booking Confirmed Screen

### Show:

* Time slot
* User info
* Service details

---

## 5. ▶️ Start Service Screen

### Button:

* **Start Service**

👉 On click:

* Status → In Progress
* Store actual start time

---

## 6. ⏹️ Complete Service Screen

### Button:

* **Mark as Completed**

👉 On click:

* Status → Completed
* Trigger final payment for user

---

## 7. 💰 Awaiting Final Payment Screen

* Show:

  * Remaining amount
  * Payment status

---

---

# 🔁 STATE FLOW (VERY IMPORTANT)

```id="8m9jrh"
REQUESTED  
→ PROPOSED  
→ NEGOTIATING (optional loop)  
→ ACCEPTED  
→ PENDING_PAYMENT  
→ CONFIRMED  
→ IN_PROGRESS  
→ COMPLETED  
→ FINAL_PAYMENT_PENDING  
→ CLOSED
```

---

# 🔒 KEY UI LOGIC

## Negotiation

* Allow multiple back-and-forth updates
* Always highlight **latest proposal**

## Payment Split

* Advance → before confirmation
* Remaining → after completion

## Buttons Visibility

| Status      | User Button        | Provider Button  |
| ----------- | ------------------ | ---------------- |
| Proposed    | Accept / Negotiate | Wait             |
| Confirmed   | —                  | Start Service    |
| In Progress | —                  | Complete Service |
| Completed   | Pay Remaining      | Wait             |

---

# 💡 UX TIPS (IMPORTANT)

* Keep negotiation like WhatsApp (very intuitive)
* Highlight final agreed deal clearly
* Always show:
  👉 Time
  👉 Price
* Disable actions after confirmation

---

# ✅ SUMMARY FLOW

User:
Request → Negotiate → Accept → Pay Advance → Track → Pay Remaining

Provider:
Receive → Propose → Negotiate → Start → Complete → Get Paid

---

END
