import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { MapPin, Star } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';

export interface DoctorCardData {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  rating: number;
  distance: string;
  photoUrl?: string;
  reviewCount?: number;
}

interface DoctorCardProps {
  doctor: DoctorCardData;
  onPress: (doctor: DoctorCardData) => void;
}

export default function DoctorCard({ doctor, onPress }: DoctorCardProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            size={14}
            color="#F59E0B"
            fill="#F59E0B"
            strokeWidth={0}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <View key={i} style={styles.halfStarContainer}>
            <Star
              size={14}
              color="#F59E0B"
              fill="#F59E0B"
              strokeWidth={0}
              style={styles.halfStar}
            />
            <Star
              size={14}
              color="#E5E7EB"
              fill="#E5E7EB"
              strokeWidth={0}
              style={styles.halfStarOverlay}
            />
          </View>
        );
      } else {
        stars.push(
          <Star
            key={i}
            size={14}
            color="#E5E7EB"
            fill="#E5E7EB"
            strokeWidth={0}
          />
        );
      }
    }
    return stars;
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(doctor)}
      activeOpacity={0.7}
      style={styles.touchable}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        style={styles.cardWrapper}
      >
        <MotiView
          animate={({ pressed }: any) => {
            'worklet';
            return {
              scale: pressed ? 0.97 : 1,
            };
          }}
          style={[
            styles.card,
            {
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder,
              shadowColor: isDark ? '#3B82F6' : '#6366F1',
            },
          ]}
        >
          <LinearGradient
            colors={
              isDark
                ? ['rgba(59, 130, 246, 0.03)', 'rgba(99, 102, 241, 0.06)']
                : ['rgba(99, 102, 241, 0.02)', 'rgba(59, 130, 246, 0.04)']
            }
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          <View style={styles.cardContent}>
            <View style={styles.leftSection}>
              {doctor.photoUrl ? (
                <Image
                  source={{ uri: doctor.photoUrl }}
                  style={styles.doctorPhoto}
                  resizeMode="cover"
                />
              ) : (
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  style={styles.doctorPhoto}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.initialsText}>{getInitials(doctor.name)}</Text>
                </LinearGradient>
              )}

              <View style={styles.infoSection}>
                <Text style={[styles.doctorName, { color: colors.text }]} numberOfLines={1}>
                  {doctor.name}
                </Text>

                <Text style={[styles.specialization, { color: colors.accent }]} numberOfLines={1}>
                  {doctor.specialization}
                </Text>

                <View style={styles.hospitalRow}>
                  <Text style={[styles.hospital, { color: colors.textSecondary }]} numberOfLines={1}>
                    {doctor.hospital}
                  </Text>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.ratingContainer}>
                    <View style={styles.starsRow}>{renderStars(doctor.rating)}</View>
                    <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
                      {doctor.rating.toFixed(1)}
                    </Text>
                    {doctor.reviewCount !== undefined && (
                      <Text style={[styles.reviewCount, { color: colors.textTertiary }]}>
                        ({doctor.reviewCount})
                      </Text>
                    )}
                  </View>

                  <View style={styles.distanceContainer}>
                    <MapPin size={12} color="#10B981" strokeWidth={2.5} />
                    <Text style={[styles.distance, { color: colors.textSecondary }]}>
                      {doctor.distance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.bookmarkSection, { backgroundColor: colors.accentLight }]}>
              <View style={styles.bookmarkDot} />
            </View>
          </View>
        </MotiView>
      </MotiView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 12,
  },
  cardWrapper: {
    width: '100%',
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  doctorPhoto: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  initialsText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  specialization: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  hospital: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  halfStarContainer: {
    position: 'relative',
    width: 14,
    height: 14,
  },
  halfStar: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  halfStarOverlay: {
    position: 'absolute',
    left: 7,
    top: 0,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  reviewCount: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  distance: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  bookmarkSection: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(99, 102, 241, 0.5)',
  },
});
