import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Platform,
} from 'react-native';
import { MotiView } from 'moti';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';
import DoctorCard, { DoctorCardData } from './DoctorCard';

interface DoctorResultsListProps {
  doctors: DoctorCardData[];
  searchQuery: string;
  onCardPress: (doctor: DoctorCardData) => void;
  isLoading?: boolean;
}

export default function DoctorResultsList({
  doctors,
  searchQuery,
  onCardPress,
  isLoading = false,
}: DoctorResultsListProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  const emptyState = useMemo(() => {
    return !isLoading && searchQuery.trim() && doctors.length === 0;
  }, [isLoading, searchQuery, doctors.length]);

  const renderDoctor: ListRenderItem<DoctorCardData> = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 300,
        delay: index * 50,
      }}
      style={styles.doctorItemWrapper}
    >
      <DoctorCard doctor={item} onPress={onCardPress} />
    </MotiView>
  );

  const renderEmpty = () => (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15 }}
      style={styles.emptyStateWrapper}
    >
      <View
        style={[
          styles.emptyStateContainer,
          { backgroundColor: colors.cardBg },
        ]}
      >
        <View
          style={[
            styles.emptyStateIcon,
            { backgroundColor: colors.accentLight },
          ]}
        >
          <Text style={styles.emptyStateIconText}>🔍</Text>
        </View>

        <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
          No doctors found
        </Text>

        <Text
          style={[
            styles.emptyStateDescription,
            { color: colors.textSecondary },
          ]}
        >
          Try searching with a different{'\n'}name, specialization, or hospital
        </Text>

        <View
          style={[
            styles.emptyStateTip,
            { backgroundColor: colors.accentLight },
          ]}
        >
          <Text style={[styles.emptyStateTipText, { color: colors.accent }]}>
            💡 Try: Cardiologist, City Hospital, or Dr. Smith
          </Text>
        </View>
      </View>
    </MotiView>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      {[...Array(3)].map((_, index) => (
        <MotiView
          key={index}
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 600,
            delay: index * 200,
            loop: true,
          }}
          style={[
            styles.skeletonCard,
            { backgroundColor: colors.cardBg },
          ]}
        />
      ))}
    </View>
  );

  if (isLoading) {
    return renderLoadingState();
  }

  return (
    <View style={styles.container}>
      {doctors.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
            {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'} found
          </Text>
          {searchQuery.trim() && (
            <Text style={[styles.searchTerm, { color: colors.accent }]}>
              for "{searchQuery}"
            </Text>
          )}
        </View>
      )}

      <FlatList
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        ListEmptyComponent={emptyState ? renderEmpty : null}
        contentContainerStyle={
          doctors.length === 0
            ? styles.flatListEmptyContent
            : styles.flatListContent
        }
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 2,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  searchTerm: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
  },
  flatListEmptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  doctorItemWrapper: {
    width: '100%',
  },
  emptyStateWrapper: {
    width: '100%',
  },
  emptyStateContainer: {
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyStateIconText: {
    fontSize: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  emptyStateTip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    width: '100%',
  },
  emptyStateTipText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  loadingContainer: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  skeletonCard: {
    height: 120,
    borderRadius: 20,
    marginBottom: 8,
  },
});
