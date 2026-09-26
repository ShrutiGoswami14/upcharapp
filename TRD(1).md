# Upchar Health Mobile App --- Technical Requirements Document (TRD)

**Product:** Upchar Health\
**Platform:** Android / iOS\
**Framework:** Expo + React Native\
**Routing:** Expo Router\
**Language:** TypeScript\
**Backend:** Existing Supabase + PostgreSQL\
**Architecture:** Role-based mobile client over existing Supabase
backend\
**Document Version:** 1.0\
**Date:** 25 September 2026

------------------------------------------------------------------------

# 1. Technical Overview

The Upchar Health mobile application is a React Native application built
with Expo.

The application uses:

-   Expo
-   React Native
-   Expo Router
-   TypeScript
-   Supabase backend
-   PostgreSQL database
-   Supabase Auth
-   Supabase Storage where required
-   Existing Upchar Health backend schema and security policies

The mobile application must consume the existing backend rather than
creating a second backend.

------------------------------------------------------------------------

# 2. Current Package Baseline

The provided project package configuration is:

``` json
{
  "name": "upchar-app",
  "license": "0BSD",
  "main": "expo-router/entry",
  "version": "57.0.27",
  "dependencies": {
    "@expo/ui": "~57.0.20",
    "expo": "~57.0.25",
    "expo-constants": "~57.0.19",
    "expo-device": "~57.0.2",
    "expo-font": "~57.0.4",
    "expo-glass-effect": "~57.0.4",
    "expo-image": "~57.0.5",
    "expo-linking": "~57.0.11",
    "expo-router": "~57.0.23",
    "expo-splash-screen": "~57.0.9",
    "expo-status-bar": "~57.0.1",
    "expo-symbols": "~57.0.3",
    "expo-system-ui": "~57.0.4",
    "expo-web-browser": "~57.0.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.3",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.1"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "typescript": "~6.0.3"
  }
}
```

The implementation must preserve the Expo-compatible version matrix
unless there is a deliberate dependency upgrade.

------------------------------------------------------------------------

# 3. Architecture

``` text
                    UPCHAR HEALTH MOBILE APP
                             │
                     Expo / React Native
                             │
                     Expo Router
                             │
             ┌───────────────┼────────────────┐
             │               │                │
          Patient          Doctor         Provider
          Routes           Routes           Routes
                                             │
                                  ┌──────────┼──────────┐
                                  │          │          │
                                Clinic     Medical   Diagnostic
             │
             └───────────────────┬─────────────────────┘
                                 │
                         Shared Services
                                 │
                       Supabase Client Layer
                                 │
              ┌──────────────────┼─────────────────┐
              │                  │                 │
          Supabase Auth       PostgreSQL        Storage
              │                  │                 │
              └──────────────────┼─────────────────┘
                                 │
                       Existing Upchar Backend
```

------------------------------------------------------------------------

# 4. Architectural Principles

1.  Mobile application is a client, not the authorization authority.
2.  Supabase RLS is the final database authorization layer.
3.  Role determines navigation and UI access.
4.  Backend permissions determine actual data/action access.
5.  No Supabase service-role key may exist in the mobile application.
6.  Sensitive healthcare data must not be unnecessarily stored locally.
7.  Reusable components must be shared across dashboards.
8.  Provider-specific features should be isolated by role.
9.  Business logic should not be duplicated across every screen.
10. API/database access should be centralized in service/repository
    modules.

------------------------------------------------------------------------

# 5. Recommended Project Structure

``` text
upchar-app/
│
├── app/
│   ├── _layout.tsx
│   │
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── verify-otp.tsx
│   │   └── forgot-password.tsx
│   │
│   ├── (patient)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── appointments/
│   │   ├── records/
│   │   ├── explore/
│   │   └── profile/
│   │
│   ├── (doctor)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── appointments/
│   │   ├── patients/
│   │   ├── analytics/
│   │   └── profile/
│   │
│   ├── (clinic)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── appointments/
│   │   ├── doctors/
│   │   ├── patients/
│   │   └── profile/
│   │
│   ├── (medical)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── orders/
│   │   ├── prescriptions/
│   │   ├── inventory/
│   │   └── profile/
│   │
│   └── (diagnostic)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── bookings/
│       ├── tests/
│       ├── reports/
│       └── profile/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── appointments/
│   │   ├── queue/
│   │   ├── records/
│   │   └── forms/
│   │
│   ├── services/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── profiles.ts
│   │   │   ├── appointments.ts
│   │   │   ├── doctors.ts
│   │   │   ├── clinics.ts
│   │   │   ├── medical.ts
│   │   │   ├── diagnostics.ts
│   │   │   ├── prescriptions.ts
│   │   │   └── records.ts
│   │   │
│   │   └── notifications/
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProfile.ts
│   │   ├── useAppointments.ts
│   │   ├── useQueue.ts
│   │   └── useNotifications.ts
│   │
│   ├── stores/
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── profile.ts
│   │   ├── appointment.ts
│   │   ├── provider.ts
│   │   ├── prescription.ts
│   │   └── diagnostic.ts
│   │
│   ├── constants/
│   │   └── roles.ts
│   │
│   └── theme/
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       ├── radius.ts
│       └── shadows.ts
│
├── assets/
├── scripts/
├── app.json
├── package.json
└── tsconfig.json
```

------------------------------------------------------------------------

# 6. Navigation Architecture

The root router determines authentication state and role.

``` text
Root
 │
 ├── Unauthenticated
 │      └── Auth routes
 │
 └── Authenticated
        │
        └── Role Resolver
              │
              ├── patient
              ├── doctor
              ├── clinic
              ├── medical
              └── diagnostic
```

Example:

``` ts
switch (profile.role) {
  case "patient":
    return <Redirect href="/(patient)" />;
  case "doctor":
    return <Redirect href="/(doctor)" />;
  case "clinic":
    return <Redirect href="/(clinic)" />;
  case "medical":
    return <Redirect href="/(medical)" />;
  case "diagnostic":
    return <Redirect href="/(diagnostic)" />;
}
```

Actual implementation should follow the project's Expo Router
conventions.

------------------------------------------------------------------------

# 7. Supabase Client

A single configured Supabase client should be used.

Example:

``` ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);
```

The exact environment configuration should follow the project's Expo
configuration.

### Required rule

Never use:

``` text
SUPABASE_SERVICE_ROLE_KEY
```

inside the mobile application.

Only the public/anon client key intended for RLS-protected client access
should be exposed.

------------------------------------------------------------------------

# 8. Environment Configuration

Use environment variables for environment-specific configuration.

Example:

``` text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Do not commit secrets to Git.

Use separate development/staging/production configuration where the
backend environment supports it.

------------------------------------------------------------------------

# 9. Authentication Flow

``` text
App Launch
   ↓
Restore Supabase Session
   ↓
Session Exists?
 ┌─┴───────────────┐
No                 Yes
│                   │
Auth Screen         Load Profile
                    ↓
                  Role?
                    ↓
             Role Dashboard
```

The app must handle:

-   Session restoration
-   Expired sessions
-   Logout
-   Authentication errors
-   Profile not found
-   Role not assigned
-   Provider pending verification

------------------------------------------------------------------------

# 10. Profile Bootstrap

After authentication:

``` text
auth.users
    ↓
profiles
    ↓
role-specific table
    ↓
permissions/status
    ↓
navigation
```

The application should not assume that authentication alone means
onboarding is complete.

------------------------------------------------------------------------

# 11. Role Model

Recommended logical role values:

``` ts
type UserRole =
  | "patient"
  | "doctor"
  | "clinic"
  | "medical"
  | "diagnostic"
  | "admin";
```

The `admin` role should normally use the existing admin portal rather
than the standard mobile provider dashboard unless a mobile admin
feature is explicitly required.

------------------------------------------------------------------------

# 12. Data Access Layer

Screens should not contain large Supabase queries directly.

Bad:

``` tsx
// screen containing complex database logic
const { data } = await supabase
  .from("appointments")
  ...
```

Preferred:

``` text
Screen
  ↓
Hook
  ↓
Service
  ↓
Supabase
```

Example:

``` text
useAppointments()
      ↓
appointmentService.getPatientAppointments()
      ↓
supabase.from("appointments")
```

This improves testing, reuse and maintainability.

------------------------------------------------------------------------

# 13. Database Integration

The mobile app will use the existing PostgreSQL schema.

Relevant existing/product entities include concepts such as:

-   profiles
-   role/provider records
-   doctors
-   clinics
-   medical providers
-   diagnostic providers
-   appointments
-   prescriptions
-   diagnostic bookings
-   blog/content
-   provider schedules
-   patient records
-   notifications

The exact table and column names must be taken from the current Supabase
schema rather than recreated from this document.

------------------------------------------------------------------------

# 14. Row Level Security

RLS is mandatory.

Example conceptual policy:

### Patient

A patient can read their own appointments:

``` sql
auth.uid() = patient_user_id
```

### Doctor

A doctor can read appointments assigned to the doctor:

``` sql
auth.uid() = doctor_user_id
```

### Clinic

A clinic user can access records associated with the clinic according to
provider membership.

### Diagnostic

Diagnostic users can access bookings associated with their diagnostic
centre.

### Medical

Medical users can access orders associated with their medical store.

These are conceptual examples. Actual policies must match the existing
database schema.

------------------------------------------------------------------------

# 15. Appointment Architecture

Appointment creation should be treated as a transactional workflow.

``` text
Patient selects provider
        ↓
Fetch availability
        ↓
Select date/session
        ↓
Validate availability
        ↓
Create appointment
        ↓
Generate/assign token if queue-enabled
        ↓
Persist appointment
        ↓
Return confirmation
```

The backend must be authoritative for:

-   Availability
-   Duplicate booking prevention
-   Token assignment
-   Appointment state
-   Payment verification where applicable

The client must not independently calculate a token and assume it is
valid.

------------------------------------------------------------------------

# 16. Queue Architecture

Queue data should be derived from the authoritative backend state.

Conceptual:

``` text
appointment
    ↓
queue/token
    ↓
current token
    ↓
patient token
    ↓
patients ahead
    ↓
estimated wait
```

### Real-time

If the existing Supabase backend supports Realtime for the relevant
table/channel, use it for queue updates.

Example conceptual subscription:

``` ts
supabase
  .channel(`queue-${clinicId}`)
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "appointments"
    },
    handleQueueChange
  )
  .subscribe();
```

Subscriptions must be scoped carefully to avoid leaking data between
patients/providers.

------------------------------------------------------------------------

# 17. Doctor Prescription Flow

``` text
Doctor
  ↓
Select patient/appointment
  ↓
Create prescription
  ↓
Add medicines
  ↓
Add dosage/frequency/duration
  ↓
Save
  ↓
Associate with patient record
  ↓
Patient can view authorized prescription
```

The backend should validate doctor permissions.

------------------------------------------------------------------------

# 18. Diagnostic Flow

``` text
Patient
  ↓
Select diagnostic centre
  ↓
Select test
  ↓
Select slot
  ↓
Create booking
  ↓
Diagnostic dashboard
  ↓
Sample collection
  ↓
Processing
  ↓
Report upload/finalization
  ↓
Patient report access
```

Report files should be stored using secure Supabase Storage policies
where supported.

------------------------------------------------------------------------

# 19. Medical Order Flow

``` text
Patient / authorized source
       ↓
Prescription / medicine request
       ↓
Medical store
       ↓
Review
       ↓
Accept / reject
       ↓
Fulfillment
       ↓
Completed
```

Do not expose medical records or prescriptions to a medical store beyond
the data required and authorized for the specific workflow.

------------------------------------------------------------------------

# 20. Storage Architecture

Healthcare documents may include:

-   Prescriptions
-   Diagnostic reports
-   Provider documents
-   Profile images
-   Other authorized healthcare documents

Use Supabase Storage with private buckets for sensitive documents.

Conceptual:

``` text
Private Bucket
   ↓
RLS / Storage Policies
   ↓
Authorized user
   ↓
Signed/authorized access
```

Do not make sensitive health documents publicly accessible.

------------------------------------------------------------------------

# 21. Image Handling

The project already uses:

``` text
expo-image
```

Use it for:

-   Doctor profile images
-   Clinic images
-   Diagnostic centre images
-   Medical store images

Profile images should be validated for:

-   Type
-   File size
-   Dimensions

The backend should enforce final storage constraints.

------------------------------------------------------------------------

# 22. UI Component Architecture

Create reusable components.

### Common

``` text
AppHeader
SearchBar
Button
Input
StatusBadge
Avatar
EmptyState
ErrorState
LoadingState
BottomSheet
Modal
```

### Dashboard

``` text
StatCard
QuickAction
AppointmentCard
QueueCard
ProviderCard
PatientCard
ReportCard
PrescriptionCard
OrderCard
```

### Principle

Role dashboards should compose shared components rather than duplicate
them.

------------------------------------------------------------------------

# 23. Theme System

Create centralized theme tokens.

Example:

``` ts
export const colors = {
  primary: "#0F766E",
  primaryLight: "#E6FFFB",
  success: "#16A34A",
  warning: "#F59E0B",
  error: "#DC2626",
  info: "#2563EB",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
};
```

Spacing should also be tokenized:

``` ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};
```

Avoid arbitrary spacing values throughout the application.

------------------------------------------------------------------------

# 24. State Management

Separate state into:

### Server state

-   Appointments
-   Doctors
-   Clinics
-   Diagnostic bookings
-   Prescriptions
-   Reports
-   Orders

This should be fetched from Supabase through services/hooks.

### Local UI state

-   Modal visibility
-   Selected tab
-   Form state
-   Search input
-   Temporary filters

Avoid putting all Supabase data into a global store.

------------------------------------------------------------------------

# 25. Form Architecture

Forms must:

-   Validate input.
-   Show field-level errors.
-   Disable submit during submission.
-   Prevent duplicate submissions.
-   Display backend errors.
-   Preserve input where appropriate.

Example:

``` text
Input
 ↓
Validation
 ↓
Submit
 ↓
Loading
 ↓
Backend
 ↓
Success / Error
```

------------------------------------------------------------------------

# 26. Loading Strategy

Use:

-   Skeletons for dashboard cards/lists where possible.
-   Activity indicators for short actions.
-   Pull-to-refresh for appropriate lists.
-   Pagination for large lists.

Do not load an entire patient/provider dataset on first screen load.

------------------------------------------------------------------------

# 27. Pagination

Large datasets must be paginated.

Potential pagination targets:

-   Appointments
-   Patient lists
-   Provider lists
-   Records
-   Reports
-   Orders
-   Notifications

Use database-side pagination rather than downloading all rows to the
device.

------------------------------------------------------------------------

# 28. Search

Search should use backend/database queries.

Do not fetch thousands of doctors to the phone and filter them locally.

Recommended:

``` text
Search input
    ↓
Debounce
    ↓
Supabase query
    ↓
Paginated results
```

For large-scale search, PostgreSQL indexes/full-text search can be
introduced at the backend layer.

------------------------------------------------------------------------

# 29. Notifications

Notification architecture:

``` text
Backend event
    ↓
Notification service
    ↓
Push provider / notification mechanism
    ↓
Expo/native notification layer
    ↓
Device
    ↓
Deep link
    ↓
Relevant screen
```

Examples:

``` text
Appointment confirmed
        ↓
/appointments/:id
```

``` text
Diagnostic report ready
        ↓
/records/reports/:id
```

Notification payloads should avoid putting sensitive medical information
directly into notification text when unnecessary.

------------------------------------------------------------------------

# 30. Deep Linking

Expo Router should support links to important resources.

Conceptual examples:

``` text
upchar://appointment/<id>
upchar://doctor/<id>
upchar://diagnostic-report/<id>
upchar://prescription/<id>
```

The application must verify authentication and authorization before
displaying protected content.

------------------------------------------------------------------------

# 31. Security Requirements

## Never store

-   Supabase service-role key
-   Private backend secrets
-   Payment secret keys
-   Admin credentials

in the application bundle.

## Secure access

Use:

-   Supabase Auth
-   RLS
-   Storage policies
-   HTTPS
-   Secure session persistence supported by the Expo environment

## Logging

Never log:

-   Passwords
-   OTPs
-   Access tokens
-   Full medical reports
-   Sensitive patient information

------------------------------------------------------------------------

# 32. Performance Requirements

The app should target:

-   Fast initial route rendering
-   Lazy loading of secondary screens
-   Optimized images
-   Paginated lists
-   Minimal unnecessary re-renders
-   Reusable memoized components where profiling shows benefit
-   Efficient Supabase queries

Dashboard APIs should fetch only fields needed by the dashboard.

Avoid:

``` text
Dashboard
 ↓
20 database queries
 ↓
Huge payload
```

Prefer role-specific dashboard queries/views or carefully composed
queries.

------------------------------------------------------------------------

# 33. Offline & Network Handling

The app should gracefully handle:

-   No internet
-   Slow network
-   Request timeout
-   Supabase unavailable
-   Session expiration

Critical healthcare actions such as appointment creation must not
silently succeed while offline.

Display:

> You're offline. Please reconnect to continue.

------------------------------------------------------------------------

# 34. Error Handling

Create a centralized error mapping layer.

Examples:

``` text
AUTH_REQUIRED
SESSION_EXPIRED
PERMISSION_DENIED
NETWORK_ERROR
VALIDATION_ERROR
BOOKING_UNAVAILABLE
QUEUE_UNAVAILABLE
SERVER_ERROR
```

Convert technical errors into understandable UI messages.

Do not expose raw PostgreSQL/Supabase errors to patients.

------------------------------------------------------------------------

# 35. Environment Separation

Recommended environments:

``` text
Development
     ↓
Staging
     ↓
Production
```

Each environment should have separate:

-   Supabase project/configuration where applicable
-   Environment variables
-   Database data
-   Storage buckets
-   Notification configuration

Never test destructive database operations against production.

------------------------------------------------------------------------

# 36. Testing Strategy

## Unit tests

Test:

-   Validation
-   Formatters
-   Status mapping
-   Queue calculations shown by the client
-   Utility functions

## Component tests

Test:

-   AppointmentCard
-   QueueCard
-   ProviderCard
-   StatusBadge
-   Forms
-   Empty/error states

## Integration tests

Test:

-   Authentication
-   Profile loading
-   Role routing
-   Appointment creation
-   Queue updates
-   Prescription flow
-   Diagnostic booking

## E2E

Critical journeys:

``` text
Login
 ↓
Patient dashboard
 ↓
Find doctor
 ↓
Book appointment
 ↓
View appointment
 ↓
Track queue
```

Provider:

``` text
Doctor login
 ↓
Doctor dashboard
 ↓
View appointment
 ↓
Manage queue
 ↓
Create prescription
```

------------------------------------------------------------------------

# 37. Backend Compatibility Requirement

Before implementing database services, inspect the existing Supabase
schema.

Do not create duplicate tables merely because the mobile app needs a
feature.

Required verification:

-   Table names
-   Column names
-   Foreign keys
-   RLS policies
-   Storage buckets
-   Functions
-   Triggers
-   Existing enums
-   Existing status values
-   Existing provider relationships

The mobile implementation must adapt to the existing Upchar backend.

------------------------------------------------------------------------

# 38. Data Model Concept

The exact schema must follow the existing database, but the logical
model is:

``` text
User
 │
 └── Profile
       │
       └── Role
             │
             ├── Patient
             │
             ├── Doctor
             │      └── Clinic Association
             │
             ├── Clinic
             │      └── Doctors
             │
             ├── Medical
             │
             └── Diagnostic
```

Healthcare workflows:

``` text
Patient
   │
   ├── Appointments ─── Doctor
   │                     │
   │                     └── Clinic
   │
   ├── Prescriptions ─── Doctor
   │
   ├── Diagnostic Bookings ─── Diagnostic
   │
   └── Orders ─── Medical
```

------------------------------------------------------------------------

# 39. Role-Based Access Matrix

  ------------------------------------------------------------------------------------
  Capability            Patient          Doctor       Clinic      Medical   Diagnostic
  --------------- ------------- --------------- ------------ ------------ ------------
  Own profile              CRUD            CRUD         CRUD         CRUD         CRUD

  Find doctors             Read            Read         Read         Read         Read

  Book                   Create              \-       Manage           \-           \-
  appointment                                                             

  Manage doctor              \-             Own       Clinic           \-           \-
  appointments                                                            

  Queue tracking            Own          Manage       Manage           \-           \-

  Prescriptions        Read own   Create/manage      Read if         Only           \-
                                            own   authorized     required 
                                                               order data 

  Diagnostic             Create         Read if      Read if           \-   Manage own
  booking                            authorized   authorized              

  Diagnostic           Read own         Read if      Read if           \-   Manage own
  reports                            authorized   authorized              

  Medical orders    Create/view              \-           \-   Manage own           \-
                            own                                           

  Doctor                     \-     Own profile       Manage           \-           \-
  management                                          clinic              
                                                     doctors              

  Clinic                     \-      Associated   Own clinic           \-           \-
  management                                                              
  ------------------------------------------------------------------------------------

This is a product-level matrix. Actual permissions must be enforced by
database RLS and backend policies.

------------------------------------------------------------------------

# 40. Dashboard Data Requirements

## Patient dashboard

Prefer one optimized data-loading layer for:

-   Profile
-   Next appointment
-   Queue
-   Recent records
-   Recent reports
-   Notifications

## Doctor dashboard

-   Today's appointments
-   Queue state
-   Waiting patients
-   Follow-ups
-   Basic metrics

## Clinic dashboard

-   Today's appointments
-   Queue
-   Doctor availability
-   Patient counts
-   Clinic metrics

## Medical dashboard

-   Orders
-   Prescription requests
-   Inventory alerts if implemented

## Diagnostic dashboard

-   Bookings
-   Sample status
-   Processing status
-   Reports

Do not execute independent database requests for every small UI
component if a safe optimized query can provide the data.

------------------------------------------------------------------------

# 41. Recommended Hooks

``` text
useAuth()
useCurrentProfile()
useRole()
usePatientDashboard()
useDoctorDashboard()
useClinicDashboard()
useMedicalDashboard()
useDiagnosticDashboard()

useDoctors()
useDoctor()
useClinics()
useAppointments()
useAppointment()
useQueue()
usePatients()
usePrescriptions()
useRecords()
useDiagnosticBookings()
useDiagnosticReports()
useMedicalOrders()
useNotifications()
```

Hooks should expose loading/error/data/action states.

------------------------------------------------------------------------

# 42. TypeScript Types

Create domain types instead of using `any`.

Example:

``` ts
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "waiting"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show"
  | "rescheduled";
```

Use generated Supabase database types if the existing project workflow
supports them.

This reduces mismatch between PostgreSQL schema and TypeScript code.

------------------------------------------------------------------------

# 43. Database Type Generation

If supported by the existing Supabase workflow, generate TypeScript
database types from the actual database schema.

The generated type should be treated as the source of truth for:

-   Tables
-   Columns
-   Insert types
-   Update types
-   Enums

Do not manually maintain duplicate definitions for every database table.

------------------------------------------------------------------------

# 44. Image and Document Performance

Images:

-   Resize before upload when appropriate.
-   Use Expo Image.
-   Avoid loading full-resolution images in lists.

Documents:

-   Use private storage.
-   Load only when requested.
-   Use authorized/signed access.
-   Do not cache sensitive documents indefinitely.

------------------------------------------------------------------------

# 45. Accessibility & UX Technical Requirements

All interactive controls must have:

-   `accessibilityLabel`
-   Meaningful accessibility role
-   Appropriate accessible state where applicable

Touch targets should be sufficiently large.

Icons must not be the only way to communicate important actions.

------------------------------------------------------------------------

# 46. Web Compatibility

The package includes:

``` text
react-dom
react-native-web
```

The primary product target is mobile.

Web compatibility should not compromise mobile UX or healthcare
security.

Shared UI may work on web where practical, but mobile remains the
primary target.

------------------------------------------------------------------------

# 47. Expo Router Rules

Use file-based routing.

Avoid creating a second competing navigation system unless required.

Use:

``` text
app/
```

for routes.

Use:

``` text
src/
```

for reusable application logic, services, hooks, types and components.

Keep route files thin.

------------------------------------------------------------------------

# 48. Development Scripts

Current scripts:

``` bash
npm run start
npm run android
npm run ios
npm run web
npm run lint
```

Development examples:

``` bash
npm run start
```

Then use Expo's development workflow.

Android:

``` bash
npm run android
```

iOS:

``` bash
npm run ios
```

Web:

``` bash
npm run web
```

Lint:

``` bash
npm run lint
```

------------------------------------------------------------------------

# 49. Dependency Management

Do not add a library for functionality already provided by:

-   Expo
-   React Native
-   Expo Router
-   Existing project utilities

Before adding a dependency:

1.  Check Expo SDK compatibility.
2.  Check React Native compatibility.
3.  Check native build requirements.
4.  Check whether the feature can be implemented with the current stack.
5.  Update package lock consistently.

The current Expo SDK/version matrix should be preserved unless an
intentional upgrade is planned.

------------------------------------------------------------------------

# 50. Recommended Optional Dependencies

Only add these when the implementation requires them and after checking
Expo compatibility:

``` text
@supabase/supabase-js
```

for Supabase access if not already installed.

A server-state library may be introduced later if the application
complexity requires it, but it should not be added merely for the sake
of architecture.

A secure storage solution should be selected according to the
authentication/session strategy and Expo compatibility.

------------------------------------------------------------------------

# 51. Performance Budget

Initial targets:

-   Avoid unnecessarily large JS bundles.
-   Avoid large unoptimized images.
-   Dashboard first content should render as soon as required data is
    available.
-   Paginate large lists.
-   Debounce search.
-   Avoid repeated identical queries.
-   Unsubscribe from real-time channels when screens/unmounting no
    longer require them.

------------------------------------------------------------------------

# 52. Security Checklist

Before release:

``` text
[ ] No service-role key in app
[ ] No hard-coded passwords
[ ] No hard-coded OTP
[ ] RLS enabled
[ ] Storage policies verified
[ ] Role authorization verified
[ ] Sensitive logs removed
[ ] Production environment variables configured
[ ] Session expiry handled
[ ] Protected deep links checked
[ ] Database permissions tested
[ ] Provider verification states handled
```

------------------------------------------------------------------------

# 53. Release Architecture

``` text
Developer
   ↓
Git
   ↓
Development
   ↓
Testing
   ↓
Staging
   ↓
Production Supabase
   ↓
Expo build
   ↓
Android / iOS
```

Production builds should never point accidentally to development
Supabase configuration.

------------------------------------------------------------------------

# 54. Implementation Phases

## Phase 1 --- Foundation

-   Configure Expo Router
-   Configure TypeScript
-   Configure environment
-   Supabase client
-   Auth
-   Profile bootstrap
-   Theme
-   Common components

## Phase 2 --- Patient

-   Home
-   Search
-   Doctor profiles
-   Booking
-   Appointment list/details
-   Queue
-   Records
-   Prescriptions

## Phase 3 --- Doctor

-   Dashboard
-   Appointments
-   Queue
-   Patients
-   Prescriptions
-   Follow-ups
-   Availability

## Phase 4 --- Clinic

-   Dashboard
-   Doctors
-   Appointments
-   Queue
-   Patients

## Phase 5 --- Medical

-   Dashboard
-   Orders
-   Prescription requests
-   Store profile
-   Inventory if backend-ready

## Phase 6 --- Diagnostic

-   Dashboard
-   Bookings
-   Tests
-   Sample tracking
-   Reports

## Phase 7 --- Hardening

-   RLS audit
-   Performance
-   Error handling
-   Accessibility
-   Testing
-   Android/iOS release validation

------------------------------------------------------------------------

# 55. Definition of Done

A feature is complete only when:

``` text
UI implemented
     ↓
TypeScript types implemented
     ↓
Supabase service implemented
     ↓
Loading state
     ↓
Empty state
     ↓
Error state
     ↓
Authorization/RLS verified
     ↓
Mobile tested
     ↓
Lint passes
     ↓
Critical flow tested
```

------------------------------------------------------------------------

# 56. Technical Rules for AI/Developer Agents

1.  Do not replace the existing Supabase backend.
2.  Do not create a Node.js backend for this mobile app.
3.  Do not expose Supabase service-role credentials.
4.  Do not bypass RLS.
5.  Do not invent database tables or columns without checking the actual
    schema.
6.  Do not duplicate business logic across screens.
7.  Use Expo Router for navigation.
8.  Use TypeScript.
9.  Reuse shared components.
10. Keep dashboard queries optimized.
11. Never use `any` when a real type can be defined.
12. Handle loading, empty, error and offline states.
13. Protect healthcare documents.
14. Do not expose sensitive data in logs.
15. Do not put secret API keys in the mobile bundle.
16. Keep role-specific routes isolated.
17. Verify authorization on the backend, not only in UI.
18. Do not implement telemedicine as an active feature unless explicitly
    requested.
19. Do not claim AI diagnosis functionality unless a separate approved
    model/service and safety workflow exists.
20. Do not modify unrelated working functionality while implementing a
    feature.
21. Follow the current Expo SDK compatibility matrix.
22. Test Android first and maintain iOS compatibility.
23. Prefer simple, maintainable solutions over unnecessary libraries.
24. Keep route files thin and business logic in services/hooks.
25. Use the existing PostgreSQL schema as the source of truth.

------------------------------------------------------------------------

# 57. Final Technical Architecture

``` text
                 ┌─────────────────────────┐
                 │     Expo React Native   │
                 │       TypeScript        │
                 └────────────┬────────────┘
                              │
                       Expo Router
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
     Patient                Doctor              Providers
        │                     │                     │
        │                     │             ┌───────┼────────┐
        │                     │             │       │        │
      Clinic              Medical       Clinic  Medical  Diagnostic
        │                     │             │       │        │
        └─────────────────────┴─────────────┴───────┴────────┘
                              │
                       Service Layer
                              │
                         Supabase SDK
                              │
                ┌─────────────┼─────────────┐
                │             │             │
             Auth         PostgreSQL      Storage
                │             │             │
                └─────────────┼─────────────┘
                              │
                   Existing Upchar Backend
```

The architecture should remain modular enough to add future Upchar
capabilities without rewriting the existing role dashboards.
