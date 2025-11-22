import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Stethoscope,
  User,
  FileText,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
  CheckCircle,
  Upload,
  Briefcase,
} from 'lucide-react-native';
import { authFlowService } from '@/modules/shared/services/AuthFlowService';

type Step = 1 | 2 | 3;

interface PersonalInfo {
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
}

interface ProfessionalInfo {
  specialization: string;
  registrationNumber: string;
  yearsOfExperience: string;
  qualification: string;
  hospitalAffiliation: string;
}

export default function RegisterDoctorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { phone } = params;

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
  });

  const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo>({
    specialization: '',
    registrationNumber: '',
    yearsOfExperience: '',
    qualification: '',
    hospitalAffiliation: '',
  });

  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const isStep1Valid = personalInfo.name.trim() !== '';
  const isStep2Valid = professionalInfo.specialization.trim() !== '';
  const isStep3Valid = selectedDocuments.length > 0;

  const handleNext = () => {
    setError('');
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    setError('');

    try {
      const registrationData = {
        name: personalInfo.name,
        email: personalInfo.email || undefined,
        dateOfBirth: personalInfo.dateOfBirth || undefined,
        gender: personalInfo.gender || undefined,
        address: personalInfo.address || undefined,
        specialization: professionalInfo.specialization || undefined,
        registrationNumber: professionalInfo.registrationNumber || undefined,
        yearsOfExperience: professionalInfo.yearsOfExperience
          ? parseInt(professionalInfo.yearsOfExperience)
          : undefined,
        qualification: professionalInfo.qualification || undefined,
        hospitalAffiliation: professionalInfo.hospitalAffiliation || undefined,
        profileCompletionStep: currentStep,
      };

      const response = await authFlowService.registerDoctor(
        phone as string,
        registrationData
      );

      if (response.success) {
        router.replace('/doctor-home');
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (currentStep === 1 && !isStep1Valid) {
      setError('Please enter your name to continue.');
      return;
    }

    if (currentStep === 3 || (currentStep === 2 && isStep2Valid)) {
      setLoading(true);
      setError('');

      try {
        const registrationData = {
          name: personalInfo.name,
          email: personalInfo.email || undefined,
          dateOfBirth: personalInfo.dateOfBirth || undefined,
          gender: personalInfo.gender || undefined,
          address: personalInfo.address || undefined,
          specialization: professionalInfo.specialization || undefined,
          registrationNumber: professionalInfo.registrationNumber || undefined,
          yearsOfExperience: professionalInfo.yearsOfExperience
            ? parseInt(professionalInfo.yearsOfExperience)
            : undefined,
          qualification: professionalInfo.qualification || undefined,
          hospitalAffiliation:
            professionalInfo.hospitalAffiliation || undefined,
          profileCompletionStep: currentStep === 3 ? 4 : currentStep,
          documentsUploaded: selectedDocuments,
        };

        const response = await authFlowService.registerDoctor(
          phone as string,
          registrationData
        );

        if (response.success) {
          router.replace('/doctor-home');
        } else {
          setError(
            response.message || 'Registration failed. Please try again.'
          );
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      handleNext();
    }
  };

  const handleUploadDocument = () => {
    const mockDoc = `document_${Date.now()}`;
    setSelectedDocuments([...selectedDocuments, mockDoc]);
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepItem}>
          <View
            style={[
              styles.stepCircle,
              currentStep >= step && styles.stepCircleActive,
              currentStep > step && styles.stepCircleCompleted,
            ]}
          >
            {currentStep > step ? (
              <CheckCircle size={16} color="#ffffff" strokeWidth={2.5} />
            ) : (
              <Text
                style={[
                  styles.stepNumber,
                  currentStep >= step && styles.stepNumberActive,
                ]}
              >
                {step}
              </Text>
            )}
          </View>
          {step < 3 && (
            <View
              style={[
                styles.stepLine,
                currentStep > step && styles.stepLineActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <MotiView
      key="step1"
      from={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -20 }}
      transition={{ type: 'timing', duration: 300 }}
    >
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Tell us about yourself</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <View style={styles.inputContainer}>
          <User size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.input}
            value={personalInfo.name}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, name: text })
            }
            placeholder="Dr. John Doe"
            placeholderTextColor="#94a3b8"
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Mail size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.input}
            value={personalInfo.email}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, email: text })
            }
            placeholder="doctor@example.com"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.inputContainer}>
          <Calendar size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.input}
            value={personalInfo.dateOfBirth}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, dateOfBirth: text })
            }
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#94a3b8"
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          {['Male', 'Female', 'Other'].map((gender) => (
            <TouchableOpacity
              key={gender}
              onPress={() => setPersonalInfo({ ...personalInfo, gender })}
              style={[
                styles.genderButton,
                personalInfo.gender === gender && styles.genderButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.genderText,
                  personalInfo.gender === gender && styles.genderTextSelected,
                ]}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
          <MapPin size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={personalInfo.address}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, address: text })
            }
            placeholder="Your address"
            placeholderTextColor="#94a3b8"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </View>
    </MotiView>
  );

  const renderStep2 = () => (
    <MotiView
      key="step2"
      from={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -20 }}
      transition={{ type: 'timing', duration: 300 }}
    >
      <Text style={styles.stepTitle}>Professional Information</Text>
      <Text style={styles.stepSubtitle}>Your medical credentials</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Specialization *</Text>
        <View style={styles.inputContainer}>
          <Stethoscope size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.input}
            value={professionalInfo.specialization}
            onChangeText={(text) =>
              setProfessionalInfo({ ...professionalInfo, specialization: text })
            }
            placeholder="e.g., Cardiologist"
            placeholderTextColor="#94a3b8"
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Registration Number</Text>
        <View style={styles.inputContainer}>
          <FileText size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.input}
            value={professionalInfo.registrationNumber}
            onChangeText={(text) =>
              setProfessionalInfo({
                ...professionalInfo,
                registrationNumber: text,
              })
            }
            placeholder="Medical Council Registration No."
            placeholderTextColor="#94a3b8"
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Years of Experience</Text>
        <View style={styles.inputContainer}>
          <Briefcase size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.input}
            value={professionalInfo.yearsOfExperience}
            onChangeText={(text) =>
              setProfessionalInfo({
                ...professionalInfo,
                yearsOfExperience: text,
              })
            }
            placeholder="e.g., 10"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Qualification</Text>
        <View style={styles.inputContainer}>
          <FileText size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.input}
            value={professionalInfo.qualification}
            onChangeText={(text) =>
              setProfessionalInfo({ ...professionalInfo, qualification: text })
            }
            placeholder="e.g., MBBS, MD"
            placeholderTextColor="#94a3b8"
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hospital Affiliation</Text>
        <View style={styles.inputContainer}>
          <Briefcase size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.input}
            value={professionalInfo.hospitalAffiliation}
            onChangeText={(text) =>
              setProfessionalInfo({
                ...professionalInfo,
                hospitalAffiliation: text,
              })
            }
            placeholder="Your hospital or clinic"
            placeholderTextColor="#94a3b8"
            returnKeyType="done"
          />
        </View>
      </View>

      <View style={styles.skipNotice}>
        <Text style={styles.skipNoticeText}>
          You can skip this step and complete it later from your profile
          settings.
        </Text>
      </View>
    </MotiView>
  );

  const renderStep3 = () => (
    <MotiView
      key="step3"
      from={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -20 }}
      transition={{ type: 'timing', duration: 300 }}
    >
      <Text style={styles.stepTitle}>Document Verification</Text>
      <Text style={styles.stepSubtitle}>Upload your credentials</Text>

      <View style={styles.documentSection}>
        <Text style={styles.documentLabel}>Required Documents:</Text>
        <View style={styles.documentList}>
          <Text style={styles.documentItem}>• Medical License</Text>
          <Text style={styles.documentItem}>• Educational Certificates</Text>
          <Text style={styles.documentItem}>• Registration Certificate</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleUploadDocument}
        style={styles.uploadButton}
      >
        <View style={styles.uploadButtonContent}>
          <Upload size={24} color="#10b981" strokeWidth={2} />
          <Text style={styles.uploadButtonText}>Upload Documents</Text>
        </View>
      </TouchableOpacity>

      {selectedDocuments.length > 0 && (
        <View style={styles.uploadedSection}>
          <Text style={styles.uploadedTitle}>
            Uploaded Documents ({selectedDocuments.length})
          </Text>
          {selectedDocuments.map((doc, index) => (
            <View key={doc} style={styles.uploadedItem}>
              <FileText size={16} color="#10b981" strokeWidth={2} />
              <Text style={styles.uploadedText}>Document {index + 1}</Text>
              <CheckCircle size={16} color="#10b981" strokeWidth={2} />
            </View>
          ))}
        </View>
      )}

      <View style={styles.skipNotice}>
        <Text style={styles.skipNoticeText}>
          You can skip document upload and complete it later from your profile
          settings.
        </Text>
      </View>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E0F2FF', '#F0F9FF', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <MotiView
            from={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            style={styles.header}
          >
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.iconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Stethoscope size={32} color="#ffffff" strokeWidth={2} />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Doctor Registration</Text>
            <Text style={styles.subtitle}>
              Complete your professional profile
            </Text>
          </MotiView>

          {renderStepIndicator()}

          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 200, damping: 15 }}
            style={styles.card}
          >
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {error && (
              <MotiView
                from={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                style={styles.errorContainer}
              >
                <Text style={styles.errorText}>{error}</Text>
              </MotiView>
            )}

            <View style={styles.buttonContainer}>
              {currentStep > 1 && (
                <TouchableOpacity
                  onPress={handleBack}
                  disabled={loading}
                  style={[
                    styles.secondaryButton,
                    loading && styles.buttonDisabled,
                  ]}
                >
                  <Text style={styles.secondaryButtonText}>Back</Text>
                </TouchableOpacity>
              )}

              {currentStep > 1 && (
                <TouchableOpacity
                  onPress={handleSkip}
                  disabled={loading}
                  style={[
                    styles.secondaryButton,
                    loading && styles.buttonDisabled,
                  ]}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#10b981" />
                  ) : (
                    <Text style={styles.secondaryButtonText}>
                      Skip & Finish
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleComplete}
                disabled={(currentStep === 1 && !isStep1Valid) || loading}
                activeOpacity={0.8}
                style={[
                  styles.primaryButton,
                  ((currentStep === 1 && !isStep1Valid) || loading) &&
                    styles.buttonDisabled,
                ]}
              >
                <LinearGradient
                  colors={
                    (currentStep === 1 && !isStep1Valid) || loading
                      ? ['#334155', '#1e293b']
                      : ['#10b981', '#059669']
                  }
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <>
                      <Text style={styles.primaryButtonText}>
                        {currentStep === 3 ? 'Complete' : 'Next'}
                      </Text>
                      {currentStep < 3 && (
                        <ChevronRight
                          size={20}
                          color="#ffffff"
                          strokeWidth={2}
                        />
                      )}
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FF',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  stepCircleCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  stepNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#94a3b8',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#10b981',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  stepTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#475569',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    gap: 12,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    paddingVertical: 16,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 4,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  genderButtonSelected: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: '#10b981',
  },
  genderText: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  genderTextSelected: {
    color: '#10b981',
    fontFamily: 'Inter-SemiBold',
  },
  documentSection: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  documentLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  documentList: {
    gap: 8,
  },
  documentItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    lineHeight: 20,
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonContent: {
    alignItems: 'center',
    gap: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  uploadedSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  uploadedTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  uploadedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  uploadedText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#475569',
  },
  skipNotice: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  skipNoticeText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    lineHeight: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  errorContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  errorText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#ef4444',
    textAlign: 'center',
  },
});
