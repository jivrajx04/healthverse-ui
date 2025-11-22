import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MotiView } from 'moti';
import { CheckCircle } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';
import { DoctorCardData } from './DoctorCard';

interface AppointmentConfirmationProps {
  visible: boolean;
  doctor: DoctorCardData;
  selectedSlot: { date: string; time: string } | null;
  onClose: () => void;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function AppointmentConfirmation({
  visible,
  doctor,
  selectedSlot,
  onClose,
}: AppointmentConfirmationProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    if (visible && selectedSlot) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [visible, selectedSlot]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formattedDate = selectedSlot ? formatDate(selectedSlot.date) : '';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            mass: 1,
          }}
          style={styles.modalContent}
        >
          <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
            <View style={styles.successIconContainer}>
              <View
                style={[
                  styles.successIconBackground,
                  { backgroundColor: colors.accentLight },
                ]}
              >
                <CheckCircle size={48} color={colors.accent} strokeWidth={1.5} />
              </View>
            </View>

            <Text style={[styles.successTitle, { color: colors.text }]}>
              Appointment Confirmed!
            </Text>

            <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
              Your appointment request has been sent to the doctor
            </Text>

            <View style={styles.detailsContainer}>
              <View
                style={[
                  styles.detailItem,
                  { backgroundColor: colors.accentLight },
                ]}
              >
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Doctor
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {doctor.name}
                </Text>
              </View>

              <View
                style={[
                  styles.detailItem,
                  { backgroundColor: colors.accentLight },
                ]}
              >
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Specialization
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {doctor.specialization}
                </Text>
              </View>

              <View
                style={[
                  styles.detailItem,
                  { backgroundColor: colors.accentLight },
                ]}
              >
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Date & Time
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {selectedSlot && formattedDate}
                </Text>
                <Text
                  style={[
                    styles.detailValue,
                    { color: colors.accent, fontSize: 16 },
                  ]}
                >
                  {selectedSlot && selectedSlot.time}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.infoBox,
                { backgroundColor: colors.accentLight },
              ]}
            >
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                📞 The doctor will confirm your appointment within 24 hours. Check your notifications for updates.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: colors.accent }]}
              onPress={onClose}
            >
              <Text style={styles.confirmButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successIconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  detailsContainer: {
    width: '100%',
    gap: 8,
    marginBottom: 16,
  },
  detailItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  infoBox: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});
