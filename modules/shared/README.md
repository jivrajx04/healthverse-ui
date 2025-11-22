# Shared Module

This module contains shared features, components, and utilities used across all roles (Patient, Doctor, Lab).

## Directory Structure

```
modules/shared/
├── pages/              # Shared/common screens
│   ├── index.tsx      # Main onboarding/auth
│   ├── login.tsx      # Login screen
│   ├── verify-otp.tsx # OTP verification
│   ├── profile.tsx    # User profile (role-agnostic)
│   └── success-confirmation.tsx # Success confirmation
├── components/        # Reusable shared components
│   ├── ContinueButton.tsx
│   ├── MobileNumberInput.tsx
│   ├── OnboardingSlide1.tsx
│   ├── OnboardingSlide2.tsx
│   ├── OnboardingSlide3.tsx
│   ├── PremiumHealthIcon.tsx
│   ├── PrimaryButton.tsx
│   ├── QRScanner.tsx
│   ├── RoleSelector.tsx
│   └── ShareProfile.tsx
├── services/         # Shared services
│   ├── AuthFlowService.ts
│   └── MockAuthService.ts
├── hooks/            # Shared hooks
└── contexts/         # Shared contexts
    └── ThemeContext.tsx
```

## Features

### Pages

- **Onboarding/Auth** - Main entry point with role selection
- **Login** - User authentication
- **OTP Verification** - Two-factor authentication
- **Profile** - User profile management (shared across roles)
- **Success Confirmation** - Post-action confirmation screens

### Components

#### UI Components

- **PrimaryButton** - Primary action button
- **ContinueButton** - Continue/next button
- **MobileNumberInput** - Phone number input with validation
- **QRScanner** - QR code scanning component

#### Onboarding Components

- **OnboardingSlide1, 2, 3** - Onboarding flow slides
- **RoleSelector** - User role selection component
- **PremiumHealthIcon** - Application icon
- **ShareProfile** - Profile sharing component

### Services

#### AuthFlowService

Handles authentication flow and state management.

```tsx
import { AuthFlowService } from '@/modules/shared/services/AuthFlowService';

const authService = new AuthFlowService();
await authService.login(phone, password);
```

#### MockAuthService

Mock authentication for development/testing.

```tsx
import { MockAuthService } from '@/modules/shared/services/MockAuthService';

const mockAuth = new MockAuthService();
await mockAuth.login(phone, password);
```

### Contexts

#### ThemeContext

Application-wide theme management (light/dark mode).

```tsx
import { useTheme } from '@/modules/shared/contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();
```

## Usage

### Importing Components

From barrel export:

```tsx
import { PrimaryButton, ContinueButton, RoleSelector } from '@/modules/shared';
```

Direct import:

```tsx
import PrimaryButton from '@/modules/shared/components/PrimaryButton';
```

### Importing Services

```tsx
import { AuthFlowService, MockAuthService } from '@/modules/shared';
```

### Using Contexts

```tsx
import { useTheme } from '@/modules/shared';

export default function MyComponent() {
  const { theme } = useTheme();

  return <View style={{ backgroundColor: theme.bg }} />;
}
```

## Best Practices

1. **Keep components generic** - Don't tie components to specific roles
2. **Use TypeScript** - Define prop interfaces for all components
3. **Document components** - Include JSDoc comments
4. **Responsive design** - Ensure components work on all screen sizes
5. **Accessibility** - Add proper labels and semantic HTML

## Adding New Shared Components

1. Create component in `components/`
2. Export from `modules/shared/index.ts`
3. Add to this README with usage example
4. Consider if it should be in a specific role module instead

## Extending the Module

When adding new features:

1. Create new page in `pages/` for screens
2. Create new component in `components/` for reusable UI
3. Add service in `services/` if needed
4. Add context in `contexts/` for state management
5. Update `modules/shared/index.ts` barrel exports

## Related Modules

- **Patient Module** - Uses shared auth and UI components
- **Doctor Module** - Uses shared auth and UI components
- **Lab Module** - Uses shared auth and UI components
