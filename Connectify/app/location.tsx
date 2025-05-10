import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView,
  TextInput
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const options = { headerShown: false };

export default function LocationScreen() {
  const [location, setLocation] = useState('');

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Progress Steps */}
      <View style={styles.progressSteps}>
        <View style={styles.stepItem}>
          <View style={styles.completedStep}>
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.stepLabelCompleted}>Account</Text>
        </View>
        
        <View style={styles.stepItem}>
          <View style={styles.activeStep}>
            <Text style={styles.stepNumberActive}>2</Text>
          </View>
          <Text style={styles.stepLabelActive}>Location</Text>
        </View>
        
        <View style={styles.stepItem}>
          <View style={styles.inactiveStep}>
            <Text style={styles.stepNumberInactive}>3</Text>
          </View>
          <Text style={styles.stepLabelInactive}>Survey</Text>
        </View>
        
        <View style={styles.stepItem}>
          <View style={styles.inactiveStep}>
            <Text style={styles.stepNumberInactive}>4</Text>
          </View>
          <Text style={styles.stepLabelInactive}>Review</Text>
        </View>
      </View>
      
      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Set Your Location</Text>
        <Text style={styles.description}>
          Let us know where you are to find events near you
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your city or area"
          placeholderTextColor="#BBBBBB"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      
      {/* Next Button */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.nextButtonText}>Next</Text>
        <Ionicons name="arrow-forward" size={22} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 60,
  },
  stepItem: {
    alignItems: 'center',
  },
  completedStep: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#86D9A0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeStep: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#86D9A0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#70C18C',
  },
  inactiveStep: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F4EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumberActive: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepNumberInactive: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BBBBBB',
  },
  stepLabelCompleted: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  stepLabelActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  stepLabelInactive: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  contentContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  description: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    color: '#333333',
  },
  nextButton: {
    backgroundColor: '#86D9A0',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
}); 