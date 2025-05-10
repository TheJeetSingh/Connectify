import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as api from '../utils/api';

export const options = { headerShown: false };

const steps = [
  { label: 'Account' },
  { label: 'Location' },
  { label: 'Survey' },
  { label: 'Review' },
];

export default function RegisterScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(''); // Placeholder for location step
  const [survey, setSurvey] = useState({
    q1: '',
    q2: '',
    q3: '',
    extra: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSurveyChange = (key: string, value: string) => {
    setSurvey({ ...survey, [key]: value });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter your name');
        return false;
      }
      if (!email.trim()) {
        Alert.alert('Error', 'Please enter your email');
        return false;
      }
      if (!password.trim() || password.length < 6) {
        Alert.alert('Error', 'Please enter a password (minimum 6 characters)');
        return false;
      }
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      // Register the user with the backend
      const userData = {
        name,
        email,
        password,
      };

      const response = await api.registerUser(userData);

      if (response.success) {
        // Store user interests and location later
        const interests = [
          survey.q1,
          survey.q2,
          survey.q3,
        ].filter(item => item.trim().length > 0);

        // If we had a updateProfile endpoint, we would call it here
        // await api.updateProfile({ interests, location });

        Alert.alert(
          'Registration Successful',
          'Your account has been created successfully!',
          [
            {
              text: 'Go to Home',
              onPress: () => router.replace('/(tabs)'),
            },
          ]
        );
      } else {
        Alert.alert('Registration Failed', response.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert('Registration Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit registration
      handleRegister();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Create Your Account</Text>
            <Text style={styles.stepDescription}>Let's get you started with Connectify</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Set Your Location</Text>
            <Text style={styles.stepDescription}>Let us know where you are to find events near you</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your city or area"
              value={location}
              onChangeText={setLocation}
              editable={!loading}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.surveyTitle}>Take a Quick Survey</Text>
            <Text style={styles.surveyDescription}>Help us understand your interest so we can personalize your experience</Text>
            <View style={styles.surveyQBlock}>
              <Text style={styles.surveyQ}>1. What are your favorite activities?</Text>
              <View style={styles.surveyInputRow}>
                <TextInput
                  style={styles.surveyInput}
                  placeholder="..."
                  value={survey.q1}
                  onChangeText={v => handleSurveyChange('q1', v)}
                  editable={!loading}
                />
                {survey.q1 ? <Ionicons name="checkmark" size={22} color="#6FC1A2" /> : null}
              </View>
            </View>
            <View style={styles.surveyQBlock}>
              <Text style={styles.surveyQ}>2. What do you like to explore in your neighborhood?</Text>
              <View style={styles.surveyInputRow}>
                <TextInput
                  style={styles.surveyInput}
                  placeholder="..."
                  value={survey.q2}
                  onChangeText={v => handleSurveyChange('q2', v)}
                  editable={!loading}
                />
                {survey.q2 ? <Ionicons name="checkmark" size={22} color="#6FC1A2" /> : null}
              </View>
            </View>
            <View style={styles.surveyQBlock}>
              <Text style={styles.surveyQ}>3. What recreational centers and parks do you usually go to?</Text>
              <View style={styles.surveyInputRow}>
                <TextInput
                  style={styles.surveyInput}
                  placeholder="..."
                  value={survey.q3}
                  onChangeText={v => handleSurveyChange('q3', v)}
                  editable={!loading}
                />
                {survey.q3 ? <Ionicons name="checkmark" size={22} color="#6FC1A2" /> : null}
              </View>
            </View>
            <Text style={styles.surveyQ}>Anything else?</Text>
            <TextInput
              style={styles.surveyTextarea}
              placeholder="Tell us everything."
              value={survey.extra}
              onChangeText={v => handleSurveyChange('extra', v)}
              multiline
              numberOfLines={4}
              editable={!loading}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Review & Submit</Text>
            <Text style={styles.stepDescription}>You're all set! Click submit to finish registration.</Text>
            
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Name:</Text>
              <Text style={styles.reviewValue}>{name}</Text>
            </View>
            
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Email:</Text>
              <Text style={styles.reviewValue}>{email}</Text>
            </View>
            
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Location:</Text>
              <Text style={styles.reviewValue}>{location || 'Not specified'}</Text>
            </View>
            
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Interests:</Text>
              <Text style={styles.reviewValue}>
                {[survey.q1, survey.q2, survey.q3].filter(Boolean).join(', ') || 'None specified'}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.scrollView}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            {steps.map((s, i) => {
              const isActive = step === i + 1;
              const isComplete = step > i + 1;
              return (
                <View key={s.label} style={styles.progressStep}>
                  <View style={[styles.progressCircle, (isActive || isComplete) && styles.progressCircleActive, isActive && styles.progressCircleCurrent]}>
                    {isComplete ? <Ionicons name="checkmark" size={22} color="#fff" /> : isActive ? <Text style={styles.progressStepNum}>{i+1}</Text> : <Text style={styles.progressStepNumInactive}>{i+1}</Text>}
                  </View>
                  <Text style={[styles.progressLabel, isActive && styles.progressLabelActive]}>{s.label}</Text>
                </View>
              );
            })}
          </View>
          {renderStep()}
        </ScrollView>
        {/* Next/Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.nextButtonText}>
                  {step === 4 ? 'Submit' : 'Next'}
                </Text>
                <Ionicons name="arrow-forward" size={22} color="white" style={styles.arrowIcon} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 12,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F4EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressCircleActive: {
    backgroundColor: '#6FC1A2',
  },
  progressCircleCurrent: {
    borderWidth: 2,
    borderColor: '#3A9C7C',
  },
  progressStepNum: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  progressStepNumInactive: {
    color: '#B0B0B0',
    fontWeight: 'bold',
    fontSize: 18,
  },
  progressLabel: {
    color: '#999',
    fontSize: 15,
    fontWeight: '600',
  },
  progressLabelActive: {
    color: '#222',
    fontWeight: 'bold',
  },
  stepContainer: {
    padding: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  surveyTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  surveyDescription: {
    fontSize: 17,
    color: '#888',
    marginBottom: 28,
  },
  surveyQBlock: {
    marginBottom: 18,
  },
  surveyQ: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  surveyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6FCF8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#E6F4EF',
  },
  surveyInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  surveyTextarea: {
    backgroundColor: '#fff',
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginTop: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  reviewValue: {
    fontSize: 18,
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  nextButton: {
    backgroundColor: '#6FC1A2',
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 4,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 4,
  },
}); 