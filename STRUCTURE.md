# Code Structure Organization

This document describes the reorganized code structure organized by roles/features (Patient, Doctor, Lab/Report, and Shared).

## New Folder Structure

```
onboarding-3.0/
├── app/
│   ├── _layout.tsx                 # Main app layout
│   ├── (tabs)/                     # Legacy routes (backward compatibility)
│   ├── (auth)/                     # Authentication screens
│   │   ├── _layout.tsx
│   │   ├── index.tsx              # Main auth screen
│   │   ├── login.tsx
│   │   └── verify-otp.tsx
│   ├── (patient)/                 # Patient module
│   │   ├── _layout.tsx
│   │   ├── index.tsx              # Patient home
│   │   └── register.tsx            # Patient registration
│   ├── (doctor)/                  # Doctor module
│   │   ├── _layout.tsx
│   │   ├── index.tsx              # Doctor home
│   │   ├── appointments.tsx
│   │   ├── patient-profile.tsx
│   │   ├── profile.tsx
│   │   └── register.tsx            # Doctor registration
│   ├── (lab)/                     # Lab module
│   │   ├── _layout.tsx
│   │   ├── index.tsx              # Lab home
│   │   ├── process-request.tsx
│   │   ├── register.tsx            # Lab registration
│   │   ├── view-reports.tsx
│   │   ├── timeline.tsx
│   │   └── upload-document.tsx
│   └── (common)/                  # Common screens
│       ├── _layout.tsx
│       ├── profile.tsx
│       └── success-confirmation.tsx
│
├── modules/
│   ├── patient/
│   │   ├── pages/                 # Patient-specific screens
│   │   │   ├── index.tsx
│   │   │   └── register.tsx
│   │   ├── components/            # Patient-specific components
│   │   │   └── ProfileCard.tsx
│   │   ├── services/              # Patient-specific services
│   │   ├── hooks/                 # Patient-specific hooks
│   │   └── contexts/              # Patient-specific contexts
│   │
│   ├── doctor/
│   │   ├── pages/                 # Doctor-specific screens
│   │   │   ├── index.tsx
│   │   │   ├── appointments.tsx
│   │   │   ├── patient-profile.tsx
│   │   │   ├── profile.tsx
│   │   │   └── register.tsx
│   │   ├── components/            # Doctor-specific components
│   │   │   └── PrescriptionForm.tsx
│   │   ├── services/              # Doctor-specific services
│   │   ├── hooks/                 # Doctor-specific hooks
│   │   └── contexts/              # Doctor-specific contexts
│   │
│   ├── lab/
│   │   ├── pages/                 # Lab/Report-specific screens
│   │   │   ├── index.tsx
│   │   │   ├── process-request.tsx
│   │   │   ├── register.tsx
│   │   │   ├── view-reports.tsx
│   │   │   ├── timeline.tsx
│   │   │   └── upload-document.tsx
│   │   ├── components/            # Lab-specific components
│   │   │   ├── LabTestForm.tsx
│   │   │   ├── DocumentTimeline.tsx
│   │   │   ├── DocumentTimeline3D.tsx
│   │   │   └── DocumentTimeline3D.native.tsx
│   │   ├── services/              # Lab-specific services
│   │   │   └── QRCodeService.ts
│   │   ├── hooks/                 # Lab-specific hooks
│   │   └── contexts/              # Lab-specific contexts
│   │       └── LabRequestContext.tsx
│   │
│   └── shared/
│       ├── pages/                 # Shared screens
│       │   ├── index.tsx          # Main auth/onboarding
│       │   ├── login.tsx
│       │   ├── verify-otp.tsx
│       │   ├── profile.tsx
│       │   └── success-confirmation.tsx
│       ├── components/            # Shared reusable components
│       │   ├── ContinueButton.tsx
│       │   ├── MobileNumberInput.tsx
│       │   ├── OnboardingSlide1.tsx
│       │   ├── OnboardingSlide2.tsx
│       │   ├── OnboardingSlide3.tsx
│       │   ├── PremiumHealthIcon.tsx
│       │   ├── PrimaryButton.tsx
│       │   ├── QRScanner.tsx
│       │   ├── RoleSelector.tsx
│       │   └── ShareProfile.tsx
│       ├── services/              # Shared services
│       │   ├── AuthFlowService.ts
│       │   └── MockAuthService.ts
│       ├── hooks/                 # Shared hooks
│       ├── contexts/              # Shared contexts
│       │   └── ThemeContext.tsx
│
├── components/                    # Legacy (backward compatibility)
├── contexts/                      # Legacy (backward compatibility)
├── hooks/
├── services/                      # Legacy (backward compatibility)
└── utils/
```

## Module Organization Benefits

### 1. **Patient Module** (`modules/patient/`)

- All patient-specific pages, components, and logic
- Patient home dashboard
- Patient registration
- Patient profile management

### 2. **Doctor Module** (`modules/doctor/`)

- All doctor-specific screens and features
- Doctor appointments management
- Patient profile viewing from doctor's perspective
- Doctor registration and profile
- Prescription forms

### 3. **Lab Module** (`modules/lab/`)

- Lab home and request processing
- Lab registration
- Report viewing and document timeline
- Document upload functionality
- QR code scanning services
- Lab-specific contexts for state management

### 4. **Shared Module** (`modules/shared/`)

- Authentication and onboarding flows
- Common components used across all roles
- Shared services (Auth, Mocking)
- Theme context for application-wide theming

## Routing Structure

### App Router Organization

- **`app/(auth)`** - Authentication routes (login, OTP verification)
- **`app/(patient)`** - Patient-specific routes
- **`app/(doctor)`** - Doctor-specific routes
- **`app/(lab)`** - Lab/Report-specific routes
- **`app/(common)`** - Common routes used by all roles
- **`app/(tabs)`** - Legacy compatibility layer (redirects to new structure)

## Import Path Updates

When importing from modules, use the following pattern:

```typescript
// Patient components
import PatientComponent from '@/modules/patient/components/...';

// Doctor components
import DoctorComponent from '@/modules/doctor/components/...';

// Lab components & services
import LabComponent from '@/modules/lab/components/...';
import { QRCodeService } from '@/modules/lab/services/QRCodeService';

// Shared components
import { PrimaryButton } from '@/modules/shared/components/...';
import { ThemeProvider } from '@/modules/shared/contexts/ThemeContext';
```

## Migration Guide

### For New Features

1. **Patient Feature** → Add to `modules/patient/pages` or `modules/patient/components`
2. **Doctor Feature** → Add to `modules/doctor/pages` or `modules/doctor/components`
3. **Lab/Report Feature** → Add to `modules/lab/pages` or `modules/lab/components`
4. **Shared Feature** → Add to `modules/shared/pages` or `modules/shared/components`

### For Existing Files

Update import paths from:

- `@/contexts/...` → `@/modules/shared/contexts/...` (if shared)
- `@/services/...` → `@/modules/{role}/services/...` (if role-specific)
- `@/components/...` → Keep in legacy for now, or move to `modules/{role}/components/`

## Backward Compatibility

The `app/(tabs)/` directory maintains backward compatibility by acting as a compatibility layer that re-exports pages from the new module structure. This allows gradual migration without breaking existing code.

## Best Practices

1. **Keep modules independent** - Avoid cross-module dependencies where possible
2. **Use shared components** - Reusable components go in `modules/shared/components/`
3. **Isolate business logic** - Role-specific logic stays in its respective module
4. **Update imports** - When moving files, update all import statements
5. **Use absolute paths** - Use `@/modules/...` for better readability

## Next Steps

1. Update all component imports in pages to use new module paths
2. Create module-specific hooks and utilities
3. Add type definitions for each module
4. Create module-specific README files with API documentation
5. Consider creating barrel exports (`index.ts`) for easier imports
