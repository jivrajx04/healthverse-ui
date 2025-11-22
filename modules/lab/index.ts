// Lab Pages
export { default as LabHome } from './pages/index';
export { default as ProcessRequest } from './pages/process-request';
export { default as RegisterLab } from './pages/register';
export { default as ViewReports } from './pages/view-reports';
export { default as Timeline } from './pages/timeline';
export { default as UploadDocument } from './pages/upload-document';

// Lab Components
export { default as LabTestForm } from './components/LabTestForm';
export { default as DocumentTimeline } from './components/DocumentTimeline';
export { default as DocumentTimeline3D } from './components/DocumentTimeline3D';

// Lab Services
export { default as QRCodeService } from './services/QRCodeService';

// Lab Contexts
export {
  LabRequestProvider,
  useLabRequest,
} from './contexts/LabRequestContext';
