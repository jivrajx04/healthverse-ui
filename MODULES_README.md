# 🏥 Onboarding 3.0 - Reorganized Code Structure

Welcome to the reorganized onboarding application! This project has been restructured for better maintainability and scalability by organizing code by roles and features.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Module Organization](#module-organization)
- [Quick Start](#quick-start)
- [Adding Features](#adding-features)
- [Documentation](#documentation)

## 🎯 Overview

The application has been reorganized from a flat structure into a modular, role-based architecture:

- **Patient Module** - Patient-specific features and screens
- **Doctor Module** - Doctor-specific features and screens
- **Lab Module** - Lab/Report-specific features and screens
- **Shared Module** - Common components, services, and contexts used across all roles

This structure provides:

- ✅ Better code organization and discoverability
- ✅ Reduced coupling between different role features
- ✅ Easier maintenance and testing
- ✅ Clearer dependency management
- ✅ Scalable architecture for future growth

## 📁 Project Structure

```
onboarding-3.0/
│
├── app/                          # Next-Router application routes
│   ├── _layout.tsx              # Main app layout
│   ├── (auth)/                  # Authentication routes
│   ├── (patient)/               # Patient routes
│   ├── (doctor)/                # Doctor routes
│   ├── (lab)/                   # Lab routes
│   ├── (common)/                # Common routes
│   └── (tabs)/                  # Legacy compatibility layer
│
├── modules/                      # Feature modules
│   ├── patient/                 # Patient module
│   │   ├── pages/              # Patient screens
│   │   ├── components/         # Patient-specific components
│   │   ├── services/           # Patient-specific services
│   │   ├── hooks/              # Patient-specific hooks
│   │   ├── contexts/           # Patient-specific contexts
│   │   ├── index.ts            # Barrel exports
│   │   └── README.md           # Module documentation
│   │
│   ├── doctor/                 # Doctor module
│   │   ├── pages/              # Doctor screens
│   │   ├── components/         # Doctor-specific components
│   │   ├── services/           # Doctor-specific services
│   │   ├── hooks/              # Doctor-specific hooks
│   │   ├── contexts/           # Doctor-specific contexts
│   │   ├── index.ts            # Barrel exports
│   │   └── README.md           # Module documentation
│   │
│   ├── lab/                    # Lab module
│   │   ├── pages/              # Lab screens
│   │   ├── components/         # Lab-specific components
│   │   ├── services/           # Lab-specific services
│   │   ├── hooks/              # Lab-specific hooks
│   │   ├── contexts/           # Lab-specific contexts
│   │   ├── index.ts            # Barrel exports
│   │   └── README.md           # Module documentation
│   │
│   └── shared/                 # Shared module
│       ├── pages/              # Shared screens (auth, common)
│       ├── components/         # Reusable components
│       ├── services/           # Shared services
│       ├── hooks/              # Shared hooks
│       ├── contexts/           # Shared contexts
│       ├── index.ts            # Barrel exports
│       └── README.md           # Module documentation
│
├── hooks/                       # Global hooks
├── utils/                       # Global utilities
├── assets/                      # Images, icons, etc.
├── components/                  # Legacy (gradually migrate to modules)
├── contexts/                    # Legacy (gradually migrate to modules)
└── services/                    # Legacy (gradually migrate to modules)

```

## 🧩 Module Organization

### Patient Module (`modules/patient/`)

**Responsibility:** All patient-specific features

- **Pages:** Home dashboard, registration
- **Components:** Patient profile card
- **Features:**
  - Patient onboarding & registration
  - Patient dashboard
  - Patient profile management

**Import Example:**

```typescript
import { PatientHome, ProfileCard } from '@/modules/patient';
```

### Doctor Module (`modules/doctor/`)

**Responsibility:** All doctor-specific features

- **Pages:** Home, appointments, patient profiles, profile management, registration
- **Components:** Prescription forms
- **Features:**
  - Doctor dashboard
  - Appointment management
  - Patient record access
  - Prescription management

**Import Example:**

```typescript
import {
  DoctorHome,
  DoctorAppointments,
  PrescriptionForm,
} from '@/modules/doctor';
```

### Lab Module (`modules/lab/`)

**Responsibility:** All lab/report-specific features

- **Pages:** Home, process requests, view reports, timeline, document upload, registration
- **Components:** Lab test forms, document timeline
- **Services:** QR code scanning
- **Contexts:** Lab request management
- **Features:**
  - Lab onboarding & registration
  - Test request processing
  - Report management
  - Document workflow tracking
  - QR code scanning

**Import Example:**

```typescript
import {
  LabHome,
  LabTestForm,
  DocumentTimeline,
  QRCodeService,
  LabRequestProvider,
} from '@/modules/lab';
```

### Shared Module (`modules/shared/`)

**Responsibility:** Common components, services, and utilities

- **Pages:** Authentication, onboarding, common screens
- **Components:** Buttons, inputs, sliders, icons
- **Services:** Auth flow, mock auth
- **Contexts:** Theme management
- **Features:**
  - User authentication
  - Role selection
  - Theme management
  - Reusable UI components

**Import Example:**

```typescript
import {
  PrimaryButton,
  AuthFlowService,
  ThemeProvider,
} from '@/modules/shared';
```

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Building

```bash
npm run build:web
```

## 📝 Adding Features

### Adding a Patient Feature

1. **Create page component:**

   ```typescript
   // modules/patient/pages/new-feature.tsx
   export default function NewPatientFeature() {
     return <View>{/* Your feature */}</View>;
   }
   ```

2. **Add route to app:**

   ```typescript
   // app/(patient)/_layout.tsx
   <Stack.Screen name="new-feature" />
   ```

3. **Create wrapper in (tabs) for compatibility:**

   ```typescript
   // app/(tabs)/patient-new-feature.tsx
   import NewPatientFeature from '@/modules/patient/pages/new-feature';
   export default NewPatientFeature;
   ```

4. **Update barrel exports:**
   ```typescript
   // modules/patient/index.ts
   export { default as NewPatientFeature } from './pages/new-feature';
   ```

### Adding a Shared Component

1. **Create component:**

   ```typescript
   // modules/shared/components/MyButton.tsx
   export default function MyButton() {
     return <TouchableOpacity>{/* Button */}</TouchableOpacity>;
   }
   ```

2. **Update barrel exports:**

   ```typescript
   // modules/shared/index.ts
   export { default as MyButton } from './components/MyButton';
   ```

3. **Use across modules:**
   ```typescript
   import { MyButton } from '@/modules/shared';
   ```

## 📚 Documentation

### Main Documentation Files

- **[STRUCTURE.md](./STRUCTURE.md)** - Detailed structure explanation and organization benefits
- **[IMPORT_MIGRATION_GUIDE.md](./IMPORT_MIGRATION_GUIDE.md)** - Guide for migrating imports from old to new structure
- **[modules/patient/README.md](./modules/patient/README.md)** - Patient module documentation
- **[modules/doctor/README.md](./modules/doctor/README.md)** - Doctor module documentation
- **[modules/lab/README.md](./modules/lab/README.md)** - Lab module documentation
- **[modules/shared/README.md](./modules/shared/README.md)** - Shared module documentation

### Key Concepts

#### Barrel Exports

Each module has an `index.ts` file that exports all public components, services, and utilities. This simplifies imports:

```typescript
// Instead of:
import Component1 from '@/modules/patient/components/Component1';
import Component2 from '@/modules/patient/components/Component2';
import Service1 from '@/modules/patient/services/Service1';

// Use:
import { Component1, Component2, Service1 } from '@/modules/patient';
```

#### Module Independence

Modules are designed to be relatively independent:

- Patient module doesn't depend on doctor or lab modules
- Doctor module only depends on shared and lab modules (for test orders)
- Lab module only depends on shared and doctor modules (for orders)
- All modules depend on shared module

#### Backward Compatibility

The `app/(tabs)/` directory maintains backward compatibility, allowing gradual migration of code to the new module structure.

## 🔄 Importing Best Practices

### ✅ DO

```typescript
// Use barrel exports
import { PrimaryButton, AuthFlowService } from '@/modules/shared';

// Import from specific module
import { LabTestForm } from '@/modules/lab';

// Group related imports
import { PatientHome, ProfileCard } from '@/modules/patient';
```

### ❌ DON'T

```typescript
// Don't use relative imports when absolute is available
import Button from '../../../modules/shared/components/PrimaryButton';

// Don't mix old and new paths
import OldComponent from '@/components/OldComponent';
import NewComponent from '@/modules/shared/components/NewComponent';

// Don't import from internal subdirectories if barrel export exists
import Service from '@/modules/shared/services/AuthFlowService';
// Use instead: import { AuthFlowService } from '@/modules/shared';
```

## 🎨 Architecture Patterns

### Component Structure

```typescript
// Each component should export default
export default function MyComponent({ prop }: Props) {
  return <View>{/* Component JSX */}</View>;
}
```

### Service Pattern

```typescript
// Services are typically classes or collections of functions
export default class MyService {
  static async doSomething() {
    // Implementation
  }
}
```

### Context Pattern

```typescript
// Contexts are typically React contexts with provider
export const MyContext = createContext<MyContextType | undefined>(undefined);

export function MyProvider({ children }) {
  const [state, setState] = useState();
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within MyProvider');
  return context;
}
```

## 🧪 Testing

When testing, import from the module level:

```typescript
import { PatientHome } from '@/modules/patient';
import { render } from '@testing-library/react-native';

test('Patient home renders', () => {
  render(<PatientHome />);
});
```

## 🚨 Troubleshooting

### Import Errors

- Check the file exists in the new location
- Verify barrel export includes the component
- Ensure paths use `@/` prefix for absolute imports

### Component Not Found

- Check `modules/{module}/index.ts` exports
- Verify component is in correct subdirectory
- Run `npm run typecheck` to catch TypeScript errors

### Context Provider Errors

- Ensure provider is wrapped at appropriate level
- Check context is used within provider scope
- Verify context exports are in barrel file

## 📞 Support

For questions about:

- **Module organization** → See [STRUCTURE.md](./STRUCTURE.md)
- **Specific module** → Check module-specific README.md
- **Import paths** → See [IMPORT_MIGRATION_GUIDE.md](./IMPORT_MIGRATION_GUIDE.md)
- **Adding features** → See "Adding Features" section above

## 📈 Future Improvements

- [ ] Add unit tests for modules
- [ ] Create shared hooks library
- [ ] Add E2E tests
- [ ] Create component storybook
- [ ] Add API integration layer
- [ ] Create service worker for offline support

---

**Happy coding! 🎉**
