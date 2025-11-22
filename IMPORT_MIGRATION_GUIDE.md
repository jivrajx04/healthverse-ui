# Import Migration Guide

This guide helps you update imports as the codebase migrates from the flat structure to the new modular organization.

## Quick Reference

### Patient Components

**OLD:** `import { ProfileCard } from '@/components/ProfileCard'`  
**NEW:** `import { ProfileCard } from '@/modules/patient/components/ProfileCard'`  
**BARREL:** `import { ProfileCard } from '@/modules/patient'`

### Doctor Components

**OLD:** `import { PrescriptionForm } from '@/components/PrescriptionForm'`  
**NEW:** `import { PrescriptionForm } from '@/modules/doctor/components/PrescriptionForm'`  
**BARREL:** `import { PrescriptionForm } from '@/modules/doctor'`

### Lab Components & Services

**OLD:** `import { LabTestForm } from '@/components/LabTestForm'`  
**NEW:** `import { LabTestForm } from '@/modules/lab/components/LabTestForm'`  
**BARREL:** `import { LabTestForm } from '@/modules/lab'`

**OLD:** `import { QRCodeService } from '@/services/QRCodeService'`  
**NEW:** `import { QRCodeService } from '@/modules/lab/services/QRCodeService'`  
**BARREL:** `import { QRCodeService } from '@/modules/lab'`

### Shared Components

**OLD:** `import { PrimaryButton } from '@/components/PrimaryButton'`  
**NEW:** `import { PrimaryButton } from '@/modules/shared/components/PrimaryButton'`  
**BARREL:** `import { PrimaryButton } from '@/modules/shared'`

### Shared Services

**OLD:** `import { AuthFlowService } from '@/services/AuthFlowService'`  
**NEW:** `import { AuthFlowService } from '@/modules/shared/services/AuthFlowService'`  
**BARREL:** `import { AuthFlowService } from '@/modules/shared'`

### Shared Contexts

**OLD:** `import { ThemeProvider } from '@/contexts/ThemeContext'`  
**NEW:** `import { ThemeProvider } from '@/modules/shared/contexts/ThemeContext'`  
**BARREL:** `import { ThemeProvider } from '@/modules/shared'`

**OLD:** `import { LabRequestProvider } from '@/contexts/LabRequestContext'`  
**NEW:** `import { LabRequestProvider } from '@/modules/lab/contexts/LabRequestContext'`  
**BARREL:** `import { LabRequestProvider } from '@/modules/lab'`

## Migration Steps

### Step 1: Identify Current Imports

Search for all imports from old locations:

```bash
grep -r "from '@/components'" src/
grep -r "from '@/services'" src/
grep -r "from '@/contexts'" src/
```

### Step 2: Categorize by Module

- **Patient:** ProfileCard
- **Doctor:** PrescriptionForm
- **Lab:** LabTestForm, DocumentTimeline\*, QRCodeService
- **Shared:** All other components, PrimaryButton, ContinueButton, etc.

### Step 3: Update in Priority Order

1. Update shared context imports (ThemeContext) - used everywhere
2. Update shared component imports
3. Update shared service imports
4. Update module-specific imports

### Step 4: Use Barrel Exports

Prefer barrel exports for cleaner imports:

```tsx
// Instead of multiple imports
import PatientHome from '@/modules/patient/pages/index';
import ProfileCard from '@/modules/patient/components/ProfileCard';

// Use barrel export
import { PatientHome, ProfileCard } from '@/modules/patient';
```

## File-by-File Changes

### Pages Using Shared Theme

```tsx
// OLD
import { ThemeProvider } from '@/contexts/ThemeContext';

// NEW
import { ThemeProvider } from '@/modules/shared/contexts/ThemeContext';
// OR
import { ThemeProvider } from '@/modules/shared';
```

### Patient Pages

```tsx
// OLD - multiple imports from components
import ProfileCard from '@/components/ProfileCard';
import PrimaryButton from '@/components/PrimaryButton';

// NEW - with barrel exports
import { ProfileCard, PrimaryButton } from '@/modules/patient';
// Or just shared
import { PrimaryButton } from '@/modules/shared';
```

### Doctor Pages

```tsx
// OLD
import PrescriptionForm from '@/components/PrescriptionForm';
import PrimaryButton from '@/components/PrimaryButton';

// NEW
import { PrescriptionForm } from '@/modules/doctor';
import { PrimaryButton } from '@/modules/shared';
```

### Lab Pages

```tsx
// OLD
import { LabTestForm } from '@/components/LabTestForm';
import { QRCodeService } from '@/services/QRCodeService';
import { LabRequestProvider } from '@/contexts/LabRequestContext';

// NEW
import { LabTestForm, QRCodeService, LabRequestProvider } from '@/modules/lab';
```

## Component Import Mapping

| Component          | OLD Path     | NEW Path          | Barrel Export     |
| ------------------ | ------------ | ----------------- | ----------------- |
| ProfileCard        | @/components | @/modules/patient | @/modules/patient |
| PrescriptionForm   | @/components | @/modules/doctor  | @/modules/doctor  |
| LabTestForm        | @/components | @/modules/lab     | @/modules/lab     |
| DocumentTimeline   | @/components | @/modules/lab     | @/modules/lab     |
| DocumentTimeline3D | @/components | @/modules/lab     | @/modules/lab     |
| PrimaryButton      | @/components | @/modules/shared  | @/modules/shared  |
| ContinueButton     | @/components | @/modules/shared  | @/modules/shared  |
| MobileNumberInput  | @/components | @/modules/shared  | @/modules/shared  |
| OnboardingSlide1   | @/components | @/modules/shared  | @/modules/shared  |
| OnboardingSlide2   | @/components | @/modules/shared  | @/modules/shared  |
| OnboardingSlide3   | @/components | @/modules/shared  | @/modules/shared  |
| QRScanner          | @/components | @/modules/shared  | @/modules/shared  |
| RoleSelector       | @/components | @/modules/shared  | @/modules/shared  |
| ShareProfile       | @/components | @/modules/shared  | @/modules/shared  |
| PremiumHealthIcon  | @/components | @/modules/shared  | @/modules/shared  |

## Service Import Mapping

| Service         | OLD Path   | NEW Path         | Barrel Export    |
| --------------- | ---------- | ---------------- | ---------------- |
| AuthFlowService | @/services | @/modules/shared | @/modules/shared |
| MockAuthService | @/services | @/modules/shared | @/modules/shared |
| QRCodeService   | @/services | @/modules/lab    | @/modules/lab    |

## Context Import Mapping

| Context           | OLD Path   | NEW Path         | Barrel Export    |
| ----------------- | ---------- | ---------------- | ---------------- |
| ThemeContext      | @/contexts | @/modules/shared | @/modules/shared |
| LabRequestContext | @/contexts | @/modules/lab    | @/modules/lab    |

## Automated Migration (Optional)

You can use a find and replace tool to update paths:

```bash
# Update shared contexts
sed -i "s|from '@/contexts/ThemeContext'|from '@/modules/shared/contexts/ThemeContext'|g" app/**/*.tsx

# Update shared services
sed -i "s|from '@/services/AuthFlowService'|from '@/modules/shared/services/AuthFlowService'|g" app/**/*.tsx
sed -i "s|from '@/services/MockAuthService'|from '@/modules/shared/services/MockAuthService'|g" app/**/*.tsx

# Update lab services
sed -i "s|from '@/services/QRCodeService'|from '@/modules/lab/services/QRCodeService'|g" app/**/*.tsx

# Update lab contexts
sed -i "s|from '@/contexts/LabRequestContext'|from '@/modules/lab/contexts/LabRequestContext'|g" app/**/*.tsx
```

## Testing After Migration

1. Ensure app compiles without import errors
2. Test each module's functionality
3. Verify theme switching works
4. Test authentication flow
5. Check lab request context behavior

## Troubleshooting

### "Cannot find module" errors

- Check file exists at new path
- Verify barrel export includes the component
- Ensure relative paths are correct

### Components not rendering

- Check imports are named correctly
- Verify context providers are in place
- Check for circular dependencies

### TypeScript errors

- Ensure component exports are typed
- Verify prop interfaces match usage
- Check barrel exports have correct types
