import { Stack } from 'expo-router';

export default function DoctorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="appointments" />
      <Stack.Screen name="patient-profile" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
