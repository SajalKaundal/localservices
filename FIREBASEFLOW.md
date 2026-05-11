# Complete Firebase Authentication Flow (Frontend + Backend)

# Overview

This document explains the complete production-level Firebase Authentication flow for a React + Firebase + Node.js + Express + MongoDB application.

The architecture includes:

- Firebase Authentication
- React Frontend
- Express Backend
- MongoDB Database
- Protected APIs
- Role-based Authentication

---

# Architecture

```text
Frontend (React)
       |
       | Firebase Login
       v
Firebase Authentication
       |
       | Generates ID Token
       v
Frontend sends token
       |
       v
Express Backend
       |
       | verifyIdToken()
       v
MongoDB