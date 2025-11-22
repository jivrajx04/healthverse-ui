import { Stack } from 'expo-router';

export default function CommonLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="profile" />
      <Stack.Screen name="success-confirmation" />
    </Stack>
  );
}
