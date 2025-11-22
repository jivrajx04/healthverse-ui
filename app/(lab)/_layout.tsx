import { Stack } from 'expo-router';
import { LabRequestProvider } from '../../modules/lab/contexts/LabRequestContext';

export default function LabLayout() {
  return (
    <LabRequestProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="process-request" />
        <Stack.Screen name="register" />
        <Stack.Screen name="view-reports" />
        <Stack.Screen name="timeline" />
        <Stack.Screen name="upload-document" />
      </Stack>
    </LabRequestProvider>
  );
}
