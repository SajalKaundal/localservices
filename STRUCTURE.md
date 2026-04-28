# Hyperlocal Service Provider System - Frontend Structure

## 1. Overview
A two-sided marketplace where:
- Consumers can खोज (search), compare, and book services
- Service Providers can register, manage services, and earn
- Admin manages platform operations

---

## 2. Application Modules

### 2.1 Public Module (Unauthenticated)
- Landing Page
- Service Categories
- Service Listings
- Provider Details
- Authentication

### 2.2 Consumer Module
- Dashboard
- Booking System
- Payments
- Messaging
- Profile

### 2.3 Provider Module
- Onboarding
- Service Management
- Booking Management
- Earnings
- Profile

### 2.4 Admin Module
- User Management
- Service Control
- Booking Monitoring
- Payments & Reports

---

## 3. Public Pages

### 3.1 Landing Page
- Hero Section (Search by service/location)
- Categories Grid
- Featured Providers
- Testimonials
- CTA Buttons

### 3.2 Categories Page
- List of service categories
- Filters:
  - Popular
  - Ratings
  - Price range

### 3.3 Service Listing Page
- Provider cards
- Filters:
  - Experience
  - Price
  - Ratings
  - Availability
- Sorting:
  - Recommended
  - Price (Low → High)
  - Rating

### 3.4 Provider Detail Page
- Profile info
- Experience & certifications
- Services list
- Pricing
- Reviews & ratings
- Availability calendar
- Book button

### 3.5 Authentication
- Login
- Signup (Consumer / Provider)
- OTP / Email verification
- Forgot Password

---

## 4. Consumer Module

### 4.1 Dashboard
- Upcoming bookings
- History
- Recommendations

### 4.2 Booking Flow
- Select service
- Select provider
- Choose time slot
- Price summary
- Confirm booking

### 4.3 My Bookings
- Upcoming
- Completed
- Cancelled
- Actions:
  - Cancel
  - Reschedule
  - Chat

### 4.4 Booking Details
- Service info
- Provider info
- Status timeline
- Invoice
- Review system

### 4.5 Messaging
- Real-time chat
- File/image sharing

### 4.6 Payments
- Payment methods
- Transaction history
- Refund tracking

### 4.7 Profile
- Personal info
- Saved addresses
- Preferences

---

## 5. Provider Module

### 5.1 Onboarding
- KYC verification
- Document upload
- Add services
- Set pricing
- Availability setup

### 5.2 Dashboard
- Earnings overview
- Booking stats
- Upcoming jobs

### 5.3 Service Management
- Add/Edit/Delete services
- Pricing types:
  - Fixed
  - Hourly
- Experience level tagging

### 5.4 Booking Requests
- Accept / Reject
- View details
- Schedule jobs

### 5.5 My Jobs
- Ongoing jobs
- Completed jobs
- History

### 5.6 Earnings
- Earnings summary
- Withdraw funds
- Payment history

### 5.7 Reviews
- Ratings
- Feedback insights

### 5.8 Profile
- Bio
- Certifications
- Portfolio

---

## 6. Admin Module

### 6.1 Dashboard
- Total users
- Active providers
- Revenue metrics

### 6.2 User Management
- Consumers
- Providers
- Block/verify users

### 6.3 Provider Verification
- Approve/reject KYC
- Document validation

### 6.4 Service Management
- Categories
- Subcategories
- Pricing rules

### 6.5 Booking Management
- All bookings
- Dispute handling

### 6.6 Payments
- Transactions monitoring
- Commission settings

### 6.7 Review Moderation
- Flag/remove reviews

---

## 7. Reusable Components

- Navbar (role-based)
- Sidebar (dashboard)
- Cards (service/provider)
- Filter panel
- Booking wizard (multi-step form)
- Calendar picker
- Chat UI
- Rating component
- Payment modal

---

## 8. Advanced Features

### 8.1 Smart Pricing
- Based on:
  - Experience
  - Ratings
  - Demand
  - Location

### 8.2 Recommendation System
- Based on:
  - User history
  - Popular services
  - Ratings

### 8.3 Real-Time Features
- Live booking updates
- Notifications
- Chat system

### 8.4 Geo-Based Services
- Nearby providers
- Map integration

### 8.5 Trust & Safety
- Verified badges
- Background checks

---

## 9. User Flows

### 9.1 Consumer Flow
Landing → Search → Filter → Provider → Book → Pay → Track → Review

### 9.2 Provider Flow
Signup → Verification → Add Services → Receive Requests → Accept → Complete → Earn

---

## 10. Suggested Tech Stack

- Frontend: React (Vite)
- State Management: Redux Toolkit
- API Handling: React Query
- Styling: DESIGN.md file
- Real-Time: Socket.io

---

## 11. Folder Structure (Frontend)

src/
│── components/
│ ├── common/
│ ├── ui/
│ ├── forms/
│
│── pages/
│ ├── public/
│ ├── consumer/
│ ├── provider/
│ ├── admin/
│
│── layouts/
│── routes/
│── services/ (API calls)
│── store/ (Redux)
│── hooks/
│── utils/
│── assets/