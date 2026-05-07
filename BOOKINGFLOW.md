# Provider Request Review & Negotiation System

## Overview

The Provider Request Review & Negotiation System allows service providers to:

* Review incoming customer requests
* View service details
* Negotiate pricing and scheduling
* Send proposals
* Accept or reject requests
* Convert accepted requests into bookings

The system is designed similar to professional marketplace platforms such as:

* Urban Company
* Fiverr
* Upwork
* Thumbtack

The negotiation flow is implemented using a chat-style messaging system with proposal cards.

---

# Main Features

## Request Management

Providers can:

* View all incoming service requests
* Filter requests by status
* Open detailed negotiation view
* Send normal text messages
* Send structured proposals
* Accept or reject requests

---

# Request Status Flow

```txt
Pending
   ↓
Negotiating
   ↓
Accepted / Rejected
```

---

# Dashboard Tabs

The request dashboard contains multiple tabs.

| Tab             | Description                            |
| --------------- | -------------------------------------- |
| All             | Displays every request                 |
| Pending         | Newly created requests                 |
| Negotiating     | Active negotiations                    |
| Action Required | Waiting for provider/customer response |
| Closed          | Accepted or rejected requests          |

---

# Layout Structure

The request section contains two major panels.

## 1. Requests List Panel

Displays compact request cards.

### Each Card Shows

* Service Name
* Customer Name
* Requested Date
* Current Status

### Example

```txt
AC Repair
Sajal Kaundal
14 May 2026
[ Negotiating ]
```

---

## 2. Request Detail View

Displays complete negotiation details.

### Includes

* Service information
* Customer information
* Address/location
* Requested date
* Conversation thread
* Proposal history
* Negotiation actions

---

# Detail View Structure

## Header Section

Displays:

* Service name
* Customer name
* Request status badge

### Example

```txt
AC Repair
Customer: Sajal Kaundal
[ Negotiating ]
```

---

# Meta Information Section

| Field          | Description               |
| -------------- | ------------------------- |
| Location       | Customer service location |
| Requested Date | Requested booking date    |

---

# Conversation & Negotiation Thread

The negotiation system is built using a message-based conversation thread.

Messages are displayed as chat bubbles.

The system supports:

* User messages
* Provider messages
* System messages
* Proposal messages

---

# Message Schema

```js
messages: [
  {
    sender: "provider",

    type: "proposal",

    text: "I can do it tomorrow morning.",

    proposal: {
      startTime,
      endTime,
      estimatedDuration,
      price,
    },

    createdAt,
  }
]
```

---

# Message Types

## 1. Text Message

Used for normal communication.

### Example

```txt
Can you come tomorrow morning?
```

---

## 2. Proposal Message

Used to negotiate:

* Price
* Timing
* Duration

### Example Proposal

```txt
Proposed Terms

Start:    14 May, 09:00 AM
End:      14 May, 11:00 AM
Duration: 120 mins
Price:    ₹700
```

---

## 3. Accept Message

Generated when proposal is accepted.

### Example

```txt
Proposal accepted
```

---

## 4. Reject Message

Generated when request is rejected.

### Example

```txt
Request rejected
```

---

# Proposal Card Design

The proposal card should visually stand out from regular messages.

## Proposal Card Displays

| Field      | Description                 |
| ---------- | --------------------------- |
| Start Time | Proposed service start      |
| End Time   | Proposed service completion |
| Duration   | Estimated work duration     |
| Price      | Negotiated price            |

---

# Professional Proposal UI Example

```txt
┌──────────────────────────┐
│      Proposed Terms      │
├──────────────────────────┤
│ Start:    14 May 09:00AM │
│ End:      14 May 11:00AM │
│ Duration: 120 mins       │
│ Price:    ₹700           │
└──────────────────────────┘
```

---

# Message Time Formatting

Messages should display professional timestamps.

## Examples

```txt
01:10 PM
Yesterday, 09:40 AM
07 May, 01:30 PM
```

---

# Recommended Time Formatter

```js
export const formatMessageTime = (dateString) => {
  const date = new Date(dateString);

  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  const yesterday = new Date();

  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return time;
  }

  if (isYesterday) {
    return `Yesterday, ${time}`;
  }

  return date.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
  }) + `, ${time}`;
};
```

---

# Provider Actions

Providers can perform the following actions.

| Action         | Description                     |
| -------------- | ------------------------------- |
| Send Message   | Send normal negotiation message |
| Send Proposal  | Propose price and timing        |
| Accept Request | Finalize booking                |
| Reject Request | Reject negotiation              |

---

# Proposal Form

When provider clicks:

```txt
Propose Terms
```

The proposal form opens.

## Form Fields

| Field           | Description                  |
| --------------- | ---------------------------- |
| Suggested Time  | Proposed start time          |
| Estimated Price | Negotiated price             |
| Message         | Optional negotiation message |

---

# Accept Flow

When a proposal is accepted:

1. Request status becomes `Accepted`
2. Final proposal is stored
3. Booking is created
4. User redirected to payment/booking page

---

# Reject Flow

When a request is rejected:

1. Status becomes `Rejected`
2. Negotiation closes
3. Request moves to Closed tab

---

# Recommended MongoDB Schema

```js
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["user", "provider", "system"],
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "proposal", "accept", "reject"],
      default: "text",
    },

    text: {
      type: String,
      trim: true,
    },

    proposal: {
      price: Number,

      startTime: Date,

      endTime: Date,

      estimatedDuration: Number,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);
```

---

# Recommended Frontend UI Features

## Current Features

* Request list
* Conversation thread
* Proposal cards
* Status badges
* Accept/reject actions
* Time formatting

---

## Future Enhancements

### Real-Time Messaging

Use:

* Socket.IO
* WebSockets

---

### Typing Indicators

Examples:

```txt
Provider is typing...
```

---

### Read Receipts

Examples:

```txt
Seen
Delivered
```

---

### Attachments

Support:

* Images
* Videos
* Documents

---

### Voice Notes

Allow providers and customers to send voice messages.

---

### Booking Auto Generation

Automatically create booking after proposal acceptance.

---

### Push Notifications

Notify users for:

* New proposals
* New messages
* Accepted requests
* Rejected requests

---

### Expiry Countdown

Show remaining negotiation time.

Example:

```txt
Expires in 12h 25m
```

---

# Recommended UX Improvements

## Date Separators

Show separators between messages.

### Example

```txt
Today
Yesterday
07 May 2026
```

---

## Auto Scroll

Conversation should automatically scroll to latest message.

---

## Status Indicators

Examples:

```txt
Waiting for Customer
Waiting for Provider
Proposal Sent
Accepted
Rejected
```

---

# Professional UI Recommendations

## Message Bubble Design

* Rounded corners
* Different colors for provider/customer
* Soft shadows
* Compact timestamps

---

## Proposal Card Styling

* Highlighted background
* Border accent
* Structured rows
* Strong typography for pricing

---

## Suggested Color System

| Status      | Color  |
| ----------- | ------ |
| Pending     | Yellow |
| Negotiating | Blue   |
| Accepted    | Green  |
| Rejected    | Red    |
| Expired     | Gray   |

---

# Final Goal

The provider request negotiation system should feel like a modern professional marketplace where providers can:

* communicate professionally
* negotiate transparently
* manage proposals efficiently
* finalize bookings smoothly
* maintain full conversation history

The architecture is scalable and ready for:

* real-time communication
* mobile app integration
* advanced booking workflows
* payment integration
* notification systems
