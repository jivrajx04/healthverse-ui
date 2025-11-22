import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DoctorProfileView from '../../components/DoctorProfileView';
import { mockDoctors } from '../../data/mockDoctors';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';

export default function DoctorProfileDetailScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const doctor = mockDoctors.find((doc) => doc.id === id);

  if (!doctor) {
    return (
      <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Doctor not found
          </Text>
        </View>
      </View>
    );
  }

  return (
    <DoctorProfileView
      doctor={doctor}
      onBack={() => router.push('/(tabs)/search')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
