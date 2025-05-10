import React from 'react';
import { View, StyleSheet } from 'react-native';

const TreesIcon = ({ size = 80, color = 'white' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.largeTrunk, { backgroundColor: color }]} />
      <View style={[styles.largeTree, { backgroundColor: color }]} />
      <View style={[styles.smallTrunk, { backgroundColor: color }]} />
      <View style={[styles.smallTree, { backgroundColor: color }]} />
      <View style={[styles.ground, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  largeTrunk: {
    position: 'absolute',
    left: '40%',
    top: '50%',
    width: '10%',
    height: '30%',
  },
  largeTree: {
    position: 'absolute',
    left: '25%',
    top: '20%',
    width: '40%',
    height: '40%',
    borderRadius: 50,
  },
  smallTrunk: {
    position: 'absolute',
    left: '65%',
    top: '60%',
    width: '8%',
    height: '20%',
  },
  smallTree: {
    position: 'absolute',
    left: '55%',
    top: '35%',
    width: '28%',
    height: '30%',
    borderRadius: 40,
  },
  ground: {
    position: 'absolute',
    left: '20%',
    bottom: '15%',
    width: '60%',
    height: '5%',
  },
});

export default TreesIcon; 