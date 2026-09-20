# Services Overview

This document explains the purpose of each `.ts` file located in the `services/` directory of the Zonomo frontend app. 
Currently, these files contain **mocked responses** to simulate backend behavior, allowing the frontend to be developed independently. Once the Spring Boot backend is ready, these files will be updated to make real HTTP requests.

---

### `api.ts`
**Purpose:** Core Network & Axios Configuration
- **What it does:** This file initializes the `axios` instance (`api`) used across all other service files. It defines the base URL (e.g., `http://localhost:8080/api`) for the backend.
- **Key Features:** It contains interceptors. The request interceptor automatically attaches the user's JWT token to the `Authorization` header of every request. The response interceptor listens for `401 Unauthorized` errors to automatically log the user out if their session expires.

---

### `authService.ts`
**Purpose:** Authentication & OTP Flow
- **What it does:** Handles the logic for logging in or registering users via phone numbers.
- **Functions:**
  - `sendOtp`: Simulates requesting the backend to send an SMS OTP to a phone number.
  - `verifyOtp`: Simulates verifying the entered OTP. If successful, it returns a mocked JWT token, the user's role (`customer` or `provider`), and a flag indicating if they are a new user.

---

### `bookingService.ts`
**Purpose:** Managing Service Requests & Appointments
- **What it does:** Handles the lifecycle of a booking from the perspective of both the customer and the provider.
- **Functions:**
  - `createBooking`: Customer creates a new appointment.
  - `getCustomerBookings`: Customer fetches their history of booked services.
  - `getProviderRequests`: Provider fetches new incoming job requests from customers.
  - `updateRequestStatus`: Provider accepts or rejects an incoming request.

---

### `chatService.ts`
**Purpose:** Real-time / Asynchronous Messaging
- **What it does:** Manages the chat system allowing customers and providers to communicate.
- **Functions:**
  - `getRecentChats`: Fetches the inbox/list of all recent conversations.
  - `getChatMessages`: Fetches the message history for one specific chat room.
  - `sendMessage`: Sends a new text message to a specific chat room.

---

### `customerService.ts`
**Purpose:** Customer App Operations & Discovery
- **What it does:** Contains all the logic for what a customer can do in the app, primarily focusing on browsing categories and finding service providers.
- **Functions:**
  - `updateProfile` / `getProfile`: Manages customer personal details.
  - `getCategories`: Fetches the list of service categories (e.g., Electrician, Plumber).
  - `getProvidersByCategory`: Fetches the list of available providers for a specific category (this function also maps backend data to the frontend's UI format).
  - `getProviderDetails`: Fetches detailed info, reviews, and rates for a specific provider.
  - `validateServiceLocation`: Checks if a custom address is within a provider's service zone (currently mocks Google Maps validation).

---

### `providerService.ts`
**Purpose:** Provider Onboarding & KYC
- **What it does:** Handles the multi-step registration process for professionals joining the Zonomo platform.
- **Functions:**
  - `saveStep1`: Submits basic business details (name, category, service radius).
  - `uploadFile`: Helper function to simulate uploading documents (ID, License) to cloud storage and getting a URL back.
  - `saveStep2`: Submits the KYC/Identity verification document URLs.
  - `getStatus`: Checks if the provider's application is currently `in_review`, `approved`, or `rejected` by the admin team.
