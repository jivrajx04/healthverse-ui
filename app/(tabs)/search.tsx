import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';
import SearchBar from '../../components/SearchBar';
import DoctorResultsList from '../../components/DoctorResultsList';
import EmptySearchState from '../../components/EmptySearchState';
import { mockDoctors, filterDoctors } from '../../data/mockDoctors';
import { DoctorCardData } from '../../components/DoctorCard';

export default function SearchScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const filteredDoctors = useMemo(() => {
    return filterDoctors(searchQuery);
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length > 0 && !hasSearched) {
      setHasSearched(true);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setHasSearched(false);
  };

  const handleBack = () => {
    router.push('/(tabs)/patient-home');
  };

  const handleCardPress = (doctor: DoctorCardData) => {
    router.push({
      pathname: '/doctor-profile-detail',
      params: { id: doctor.id },
    });
  };

  const showResults = searchQuery.trim().length > 0;
  const showEmptyState = !showResults;
  const showNoResults = hasSearched && filteredDoctors.length === 0 && searchQuery.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient
        colors={colors.background as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10 }]}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClear}
          onBack={handleBack}
        />
      </View>

      <View style={styles.content}>
        {showEmptyState ? (
          <EmptySearchState message="Start typing to search for doctors, hospitals, or specialties" />
        ) : showNoResults ? (
          <EmptySearchState />
        ) : (
          <DoctorResultsList
            doctors={filteredDoctors}
            searchQuery={searchQuery}
            onCardPress={handleCardPress}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
});
