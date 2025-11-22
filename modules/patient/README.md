# Patient Module

This module contains all patient-specific features, screens, and components.

## Directory Structure

```
modules/patient/
├── pages/              # Patient screens/pages
│   ├── index.tsx      # Patient home dashboard
│   └── register.tsx   # Patient registration
├── components/        # Patient-specific components
│   └── ProfileCard.tsx
├── services/         # Patient-specific services
├── hooks/            # Patient-specific hooks
└── contexts/         # Patient-specific contexts
```

## Features

- **Patient Home** - Main dashboard for patients
- **Registration** - Patient sign-up flow
- **Profile Management** - View and update patient profile

## Components

### ProfileCard

Displays patient profile information in a card format.

```tsx
import { ProfileCard } from '@/modules/patient/components/ProfileCard';

<ProfileCard />;
```

## Usage

Import from barrel export:

```tsx
import { PatientHome, RegisterPatient, ProfileCard } from '@/modules/patient';
```

Or direct import:

```tsx
import PatientHome from '@/modules/patient/pages/index';
```

## Extending the Module

When adding new features:

1. Create new page in `pages/`
2. Create related components in `components/`
3. Add services to `services/` if needed
4. Update `modules/patient/index.ts` barrel exports

## Related Modules

- **Shared Module** - For common components (buttons, inputs, etc.)
- **Lab Module** - For report and test-related features
