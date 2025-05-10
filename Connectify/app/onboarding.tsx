import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  
  const handleNext = () => {
    // Navigate to location selection screen
    router.push("/location");
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Large right bubble */}
      <View style={styles.largeSideCircle} />
      
      {/* Decorative bubbles */}
      <View style={styles.bubbleSmall1} />
      <View style={styles.bubbleMedium1} />
      <View style={styles.bubbleLarge} />
      <View style={styles.bubbleSmall2} />
      
      {/* Pagination dots */}
      <View style={styles.paginationContainer}>
        <View style={[styles.paginationDot, styles.activeDot]} />
        <View style={styles.paginationDot} />
        <View style={styles.paginationDot} />
      </View>
      
      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Personalize your experience!</Text>
        <Text style={styles.description}>
          Choose your location and interests to help us personalize your Connectify experience.
        </Text>
      </View>
      
      {/* Next button - fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={22} color="white" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  largeSideCircle: {
    position: 'absolute',
    top: -height * 0.3,
    right: -width * 0.5,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: '#d9ffd9',
    opacity: 0.8,
  },
  bubbleSmall1: {
    position: 'absolute',
    top: height * 0.12,
    left: width * 0.15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8ED3A3',
    zIndex: 1,
  },
  bubbleMedium1: {
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.15,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8ED3A3',
    zIndex: 1,
  },
  bubbleLarge: {
    position: 'absolute',
    top: height * 0.45,
    left: width * 0.05,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#8ED3A3',
    zIndex: 1,
  },
  bubbleSmall2: {
    position: 'absolute',
    top: height * 0.45,
    right: width * 0.15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8ED3A3',
    zIndex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.75,
    marginBottom: 20,
    zIndex: 2,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2F7CF6',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    zIndex: 2,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  description: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    zIndex: 2,
  },
  nextButton: {
    backgroundColor: '#70C18C',
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
  }
}); 