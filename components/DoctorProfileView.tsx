import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { ChevronLeft, Share2, MessageCircle, Star } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';
import { DoctorCardData } from './DoctorCard';
import AppointmentBooking from './AppointmentBooking';
import AppointmentConfirmation from './AppointmentConfirmation';

interface DoctorProfileViewProps {
  doctor: DoctorCardData;
  onBack: () => void;
}

interface DoctorDetails {
  experience: string;
  qualifications: string[];
  about: string;
  services: string[];
  consultationFee: string;
  recoveredPatients: number;
  patientsInCare: number;
  freeSlots: number;
}

const mockDoctorDetails: Record<string, DoctorDetails> = {
  '1': {
    experience: '12+ years',
    qualifications: ['MD in Cardiology', 'Fellowship in Interventional Cardiology'],
    about:
      'Specialized in diagnosis and treatment of heart diseases. Provides comprehensive cardiac care with the latest technologies and techniques.',
    services: [
      'Cardiac Consultation',
      'ECG Analysis',
      'Stress Testing',
      'Echocardiography',
    ],
    consultationFee: '500',
    recoveredPatients: 464,
    patientsInCare: 12,
    freeSlots: 12,
  },
  '2': {
    experience: '8+ years',
    qualifications: ['MBBS', 'MD in Dermatology'],
    about:
      'Expert dermatologist with focus on treating skin conditions and cosmetic procedures. Uses advanced dermatological treatments.',
    services: [
      'Skin Consultation',
      'Acne Treatment',
      'Laser Therapy',
      'Cosmetic Procedures',
    ],
    consultationFee: '400',
    recoveredPatients: 312,
    patientsInCare: 8,
    freeSlots: 10,
  },
  '3': {
    experience: '15+ years',
    qualifications: ['MBBS', 'General Medicine'],
    about:
      'Experienced general practitioner providing preventive and curative healthcare. Focuses on patient wellness and holistic health.',
    services: [
      'General Checkup',
      'Health Screening',
      'Vaccination',
      'Health Counseling',
    ],
    consultationFee: '300',
    recoveredPatients: 289,
    patientsInCare: 15,
    freeSlots: 14,
  },
};

export default function DoctorProfileView({ doctor, onBack }: DoctorProfileViewProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  const details = mockDoctorDetails[doctor.id] || {
    experience: '10+ years',
    qualifications: ['MD', 'Specialist'],
    about: 'Highly skilled and experienced healthcare professional.',
    services: ['Consultation', 'Diagnosis', 'Treatment'],
    consultationFee: '450',
    recoveredPatients: 200,
    patientsInCare: 10,
    freeSlots: 12,
  };

  const [showBooking, setShowBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    time: string;
  } | null>(null);

  const handleBookAppointment = (date: string, time: string) => {
    setSelectedSlot({ date, time });
    setShowBooking(false);
    setShowConfirmation(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient
        colors={colors.background as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 400 }}>
          <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : 30 }]}>
            <TouchableOpacity style={styles.headerButton} onPress={onBack}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Share2 size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <MessageCircle size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.profileCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: doctor.photoUrl }}
                style={styles.profileImage}
              />
              <View style={styles.ratingBadge}>
                <Star size={14} color="#FBBF24" fill="#FBBF24" />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={[styles.doctorName, { color: colors.text }]}>
                {doctor.name}
              </Text>
              <Text style={[styles.specialization, { color: colors.textSecondary }]}>
                {doctor.specialization}
              </Text>
              <Text style={[styles.experience, { color: colors.accent }]}>
                {details.experience}
              </Text>

              <View style={styles.statsRow}>
                <View style={[styles.statItem, { backgroundColor: colors.accentLight }]}>
                  <Text style={[styles.statValue, { color: colors.accent }]}>
                    {doctor.rating}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.accent }]}>
                    Rating
                  </Text>
                </View>
                <View style={[styles.statItem, { backgroundColor: colors.accentLight }]}>
                  <Text style={[styles.statValue, { color: colors.accent }]}>
                    {doctor.reviewCount}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.accent }]}>
                    Reviews
                  </Text>
                </View>
                <View style={[styles.statItem, { backgroundColor: colors.accentLight }]}>
                  <Text style={[styles.statValue, { color: colors.accent }]}>
                    {doctor.distance}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.accent }]}>
                    Distance
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.hospitalInfo,
                  {
                    backgroundColor: colors.accentLight,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.hospitalLabel, { color: colors.textSecondary }]}>
                  Hospital
                </Text>
                <Text style={[styles.hospitalName, { color: colors.text }]}>
                  {doctor.hospital}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
              <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
                {details.about}
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Qualifications
              </Text>
              <View style={styles.qualificationsList}>
                {details.qualifications.map((qual, index) => (
                  <View key={index} style={styles.qualificationItem}>
                    <View
                      style={[
                        styles.qualificationDot,
                        { backgroundColor: colors.accent },
                      ]}
                    />
                    <Text style={[styles.qualificationText, { color: colors.text }]}>
                      {qual}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Services Offered
              </Text>
              <View style={styles.servicesList}>
                {details.services.map((service, index) => (
                  <View
                    key={index}
                    style={[
                      styles.serviceTag,
                      {
                        backgroundColor: colors.accentLight,
                        borderColor: colors.accent,
                      },
                    ]}
                  >
                    <Text style={[styles.serviceText, { color: colors.accent }]}>
                      {service}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Patient Stats
              </Text>
              <View style={styles.patientStatsRow}>
                <View style={styles.patientStatItem}>
                  <Text
                    style={[
                      styles.patientStatNumber,
                      { color: colors.accent },
                    ]}
                  >
                    {details.recoveredPatients}
                  </Text>
                  <Text
                    style={[
                      styles.patientStatLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Recovered
                  </Text>
                </View>
                <View style={styles.patientStatDivider} />
                <View style={styles.patientStatItem}>
                  <Text
                    style={[
                      styles.patientStatNumber,
                      { color: colors.accent },
                    ]}
                  >
                    {details.patientsInCare}
                  </Text>
                  <Text
                    style={[
                      styles.patientStatLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    In Care
                  </Text>
                </View>
                <View style={styles.patientStatDivider} />
                <View style={styles.patientStatItem}>
                  <Text
                    style={[
                      styles.patientStatNumber,
                      { color: colors.accent },
                    ]}
                  >
                    {details.freeSlots}
                  </Text>
                  <Text
                    style={[
                      styles.patientStatLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Free Slots
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.feeSection, { backgroundColor: colors.cardBg }]}>
              <View style={styles.feeRow}>
                <Text style={[styles.feeLabel, { color: colors.textSecondary }]}>
                  Consultation Fee
                </Text>
                <Text style={[styles.feeAmount, { color: colors.accent }]}>
                  ₹{details.consultationFee}
                </Text>
              </View>
            </View>
          </View>
        </MotiView>
      </ScrollView>

      <View
        style={[
          styles.bookingButtonContainer,
          { backgroundColor: colors.containerBg, borderTopColor: colors.cardBorder },
        ]}
      >
        <TouchableOpacity
          style={[styles.bookingButton, { backgroundColor: colors.accent }]}
          onPress={() => setShowBooking(true)}
        >
          <Text style={styles.bookingButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showBooking} animationType="slide" transparent={false}>
        <View style={[styles.modalContent, { backgroundColor: colors.containerBg }]}>
          <AppointmentBooking
            doctor={doctor}
            onClose={() => setShowBooking(false)}
            onBook={handleBookAppointment}
          />
        </View>
      </Modal>

      <AppointmentConfirmation
        visible={showConfirmation}
        doctor={doctor}
        selectedSlot={selectedSlot}
        onClose={() => {
          setShowConfirmation(false);
          onBack();
        }}
      />
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  profileCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  profileImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 20,
  },
  ratingBadge: {
    position: 'absolute',
    top: 0,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  profileInfo: {
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  specialization: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
    textAlign: 'center',
  },
  experience: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  hospitalInfo: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  hospitalLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  hospitalName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  detailsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  qualificationsList: {
    gap: 8,
  },
  qualificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qualificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  qualificationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  serviceText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  patientStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  patientStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  patientStatNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  patientStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  patientStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    marginHorizontal: 12,
  },
  feeSection: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
    marginBottom: 16,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  feeAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  bookingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
  },
  bookingButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  modalContent: {
    flex: 1,
  },
});
