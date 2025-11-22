# Doctor Module

This module contains all doctor-specific features, screens, and components.

## Directory Structure

```
modules/doctor/
├── pages/              # Doctor screens/pages
│   ├── index.tsx      # Doctor home dashboard
│   ├── appointments.tsx  # Appointments management
│   ├── patient-profile.tsx # View patient profile
│   ├── profile.tsx    # Doctor profile management
│   └── register.tsx   # Doctor registration
├── components/        # Doctor-specific components
│   └── PrescriptionForm.tsx
├── services/         # Doctor-specific services
├── hooks/            # Doctor-specific hooks
└── contexts/         # Doctor-specific contexts
```

## Features

- **Doctor Home** - Main dashboard for doctors
- **Appointments** - View and manage patient appointments
- **Patient Profile** - Access patient records from doctor's perspective
- **Doctor Profile** - Manage doctor profile and credentials
- **Registration** - Doctor sign-up flow
- **Prescriptions** - Create and manage prescriptions

## Components

### PrescriptionForm

Form for doctors to create and manage patient prescriptions.

```tsx
import { PrescriptionForm } from '@/modules/doctor/components/PrescriptionForm';

<PrescriptionForm onSubmit={(prescription) => {...}} />
```

## Usage

Import from barrel export:

```tsx
import {
  DoctorHome,
  DoctorAppointments,
  PrescriptionForm,
} from '@/modules/doctor';
```

Or direct import:

```tsx
import DoctorHome from '@/modules/doctor/pages/index';
```

## Extending the Module

When adding new features:

1. Create new page in `pages/`
2. Create related components in `components/`
3. Add services to `services/` if needed
4. Update `modules/doctor/index.ts` barrel exports

## Related Modules

- **Shared Module** - For common components and auth services
- **Lab Module** - For test orders and results
- **Patient Module** - For patient data references
