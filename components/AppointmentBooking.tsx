import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { MotiView } from 'moti';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';
import { DoctorCardData } from './DoctorCard';

interface AppointmentBookingProps {
  doctor: DoctorCardData;
  onClose: () => void;
  onBook: (date: string, time: string) => void;
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

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TIME_SLOTS = ['08:30', '09:30', '10:30', '11:30', '14:00', '15:00', '16:30', '17:30'];

export default function AppointmentBooking({
  doctor,
  onClose,
  onBook,
}: AppointmentBookingProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const handleSelectDate = (day: number) => {
    if (!isDateDisabled(day)) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
      setSelectedTime(null);
    }
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      const dateString = selectedDate.toISOString().split('T')[0];
      onBook(dateString, selectedTime);
    }
  };

  const isBookingDisabled = !selectedDate || !selectedTime;

  const formattedDate = selectedDate
    ? `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    : '';

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : 30 }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Book Appointment
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 400 }}>
          <View style={styles.contentContainer}>
            <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
              <View style={styles.monthHeader}>
                <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
                  <ChevronLeft size={20} color={colors.accent} />
                </TouchableOpacity>

                <Text style={[styles.monthTitle, { color: colors.text }]}>
                  {MONTHS[currentMonth]} {currentYear}
                </Text>

                <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
                  <ChevronRight size={20} color={colors.accent} />
                </TouchableOpacity>
              </View>

              <View style={styles.weekdaysRow}>
                {WEEKDAYS.map((day) => (
                  <Text
                    key={day}
                    style={[styles.weekdayText, { color: colors.textSecondary }]}
                  >
                    {day}
                  </Text>
                ))}
              </View>

              <View style={styles.daysGrid}>
                {calendarDays.map((day, index) => {
                  const isDisabled = day ? isDateDisabled(day) : true;
                  const isSelected = day ? isDateSelected(day) : false;

                  return (
                    <TouchableOpacity
                      key={index}
                      disabled={isDisabled}
                      onPress={() => day && handleSelectDate(day)}
                      style={[
                        styles.dayButton,
                        isSelected && {
                          backgroundColor: colors.accent,
                        },
                        isDisabled && styles.dayButtonDisabled,
                      ]}
                    >
                      {day && (
                        <Text
                          style={[
                            styles.dayText,
                            {
                              color: isSelected
                                ? '#FFFFFF'
                                : isDisabled
                                  ? colors.textTertiary
                                  : colors.text,
                            },
                          ]}
                        >
                          {day}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {selectedDate && (
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 300 }}
              >
                <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Select Time Slot
                  </Text>
                  <Text style={[styles.selectedDateText, { color: colors.textSecondary }]}>
                    {formattedDate}
                  </Text>

                  <View style={styles.timeSlotsGrid}>
                    {TIME_SLOTS.map((time, index) => {
                      const isSelected = selectedTime === time;

                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setSelectedTime(time)}
                          style={[
                            styles.timeSlot,
                            {
                              borderColor: isSelected
                                ? colors.accent
                                : colors.cardBorder,
                              borderWidth: isSelected ? 2 : 1,
                              backgroundColor: isSelected
                                ? colors.accentLight
                                : 'transparent',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.timeText,
                              {
                                color: isSelected ? colors.accent : colors.text,
                              },
                            ]}
                          >
                            {time}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {selectedTime && (
                  <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 200 }}
                    style={[
                      styles.summarySection,
                      { backgroundColor: colors.cardBg },
                    ]}
                  >
                    <View style={styles.summaryRow}>
                      <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                        Doctor
                      </Text>
                      <Text style={[styles.summaryValue, { color: colors.text }]}>
                        {doctor.name}
                      </Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryRow}>
                      <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                        Date & Time
                      </Text>
                      <Text style={[styles.summaryValue, { color: colors.text }]}>
                        {formattedDate} • {selectedTime}
                      </Text>
                    </View>
                  </MotiView>
                )}
              </MotiView>
            )}
          </View>
        </MotiView>
      </ScrollView>

      <View
        style={[
          styles.footerContainer,
          { backgroundColor: colors.containerBg, borderTopColor: colors.cardBorder },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.confirmButton,
            {
              backgroundColor: isBookingDisabled ? colors.textTertiary : colors.accent,
            },
          ]}
          disabled={isBookingDisabled}
          onPress={handleBookAppointment}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekdayText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    width: '14.28%',
    textAlign: 'center',
    paddingVertical: 8,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 4,
  },
  dayButtonDisabled: {
    opacity: 0.4,
  },
  dayText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  selectedDateText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    flex: 1,
    minWidth: '22%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  summarySection: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    marginVertical: 12,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
  },
  confirmButton: {
    paddingVertical: 16,
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
