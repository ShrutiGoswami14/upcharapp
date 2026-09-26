# Upchar Health Mobile App --- Product Requirements Document (PRD)

**Product:** Upchar Health\
**Platform:** Android / iOS mobile application\
**Framework:** Expo + React Native\
**Navigation:** Expo Router\
**Backend:** Existing Supabase backend + PostgreSQL\
**Document Version:** 1.0\
**Date:** 25 September 2026\
**Primary Product Journey:** Find → Book → Queue → Consult → Follow-up

------------------------------------------------------------------------

## 1. Product Overview

Upchar Health is a centralized digital healthcare platform intended to
connect patients with healthcare providers from one application.

The mobile application will provide role-based experiences for:

1.  Patients
2.  Doctors
3.  Clinics
4.  Medical stores
5.  Diagnostic centres

The application will use the existing Upchar Health Supabase backend and
PostgreSQL database rather than introducing a new backend for the mobile
application.

The product should reduce the need for patients to use multiple
healthcare applications/websites for discovering providers, booking
appointments, tracking queues, accessing prescriptions and records,
booking diagnostic services, and interacting with healthcare providers.

### Product positioning

> **Digital Healthcare for Every Indian**

The product architecture should support the broader Upchar Health
ecosystem:

-   Doctors
-   Clinics
-   Medical stores
-   Diagnostic centres
-   Hospitals/providers as the ecosystem expands
-   Patients

------------------------------------------------------------------------

# 2. Problem Statement

Healthcare information and services are fragmented across different
providers and platforms.

A patient may need separate systems for:

-   Finding a doctor
-   Booking an appointment
-   Tracking a clinic queue
-   Finding a diagnostic centre
-   Booking a diagnostic test
-   Accessing prescriptions
-   Maintaining health records
-   Finding a nearby medical store

Healthcare providers also commonly manage operations through a
combination of phone calls, paper records, spreadsheets, messaging
applications, and disconnected systems.

Upchar Health aims to provide a centralized digital layer for these
workflows.

------------------------------------------------------------------------

# 3. Product Goals

## 3.1 Primary Goals

### Patient

-   Discover doctors and healthcare providers.
-   Book appointments.
-   Support queue and non-queue appointments.
-   View live token/queue information where supported.
-   Receive appointment and queue notifications.
-   Access prescriptions and healthcare records.
-   Discover clinics, medical stores and diagnostic centres.
-   Book diagnostic services.
-   Manage profile and healthcare information.

### Doctor

-   Manage appointments.
-   Manage live patient queues.
-   View patient information permitted by the system.
-   Create and manage prescriptions.
-   Track follow-ups.
-   Manage availability/timings.
-   View basic practice metrics.
-   Improve patient discovery and retention through the Upchar
    ecosystem.

### Clinic

-   Manage clinic appointments.
-   Manage doctors.
-   Manage patient flow and queues.
-   View clinic-level operational metrics.
-   Manage doctor schedules.
-   Manage clinic information.

### Medical Store

-   Receive/manage prescription-based requests and orders.
-   View customer/patient requests allowed by the platform.
-   Track order status.
-   Manage store information.
-   Support inventory functionality as the relevant backend module
    becomes available.

### Diagnostic Centre

-   Manage diagnostic bookings.
-   Register/track patients and bookings.
-   Track sample collection status.
-   Track processing status.
-   Manage reports.
-   Release completed reports to patients through authorized workflows.

------------------------------------------------------------------------

# 4. Non-Goals for Initial Mobile Release

The following are not part of the initial production scope unless
explicitly enabled later:

-   Full teleconsultation/video consultation.
-   Autonomous AI medical diagnosis.
-   Autonomous medical treatment recommendations.
-   Insurance claim processing.
-   Full hospital ERP functionality.
-   Complex pharmacy inventory/ERP functionality unless already
    supported by the backend.
-   Replacing licensed healthcare professionals.
-   Direct emergency medical intervention.

AI, telemedicine, insurance and advanced integrations may be considered
roadmap capabilities.

------------------------------------------------------------------------

# 5. Target Users

## 5.1 Patient

A person looking for healthcare services, appointments, doctors,
clinics, diagnostic tests, prescriptions or healthcare records.

## 5.2 Doctor

A verified healthcare professional registered on Upchar Health.

## 5.3 Clinic

A clinic/provider organization managing one or more doctors,
appointments and patient flow.

## 5.4 Medical Store

A medical/pharmacy provider registered on the platform.

## 5.5 Diagnostic Centre

A diagnostic provider offering tests and managing bookings, samples and
reports.

## 5.6 Platform Admin

The existing Upchar Health admin/controller system remains responsible
for platform-level administration, verification, moderation and
operational controls. Admin functionality should not be unnecessarily
duplicated inside the provider mobile dashboards.

------------------------------------------------------------------------

# 6. Role-Based Product Experience

  Role         Primary job
  ------------ -------------------------------------------------
  Patient      Find and access healthcare
  Doctor       Manage patients, appointments and consultations
  Clinic       Manage clinic operations and doctors
  Medical      Manage medicine requests/orders
  Diagnostic   Manage tests, samples and reports

The application must never expose another role's dashboard simply
because a user can authenticate.

The authenticated user's role must determine the navigation tree and
accessible screens.

------------------------------------------------------------------------

# 7. Core Patient Journey

``` text
Open App
   ↓
Login / Signup
   ↓
Complete Profile
   ↓
Search Healthcare
   ↓
Select Doctor / Clinic / Diagnostic / Medical
   ↓
View Details
   ↓
Select Date / Time / Queue
   ↓
Confirm Details
   ↓
Payment if enabled
   ↓
Appointment / Booking Created
   ↓
Track Appointment / Queue
   ↓
Consultation / Service
   ↓
Prescription / Report / Record
   ↓
Follow-up / Reminder
```

------------------------------------------------------------------------

# 8. Authentication & Onboarding

## Requirements

The app must support the authentication capabilities already exposed by
the Upchar Health Supabase backend.

Potential supported methods include:

-   Email/password
-   Phone/OTP where enabled
-   Session persistence
-   Logout
-   Password recovery where enabled

### On first login

The application should determine:

1.  Authenticated user
2.  Profile
3.  Role
4.  Provider verification status, where applicable
5.  Required onboarding state

### Patient onboarding

Collect only information required by the product:

-   Name
-   Phone
-   Email where applicable
-   Date of birth where required
-   Gender where required
-   Basic profile information
-   Emergency contact where supported

### Provider onboarding

Provider users must be routed through the appropriate
verification/onboarding state.

Doctor onboarding includes:

-   Professional information
-   Specialization
-   Qualification
-   License/registration information
-   Clinic association
-   Consultation fee
-   Availability/timetable

Verification should remain controlled by the backend/admin workflow.

------------------------------------------------------------------------

# 9. Patient Dashboard Requirements

## 9.1 Home

The patient home screen must answer:

> What healthcare action do I need today?

### Sections

1.  Greeting/header
2.  Search
3.  Upcoming appointment
4.  Live queue, when applicable
5.  Quick actions
6.  Health records summary
7.  Recent reports/prescriptions
8.  Nearby/relevant healthcare discovery

### Quick actions

-   Find Doctor
-   Book Appointment
-   Book Diagnostic Test
-   Find Medical Store
-   Clinics
-   Hospitals/providers when supported
-   Emergency healthcare information
-   Records

### Upcoming appointment

Display:

-   Provider name
-   Specialization/service
-   Date
-   Time
-   Location
-   Token number where applicable
-   Appointment status
-   CTA to view/manage

### Queue

For queue-enabled appointments:

-   Patient token
-   Current token
-   Patients ahead
-   Estimated waiting time where available
-   Queue status
-   Appointment location
-   CTA to track queue

------------------------------------------------------------------------

# 10. Patient Appointment Requirements

Patients must be able to:

-   Search doctors.
-   Filter by specialization/location/availability.
-   View doctor profile.
-   View clinic/medical/provider details.
-   Select date.
-   Select available time/session.
-   Select queue/non-queue appointment where supported.
-   Enter required patient details.
-   Verify phone/OTP where required.
-   Pay where enabled.
-   Confirm appointment.
-   View appointment confirmation.
-   Cancel/reschedule according to backend rules.
-   Receive reminders.
-   Track queue where applicable.

### Appointment statuses

Recommended standardized statuses:

-   pending
-   confirmed
-   waiting
-   in_progress
-   completed
-   cancelled
-   no_show
-   rescheduled

The UI must map backend status values to human-readable labels.

------------------------------------------------------------------------

# 11. Doctor Dashboard Requirements

The doctor dashboard must prioritize:

> Patients → Appointments → Queue → Follow-ups → Practice metrics

## Home sections

1.  Greeting
2.  Today's overview
3.  Live queue
4.  Today's appointments
5.  Quick actions
6.  Follow-ups
7.  Practice summary

### Today's overview

Display:

-   Total appointments
-   Completed
-   Waiting
-   Follow-ups

### Live queue

Display:

-   Current token
-   Current patient status
-   Next token
-   Number waiting
-   Estimated waiting time if available
-   Queue controls

Actions:

-   Call next patient
-   Start consultation
-   Complete appointment
-   Move/skip according to backend permissions

### Appointments

Each appointment should show:

-   Patient name
-   Time
-   Appointment type
-   Token
-   Status
-   Relevant action

### Follow-ups

Show patients requiring:

-   Follow-up today
-   Follow-up soon
-   Overdue follow-up

### Doctor profile

Manage:

-   Name
-   Photo
-   Qualification
-   Specialization
-   Registration/license information
-   Consultation fee
-   Clinic associations
-   Availability
-   Sessions/timetable
-   Profile visibility

------------------------------------------------------------------------

# 12. Clinic Dashboard Requirements

The clinic dashboard must prioritize operational visibility.

## Home

Show:

-   Today's appointments
-   Completed appointments
-   Waiting patients
-   Cancelled appointments
-   Live queue
-   Doctor availability
-   Quick actions

### Doctor management

Clinic users can view/manage doctors associated with the clinic
according to permissions.

Display:

-   Doctor
-   Specialty
-   Availability
-   Current status
-   Today's appointments

### Clinic operations

Support:

-   Appointment management
-   Queue management
-   Patient registration where permitted
-   Doctor schedules
-   Clinic information

------------------------------------------------------------------------

# 13. Medical Store Dashboard Requirements

The medical dashboard is different from the clinic dashboard.

## Home

Show:

-   Today's orders
-   Pending orders
-   Completed orders
-   Revenue where supported
-   Prescription requests
-   Inventory alerts when inventory is implemented

### Orders

Each order should contain:

-   Order ID
-   Customer/patient reference permitted by policy
-   Medicines
-   Prescription reference where applicable
-   Amount
-   Status
-   Created time

### Prescription requests

Show:

-   New requests
-   Under review
-   Accepted
-   Rejected
-   Fulfilled

### Inventory

If the backend supports inventory:

-   Low stock
-   Out of stock
-   Expiring soon
-   Product search
-   Stock updates

Inventory should not be shown as a functional feature if the
corresponding backend functionality is not available.

------------------------------------------------------------------------

# 14. Diagnostic Dashboard Requirements

The diagnostic dashboard must prioritize:

> Bookings → Samples → Processing → Reports

## Home

Show:

-   Today's bookings
-   Samples collected
-   Samples pending
-   Reports ready
-   Reports under processing

### Booking

Display:

-   Booking ID
-   Patient
-   Test(s)
-   Date/time
-   Booking status
-   Payment status where applicable
-   Sample status

### Sample tracking

Recommended lifecycle:

``` text
Booked
  ↓
Sample Pending
  ↓
Sample Collected
  ↓
Processing
  ↓
Completed
  ↓
Report Released
```

### Reports

Diagnostic staff can manage report lifecycle according to backend
permissions.

Patients should only receive reports through authorized access.

------------------------------------------------------------------------

# 15. Health Records

Patient records should provide a centralized view of available
healthcare information.

Possible record categories:

-   Prescriptions
-   Diagnostic reports
-   Doctor visits
-   Appointment history
-   Uploaded healthcare documents

Records must be linked to the authenticated patient and protected by
backend access policies.

### Prescription

Display:

-   Doctor
-   Date
-   Diagnosis/clinical notes if provided
-   Medicines
-   Dosage
-   Frequency
-   Duration
-   Instructions
-   Associated clinic/provider

------------------------------------------------------------------------

# 16. Search & Discovery

The patient should be able to search for:

-   Doctors
-   Specializations
-   Clinics
-   Diagnostic centres
-   Medical stores

### Search result card

For doctors:

-   Profile image
-   Name
-   Specialization
-   Qualification
-   Consultation fee
-   Clinic
-   Availability
-   Distance if location functionality is enabled
-   Verification/status indicator where applicable

Search should support filters relevant to the entity.

------------------------------------------------------------------------

# 17. Notifications

The app should support notifications for events such as:

### Patient

-   Appointment confirmation
-   Appointment reminder
-   Queue update
-   Provider delay/update
-   Prescription available
-   Diagnostic report ready

### Doctor

-   New appointment
-   Appointment cancellation
-   Queue activity
-   Follow-up reminder

### Clinic

-   New appointment
-   Queue update
-   Doctor schedule changes

### Diagnostic

-   New booking
-   Sample-related event
-   Report workflow event

Push notifications may be introduced through the appropriate Expo/native
notification infrastructure and backend event flow.

------------------------------------------------------------------------

# 18. Location & Queue Experience

Location functionality is intended to improve appointment timing and
provider discovery.

Potential features:

-   Nearby providers
-   Clinic location
-   Diagnostic location
-   Medical store location
-   Estimated travel information
-   Arrival recommendations based on appointment and queue state

The system must not claim precise arrival times when reliable
location/traffic data is unavailable.

------------------------------------------------------------------------

# 19. Payments

Payment support should be designed as a backend-controlled capability.

Potential payment workflow:

``` text
Select service
    ↓
Create booking/payment intent
    ↓
Payment
    ↓
Verify payment server-side
    ↓
Confirm booking
    ↓
Show receipt/confirmation
```

The mobile client must never be the authority for final payment
verification.

------------------------------------------------------------------------

# 20. Design Requirements

## Design language

The app should look:

-   Clean
-   Modern
-   Trustworthy
-   Healthcare-focused
-   Easy to understand
-   Fast to scan

### Design principles

-   One primary CTA per major screen.
-   Avoid information overload.
-   Use cards for grouped information.
-   Use status badges.
-   Use consistent spacing.
-   Use large readable touch targets.
-   Use bottom navigation for major role sections.
-   Use skeleton/loading states.
-   Provide clear empty states.
-   Provide retry states for network errors.

### Suggested palette

  Token           Value
  --------------- -----------
  Primary         `#0F766E`
  Primary Light   `#E6FFFB`
  Success         `#16A34A`
  Warning         `#F59E0B`
  Error           `#DC2626`
  Info            `#2563EB`
  Background      `#F8FAFC`
  Surface         `#FFFFFF`
  Text            `#0F172A`
  Muted Text      `#64748B`
  Border          `#E2E8F0`

------------------------------------------------------------------------

# 21. Accessibility

The app should provide:

-   Readable font sizes
-   Sufficient contrast
-   Large touch targets
-   Accessible labels for icons
-   Screen-reader-friendly buttons
-   Clear error messages
-   No color-only status communication
-   Support for dynamic text where practical

Regional-language support is part of the broader product direction and
should be architected so UI strings can be localized later.

------------------------------------------------------------------------

# 22. Security & Privacy Requirements

Healthcare information is sensitive.

The application must:

-   Use authenticated Supabase sessions.
-   Never hard-code service-role credentials.
-   Never expose Supabase service-role keys in the mobile app.
-   Rely on Supabase Row Level Security for authorization.
-   Store private healthcare documents in protected storage.
-   Avoid logging sensitive healthcare data.
-   Protect patient/provider data according to applicable policies.
-   Use HTTPS/TLS for network communication.
-   Clear sensitive local state on logout where appropriate.

------------------------------------------------------------------------

# 23. Error & Empty States

Every data-driven screen must support:

### Loading

Skeleton or appropriate loading indicator.

### Empty

Example:

> No upcoming appointments

CTA:

> Find a Doctor

### Error

Example:

> We couldn't load your appointments.

CTA:

> Try Again

### Offline

Example:

> You're offline. Some information may be unavailable.

------------------------------------------------------------------------

# 24. Analytics

Product analytics should track non-sensitive product events needed for
product improvement.

Examples:

-   signup_started
-   signup_completed
-   search_started
-   provider_viewed
-   appointment_started
-   appointment_confirmed
-   appointment_cancelled
-   queue_viewed
-   prescription_viewed
-   report_viewed
-   diagnostic_booking_started
-   diagnostic_booking_completed

Do not put medical diagnoses or unnecessary sensitive healthcare content
into analytics event properties.

------------------------------------------------------------------------

# 25. MVP Scope

## Phase 1 --- Core mobile foundation

-   Expo project setup
-   Expo Router
-   Authentication
-   Role detection
-   Profile
-   Supabase integration
-   Theme/design system
-   Role-based navigation

## Phase 2 --- Patient

-   Patient dashboard
-   Doctor discovery
-   Doctor profile
-   Appointment booking
-   Appointment history
-   Queue tracking
-   Records
-   Prescriptions

## Phase 3 --- Doctor

-   Doctor dashboard
-   Appointments
-   Queue
-   Patient list
-   Prescriptions
-   Follow-ups
-   Availability

## Phase 4 --- Clinic

-   Clinic dashboard
-   Doctor management
-   Appointments
-   Queue
-   Patient operations

## Phase 5 --- Medical

-   Medical dashboard
-   Orders
-   Prescription requests
-   Store profile
-   Inventory if supported

## Phase 6 --- Diagnostic

-   Diagnostic dashboard
-   Bookings
-   Tests
-   Sample tracking
-   Reports

------------------------------------------------------------------------

# 26. Roadmap

Future capabilities may include:

-   Teleconsultation
-   AI calling agent
-   AI/chatbot capabilities
-   Regional-language experience
-   Advanced provider analytics
-   WhatsApp/SMS notifications
-   Advanced payment workflows
-   Insurance integrations
-   DigiLocker/Aadhaar-style verification research
-   Hospital workflows
-   More healthcare provider types

These should not block the initial mobile MVP.

------------------------------------------------------------------------

# 27. Success Metrics

### Patient

-   Registration completion rate
-   Doctor search-to-profile rate
-   Appointment booking completion rate
-   Appointment cancellation rate
-   Queue tracking usage
-   Records/prescription usage

### Doctor

-   Profile completion
-   Appointment acceptance/management
-   Queue usage
-   Follow-up usage
-   Patient retention

### Clinic

-   Appointment management usage
-   Queue management usage
-   Doctor schedule usage

### Diagnostic

-   Booking management
-   Sample status updates
-   Report completion/release

### Medical

-   Prescription request processing
-   Order completion
-   Inventory activity where supported

------------------------------------------------------------------------

# 28. Acceptance Criteria

The MVP is considered functionally ready when:

-   A user can authenticate.
-   The application identifies the user's role.
-   The correct role-specific dashboard opens.
-   Unauthorized role screens cannot be accessed.
-   Patient users can discover and book supported appointments.
-   Doctors can view/manage supported appointments.
-   Queue information is displayed when available.
-   Prescriptions can be viewed/created according to permissions.
-   Diagnostic bookings and reports work according to backend support.
-   Medical order flows work according to backend support.
-   Loading/error/empty states exist on data-driven screens.
-   Supabase RLS prevents unauthorized database access.
-   The app works on Android and can be validated on iOS through the
    Expo-supported workflow.

------------------------------------------------------------------------

# 29. Product Principle

Upchar Health should make healthcare feel like one connected journey
rather than a collection of disconnected services.

``` text
Discover
   ↓
Book
   ↓
Arrive
   ↓
Queue
   ↓
Consult
   ↓
Prescription / Test
   ↓
Record
   ↓
Follow-up
```

The mobile app is the patient/provider-facing layer of this ecosystem,
while Supabase/PostgreSQL remains the existing backend foundation.
