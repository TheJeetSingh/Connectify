import React from 'react';
import { View, StyleSheet } from 'react-native';

const MapPlaceholder = () => {
  return (
    <View style={styles.container}>
      {/* Roads */}
      {Array(15).fill(0).map((_, i) => (
        <View 
          key={`h-road-${i}`} 
          style={[
            styles.horizontalRoad,
            {
              top: (i * 50) + Math.random() * 10,
              left: -(Math.random() * 40),
              width: `${70 + Math.random() * 30}%`,
              transform: [{ rotate: `${(Math.random() * 10) - 5}deg` }]
            }
          ]}
        />
      ))}
      
      {Array(10).fill(0).map((_, i) => (
        <View 
          key={`v-road-${i}`} 
          style={[
            styles.verticalRoad,
            {
              left: (i * 40) + Math.random() * 20,
              top: -(Math.random() * 20),
              height: `${70 + Math.random() * 30}%`,
              transform: [{ rotate: `${(Math.random() * 10) - 5}deg` }]
            }
          ]}
        />
      ))}
      
      {/* Blocks */}
      {Array(40).fill(0).map((_, i) => (
        <View 
          key={`block-${i}`} 
          style={[
            styles.block,
            {
              top: Math.random() * 800,
              left: Math.random() * 400,
              width: 30 + Math.random() * 40,
              height: 30 + Math.random() * 40,
              transform: [{ rotate: `${Math.random() * 40}deg` }]
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    overflow: 'hidden',
  },
  horizontalRoad: {
    position: 'absolute',
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  verticalRoad: {
    position: 'absolute',
    width: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  block: {
    position: 'absolute',
    backgroundColor: '#e6e9ee',
    borderRadius: 4,
  },
});

export default MapPlaceholder; 