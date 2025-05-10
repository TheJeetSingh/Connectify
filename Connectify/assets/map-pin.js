import React from 'react';
import { View, StyleSheet } from 'react-native';

const MapPin = ({ size = 20 }) => {
  return (
    <View style={[styles.pinContainer, { width: size, height: size * 1.5 }]}>
      <View style={[styles.pin, { width: size, height: size }]} />
      <View style={[styles.shadow, { width: size * 0.8, height: size * 0.2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pin: {
    backgroundColor: '#70C18C',
    borderRadius: 50,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 4,
    zIndex: 2,
    transform: [{ translateY: -5 }],
  },
  shadow: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
    position: 'absolute',
    bottom: 5,
    zIndex: 1,
  },
});

export default MapPin; 