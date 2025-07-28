import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Easing } from 'react-native';
import { Constants } from '../constants/constants'; // update path as needed

export default function CustomLoading() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ rotate }] }]}>
        <View style={styles.border} />
      </Animated.View>
      <Image
        source={require('../assets/logo_load.png')} // 👈 Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
  
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Constants.COLORS.RED_TINT,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  circle: {
  position: 'absolute',
  height: 75,
  width: 75,
  borderRadius: 37.5,
  alignItems: 'center',
  justifyContent: 'center',
},
border: {
  height: 75,
  width: 75,
  borderRadius: 37.5,
  borderWidth: 5,
  borderBottomColor: '#f2d635',        // base spinner color
  borderTopColor: '#277fcf', // hides top part for spin effect
  borderLeftColor: '#45de5c', // hides top part for spin effect
  borderRightColor: '#D33333', // hides top part for spin effect
},

  logo: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
