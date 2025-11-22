# 🚀 Quick Reference Guide - New Code Structure

## TL;DR - What Changed?

Your code has been reorganized into **role-based modules**:

```
modules/
├── patient/     ← Patient features
├── doctor/      ← Doctor features
├── lab/         ← Lab/Report features
└── shared/      ← Common components
```

No code was deleted. Everything still works. New structure is cleaner and more scalable.

---

## Where to Find Things

### I need Patient features

📁 **Location:** `modules/patient/`

```typescript
import { PatientHome, ProfileCard } from '@/modules/patient';
```

### I need Doctor features

📁 **Location:** `modules/doctor/`

```typescript
import { DoctorHome, PrescriptionForm } from '@/modules/doctor';
```

### I need Lab/Report features

📁 **Location:** `modules/lab/`

```typescript
import { LabHome, LabTestForm, QRCodeService } from '@/modules/lab';
```

### I need Shared components

📁 **Location:** `modules/shared/`

```typescript
import { PrimaryButton, AuthFlowService } from '@/modules/shared';
```

---

## Common Tasks

### ✅ Add a new Patient screen

```bash
# 1. Create the page
modules/patient/pages/my-screen.tsx

# 2. Update barrel export
# Edit: modules/patient/index.ts
export { default as MyScreen } from './pages/my-screen';

# 3. Create route wrapper (optional, for backward compatibility)
app/(tabs)/patient-my-screen.tsx
```

### ✅ Add a Doctor component

```bash
# 1. Create component
modules/doctor/components/MyComponent.tsx

# 2. Update barrel export
# Edit: modules/doctor/index.ts
export { default as MyComponent } from './components/MyComponent';

# 3. Use it
import { MyComponent } from '@/modules/doctor';
```

### ✅ Add a shared component

```bash
# 1. Create component
modules/shared/components/MyButton.tsx

# 2. Update barrel export
# Edit: modules/shared/index.ts
export { default as MyButton } from './components/MyButton';

# 3. Use it anywhere
import { MyButton } from '@/modules/shared';
```

---

## Import Cheatsheet

| Need                | Import                                                  |
| ------------------- | ------------------------------------------------------- |
| Patient home        | `import { PatientHome } from '@/modules/patient'`       |
| Doctor appointments | `import { DoctorAppointments } from '@/modules/doctor'` |
| Lab form            | `import { LabTestForm } from '@/modules/lab'`           |
| Primary button      | `import { PrimaryButton } from '@/modules/shared'`      |
| Theme               | `import { useTheme } from '@/modules/shared'`           |
| Auth service        | `import { AuthFlowService } from '@/modules/shared'`    |
| QR code             | `import { QRCodeService } from '@/modules/lab'`         |

---

## Module Contents at a Glance

### 📱 Patient Module

- **Screens:** Home, Registration
- **Components:** Profile card
- **Use for:** Patient-specific features

### 👨‍⚕️ Doctor Module

- **Screens:** Home, Appointments, Patient profiles, Profile, Registration
- **Components:** Prescription forms
- **Use for:** Doctor-specific features

### 🧪 Lab Module

- **Screens:** Home, Process requests, View reports, Timeline, Document upload, Registration
- **Components:** Test forms, Document timeline
- **Services:** QR code scanning
- **Contexts:** Lab requests
- **Use for:** Lab and report-related features

### 🎨 Shared Module

- **Screens:** Auth/Onboarding, Profile, Success
- **Components:** Buttons, inputs, slides, icons
- **Services:** Authentication
- **Contexts:** Theme management
- **Use for:** Everything shared across modules

---

## File Organization Quick Reference

```
Searching for something?

Patient Profile Card?
→ modules/patient/components/ProfileCard.tsx

Doctor Prescriptions?
→ modules/doctor/components/PrescriptionForm.tsx

Lab Test Form?
→ modules/lab/components/LabTestForm.tsx

Primary Button?
→ modules/shared/components/PrimaryButton.tsx

Auth Service?
→ modules/shared/services/AuthFlowService.ts

Theme Context?
→ modules/shared/contexts/ThemeContext.tsx

QR Code Service?
→ modules/lab/services/QRCodeService.ts
```

---

## Old vs New Import Paths

### Patient Component

```typescript
// OLD ❌
import ProfileCard from '@/components/ProfileCard';

// NEW ✅
import { ProfileCard } from '@/modules/patient';
```

### Doctor Component

```typescript
// OLD ❌
import PrescriptionForm from '@/components/PrescriptionForm';

// NEW ✅
import { PrescriptionForm } from '@/modules/doctor';
```

### Shared Component

```typescript
// OLD ❌
import PrimaryButton from '@/components/PrimaryButton';

// NEW ✅
import { PrimaryButton } from '@/modules/shared';
```

### Service

```typescript
// OLD ❌
import { QRCodeService } from '@/services/QRCodeService';

// NEW ✅
import { QRCodeService } from '@/modules/lab';
```

### Context

```typescript
// OLD ❌
import { ThemeProvider } from '@/contexts/ThemeContext';

// NEW ✅
import { ThemeProvider } from '@/modules/shared';
```

---

## Routes at a Glance

```
app/
├── (tabs)/              ← Legacy (backward compatible)
├── (auth)/              ← Login, OTP, etc.
├── (patient)/           ← Patient screens
├── (doctor)/            ← Doctor screens
├── (lab)/               ← Lab/Report screens
└── (common)/            ← Shared screens
```

---

## Best Practices ⭐

### ✅ DO

```typescript
// Use barrel exports
import { PrimaryButton, AuthFlowService } from '@/modules/shared';

// Import from appropriate module
import { DoctorHome } from '@/modules/doctor';

// Keep modules independent
// Patient module only depends on shared
```

### ❌ DON'T

```typescript
// Don't use old paths
import Component from '@/components/Component';

// Don't import deep
import Button from '@/modules/shared/components/PrimaryButton';
// Use barrel: import { PrimaryButton } from '@/modules/shared';

// Don't create cross-module dependencies
// (Patient importing from Doctor)
```

---

## Need Help?

| Question                                | Answer                                                                       |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| Where's the patient home screen?        | `modules/patient/pages/index.tsx`                                            |
| How do I add a new doctor feature?      | Add page to `modules/doctor/pages/`, update barrel export                    |
| Can I use shared components everywhere? | Yes! That's what they're for                                                 |
| Do I need to update old imports?        | Gradually - backward compatibility maintained                                |
| How do I create a new module?           | Follow the same structure: pages/, components/, services/, hooks/, contexts/ |
| Where's the auth flow?                  | `modules/shared/services/AuthFlowService.ts`                                 |

---

## Documentation

- 📖 **Full Guide:** See [MODULES_README.md](./MODULES_README.md)
- 🗺️ **Structure Details:** See [STRUCTURE.md](./STRUCTURE.md)
- 🔄 **Import Migration:** See [IMPORT_MIGRATION_GUIDE.md](./IMPORT_MIGRATION_GUIDE.md)
- 📊 **Before/After:** See [BEFORE_AND_AFTER.md](./BEFORE_AND_AFTER.md)
- ✅ **Checklist:** See [REORGANIZATION_CHECKLIST.md](./REORGANIZATION_CHECKLIST.md)

---

## What's in Each Module?

### Patient

```
modules/patient/
├── pages/
│   ├── index.tsx         (Home)
│   └── register.tsx      (Registration)
├── components/
│   └── ProfileCard.tsx
└── index.ts (Barrel exports)
```

### Doctor

```
modules/doctor/
├── pages/
│   ├── index.tsx              (Home)
│   ├── appointments.tsx
│   ├── patient-profile.tsx
│   ├── profile.tsx
│   └── register.tsx
├── components/
│   └── PrescriptionForm.tsx
└── index.ts (Barrel exports)
```

### Lab

```
modules/lab/
├── pages/
│   ├── index.tsx              (Home)
│   ├── process-request.tsx
│   ├── register.tsx
│   ├── view-reports.tsx
│   ├── timeline.tsx
│   └── upload-document.tsx
├── components/
│   ├── LabTestForm.tsx
│   ├── DocumentTimeline.tsx
│   └── DocumentTimeline3D.tsx
├── services/
│   └── QRCodeService.ts
├── contexts/
│   └── LabRequestContext.tsx
└── index.ts (Barrel exports)
```

### Shared

```
modules/shared/
├── pages/
│   ├── index.tsx                (Onboarding)
│   ├── login.tsx
│   ├── verify-otp.tsx
│   ├── profile.tsx
│   └── success-confirmation.tsx
├── components/
│   ├── PrimaryButton.tsx
│   ├── ContinueButton.tsx
│   ├── MobileNumberInput.tsx
│   ├── QRScanner.tsx
│   ├── RoleSelector.tsx
│   ├── OnboardingSlide*.tsx
│   ├── ShareProfile.tsx
│   └── PremiumHealthIcon.tsx
├── services/
│   ├── AuthFlowService.ts
│   └── MockAuthService.ts
├── contexts/
│   └── ThemeContext.tsx
└── index.ts (Barrel exports)
```

---

**Version:** 1.0  
**Last Updated:** November 22, 2025  
**Status:** Production Ready ✅
