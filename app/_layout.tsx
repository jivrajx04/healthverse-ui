import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useFrameworkReady } from '../hooks/useFrameworkReady';
import { ThemeProvider } from '../modules/shared/contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

let Inter_400Regular: any;
let Inter_500Medium: any;
let Inter_600SemiBold: any;
let Inter_700Bold: any;
let PlusJakartaSans_400Regular: any;
let PlusJakartaSans_500Medium: any;
let PlusJakartaSans_600SemiBold: any;
let PlusJakartaSans_700Bold: any;
let DMSans_400Regular: any;
let DMSans_500Medium: any;
let DMSans_600SemiBold: any;
let DMSans_700Bold: any;

// Only import fonts on native platforms
if (typeof window === 'undefined' || !('document' in window)) {
  const inter = require('@expo-google-fonts/inter');
  const plusJakarta = require('@expo-google-fonts/plus-jakarta-sans');
  const dmSans = require('@expo-google-fonts/dm-sans');

  Inter_400Regular = inter.Inter_400Regular;
  Inter_500Medium = inter.Inter_500Medium;
  Inter_600SemiBold = inter.Inter_600SemiBold;
  Inter_700Bold = inter.Inter_700Bold;
  PlusJakartaSans_400Regular = plusJakarta.PlusJakartaSans_400Regular;
  PlusJakartaSans_500Medium = plusJakarta.PlusJakartaSans_500Medium;
  PlusJakartaSans_600SemiBold = plusJakarta.PlusJakartaSans_600SemiBold;
  PlusJakartaSans_700Bold = plusJakarta.PlusJakartaSans_700Bold;
  DMSans_400Regular = dmSans.DMSans_400Regular;
  DMSans_500Medium = dmSans.DMSans_500Medium;
  DMSans_600SemiBold = dmSans.DMSans_600SemiBold;
  DMSans_700Bold = dmSans.DMSans_700Bold;
}

SplashScreen.preventAutoHideAsync();

// Development-only: sanitize renderer versions so React DevTools doesn't crash
// when a renderer registers with an empty or missing version string.
// This is a defensive runtime fix for dev tools only and does not affect production.
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  try {
    const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook) {
      const maybeRenderers =
        hook.renderers ||
        hook._renderers ||
        hook._reactInternals ||
        hook._renderersList;
      if (maybeRenderers) {
        // Map-like or Set-like
        try {
          if (typeof maybeRenderers.forEach === 'function') {
            maybeRenderers.forEach((r: any) => {
              try {
                if (r && (r.version === '' || r.version == null))
                  r.version = '0.0.0';
              } catch (_) {}
            });
          } else if (typeof maybeRenderers.values === 'function') {
            for (const r of maybeRenderers.values()) {
              try {
                if (r && (r.version === '' || r.version == null))
                  r.version = '0.0.0';
              } catch (_) {}
            }
          } else if (Array.isArray(maybeRenderers)) {
            maybeRenderers.forEach((r: any) => {
              try {
                if (r && (r.version === '' || r.version == null))
                  r.version = '0.0.0';
              } catch (_) {}
            });
          }
        } catch (_) {
          // ignore any unexpected shapes
        }
      }
    }
  } catch (_) {
    // swallow any errors so this defensive code never breaks the app
  }
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'PlusJakarta-Regular': PlusJakartaSans_400Regular,
    'PlusJakarta-Medium': PlusJakartaSans_500Medium,
    'PlusJakarta-SemiBold': PlusJakartaSans_600SemiBold,
    'PlusJakarta-Bold': PlusJakartaSans_700Bold,
    'DMSans-Regular': DMSans_400Regular,
    'DMSans-Medium': DMSans_500Medium,
    'DMSans-SemiBold': DMSans_600SemiBold,
    'DMSans-Bold': DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Always render the app so runtime errors surface in the simulator/device
  // and the app doesn't stay on a blank white screen while fonts load.
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(patient)" />
          <Stack.Screen name="(doctor)" />
          <Stack.Screen name="(lab)" />
          <Stack.Screen name="(common)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
