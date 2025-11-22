# Lab Module

This module contains all lab/report-specific features, screens, and components.

## Directory Structure

```
modules/lab/
├── pages/              # Lab screens/pages
│   ├── index.tsx      # Lab home dashboard
│   ├── process-request.tsx # Handle lab requests
│   ├── register.tsx   # Lab registration
│   ├── view-reports.tsx # View test reports
│   ├── timeline.tsx   # Document timeline
│   └── upload-document.tsx # Upload documents
├── components/        # Lab-specific components
│   ├── LabTestForm.tsx
│   ├── DocumentTimeline.tsx
│   └── DocumentTimeline3D.tsx
├── services/         # Lab-specific services
│   └── QRCodeService.ts
├── hooks/            # Lab-specific hooks
└── contexts/         # Lab-specific contexts
    └── LabRequestContext.tsx
```

## Features

- **Lab Home** - Main dashboard for lab personnel
- **Process Request** - Handle incoming lab test requests
- **Registration** - Lab facility registration
- **View Reports** - Access and manage test reports
- **Timeline** - Track document workflow and status
- **Upload Documents** - Submit test results and documents
- **QR Code Scanning** - Scan patient/request QR codes

## Components

### LabTestForm

Form for creating and managing lab tests.

```tsx
import { LabTestForm } from '@/modules/lab/components/LabTestForm';

<LabTestForm onSubmit={(test) => {...}} />
```

### DocumentTimeline

Timeline visualization of document workflow.

```tsx
import { DocumentTimeline } from '@/modules/lab/components/DocumentTimeline';

<DocumentTimeline events={events} />;
```

### DocumentTimeline3D

3D visualization of document timeline (optional).

```tsx
import { DocumentTimeline3D } from '@/modules/lab/components/DocumentTimeline3D';

<DocumentTimeline3D events={events} />;
```

## Services

### QRCodeService

Service for QR code generation and scanning.

```tsx
import { QRCodeService } from '@/modules/lab/services/QRCodeService';

const qrCode = QRCodeService.generateCode(data);
```

## Contexts

### LabRequestContext

Global state management for lab requests.

```tsx
import { useLabRequest } from '@/modules/lab/contexts/LabRequestContext';

const { requests, addRequest } = useLabRequest();
```

## Usage

Import from barrel export:

```tsx
import {
  LabHome,
  LabTestForm,
  DocumentTimeline,
  QRCodeService,
} from '@/modules/lab';
```

Or direct import:

```tsx
import LabHome from '@/modules/lab/pages/index';
```

## Extending the Module

When adding new features:

1. Create new page in `pages/`
2. Create related components in `components/`
3. Add services to `services/` if needed
4. Add state management to `contexts/` if needed
5. Update `modules/lab/index.ts` barrel exports

## Related Modules

- **Shared Module** - For common components and auth
- **Doctor Module** - For receiving test orders
- **Patient Module** - For accessing patient data
