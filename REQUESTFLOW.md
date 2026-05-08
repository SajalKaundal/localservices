# Proposal Acceptance Flow

## Recommended Design

In your platform, the provider should only negotiate and confirm the **service timing**.

The pricing should already be fixed from the service itself.

This means:

* service price comes from the Service document
* provider only proposes available time/date
* user accepts or rejects the schedule

This creates a much simpler and cleaner system.

---

# Why Time-Only Negotiation Is Better

For your type of app, fixed pricing is better because:

* simpler backend
* easier booking flow
* fewer disputes
* faster confirmation
* better user experience
* easier payment handling

The provider should only decide:

* when they are available
* how long the work may take

---

# Recommended Flow

```txt
User creates service request
        ↓
Provider reviews request
        ↓
Provider proposes service timing
        ↓
User accepts or rejects timing
        ↓
If accepted → booking created
```

---

# Service Price Source

The price should come directly from the service.

Example:

```js
service.price
```

So proposals do NOT contain pricing.

---

# Updated Proposal Structure

```js
proposal: {
  startTime,
  endTime,
  estimatedDuration
}
```

---

# Proposal Creation Flow

## Step 1: User Creates Request

User submits:

* service needed
* address
* description

Request status:

```txt
Pending
```

---

## Step 2: Provider Reviews Request

Provider can:

* view request
* send messages
* ask questions
* propose timing

---

## Step 3: Provider Sends Timing Proposal

Provider sends:

```js
{
  startTime,
  endTime,
  estimatedDuration
}
```

Message type:

```txt
proposal
```

Request status:

```txt
Negotiating
```

---

# User Side Actions

The user can:

## 1. Accept Timing

or

## 2. Reject Timing

or

## 3. Continue Discussion

---

# Timing Acceptance Flow

## Step 1: User Accepts Proposal

Backend should:

* validate proposal exists
* ensure request not expired
* ensure request not already accepted
* save proposal into `finalProposal`
* update request status
* create booking

---

# Database Changes After Acceptance

## Service Request

```js
status: "Accepted"
```

```js
acceptedAt: new Date()
```

```js
finalProposal: {
  startTime,
  endTime,
  estimatedDuration
}
```

---

# Add Acceptance Message

```js
{
  sender: "system",
  type: "accept",
  text: "Timing proposal accepted"
}
```

---

# Booking Creation

Booking should contain:

* userId
* providerId
* serviceId
* requestId
* fixed service price
* confirmed timing
* booking status
* payment status

---

# Rejection Flow

When user rejects timing:

* provider can send another timing proposal
* negotiation continues
* request remains active

Recommended:

Do not close request immediately.

---

# Better Status Design

```txt
Pending
Negotiating
Confirmed
Cancelled
Completed
```

---

# Provider Responsibilities

Provider can:

* send messages
* propose timing
* update timing
* resend timing proposal
* view request status

Provider cannot:

* change service price
* accept own proposal
* create booking directly

---

# User Responsibilities

User can:

* chat with provider
* review proposed timing
* accept timing
* reject timing
* cancel request

---

# Recommended Validation Before Acceptance

Validate:

* request exists
* user owns request
* request not expired
* request not already accepted
* proposal exists
* provider still active

---

# Recommended Architecture

## ServiceRequest

Temporary negotiation container.

Contains:

* messages
* timing proposals
* negotiation state

---

## Booking

Created only after timing acceptance.

Contains:

* confirmed timing
* fixed service price
* payment details
* completion status

---

# Recommended Message Types

```js
[
  "text",
  "proposal",
  "accept",
  "reject",
  "system"
]
```

---

# Example Complete Flow

## 1. User Creates Request

```txt
Need AC repair tomorrow.
```

---

## 2. Provider Sends Message

```txt
I am available tomorrow morning.
```

---

## 3. Provider Sends Timing Proposal

```txt
Tomorrow 10 AM
Estimated duration: 2 hours
```

---

## 4. User Accepts Timing

System:

```txt
Timing proposal accepted
```

---

## 5. Booking Created

Booking status:

```txt
Confirmed
```

---

# Final Recommendation

## Best Design

```txt
Service has fixed price
Provider proposes timing
User accepts timing
Booking gets created
```

This is:

* simpler
* scalable
* easier to maintain
* better UX
* easier payment flow
* easier backend architecture

For your app:

## Best Design

```txt
Provider sends proposal
User accepts proposal
Booking gets created
```

This is:

* simplest
* scalable
* easy to maintain
* industry standard
* best UX
* easiest backend architecture
