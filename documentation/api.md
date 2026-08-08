# Zonomo API Requirements (Frontend to Backend)

This document outlines the REST API endpoints that the Frontend React Native (Expo) app expects from the Spring Boot backend. 

## Base Configuration
- **Base URL:** `/api` (e.g., `http://localhost:8080/api`)
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>` (Required for all protected routes)

---

## 1. Authentication Endpoints

### 1.1 Send OTP
Called when a user requests to sign in via phone number.

- **Endpoint:** `POST /auth/send-otp`
- **Request Body:**
  ```json
  {
    "phone": "+1234567890",
    "role": "customer" // or "provider"
  }
  ```
- **Expected Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "OTP Sent"
  }
  ```

### 1.2 Verify OTP
Called when a user submits the OTP to finalize login. The backend should return a JWT token and indicate if the user needs to complete their profile (`isNewUser`).

- **Endpoint:** `POST /auth/verify-otp`
- **Request Body:**
  ```json
  {
    "phone": "+1234567890",
    "otp": "111111"
  }
  ```
- **Expected Response (200 OK):**
  ```json
  {
    "token": "eyJhbG...",
    "isNewUser": true, 
    "role": "customer",
    "user": {
      "id": "user_id_123",
      "phone": "+1234567890"
    }
  }
  ```

---

## 2. Customer Profile Endpoints

### 2.1 Update/Create Customer Profile
Called during the `complete-profile` flow after a new customer verifies their OTP.

- **Endpoint:** `POST /customer/profile`
- **Protected:** Yes (Requires Bearer token)
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St" // Optional
  }
  ```
- **Expected Response (200 OK):**
  ```json
  {
    "success": true,
    "user": {
      "id": "user_id_123",
      "fullName": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St"
    }
  }
  ```

### 2.2 Get Customer Profile
Called when the customer opens their profile tab or app loads.

- **Endpoint:** `GET /customer/profile`
- **Protected:** Yes (Requires Bearer token)
- **Expected Response (200 OK):**
  ```json
  {
    "success": true,
    "user": {
      "fullName": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

---

## 3. Provider Onboarding Endpoints

### 3.1 Save Provider Step 1 (Business Info)
Called when a provider submits the first page of their onboarding.

- **Endpoint:** `POST /provider/profile/step1`
- **Protected:** Yes (Requires Bearer token)
- **Request Body:**
  ```json
  {
    "businessName": "Doe Plumbing",
    "serviceCategory": "Plumbing",
    "zipCode": "90210",
    "radiusKm": 25
  }
  ```
- **Expected Response (200 OK):**
  ```json
  {
    "success": true,
    "providerId": "p_123"
  }
  ```

### 3.2 Upload File (Global Helper)
Called when a provider uploads their ID or license. The backend should upload this file to a bucket (like AWS S3) or save it locally, and return the hosted URL.

- **Endpoint:** `POST /upload`
- **Protected:** Yes (Requires Bearer token)
- **Headers:** `Content-Type: multipart/form-data`
- **Request Body:** 
  - `file`: The binary file payload
- **Expected Response (200 OK):**
  ```json
  {
    "fileUrl": "https://your-bucket.s3.amazonaws.com/files/document.jpg"
  }
  ```

### 3.3 Save Provider Step 2 (Identity Verification)
Called when the provider submits the URLs of their uploaded identity documents.

- **Endpoint:** `POST /provider/profile/step2`
- **Protected:** Yes (Requires Bearer token)
- **Request Body:**
  ```json
  {
    "frontIdUrl": "https://url-to-front-id.jpg",
    "backIdUrl": "https://url-to-back-id.jpg",
    "licenseUrl": "https://url-to-license.jpg" // Optional depending on category
  }
  ```
- **Expected Response (200 OK):**
  ```json
  {
    "success": true
  }
  ```

### 3.4 Get Provider Approval Status
Called on the "Waiting for Approval" screen to check if an admin has approved the provider.

- **Endpoint:** `GET /provider/status`
- **Protected:** Yes (Requires Bearer token)
- **Expected Response (200 OK):**
  ```json
  {
    "status": "in_review" // Can be "in_review", "approved", or "rejected"
  }
  ```
