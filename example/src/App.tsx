import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import LottieLoader from './nativeComponents/LottieLoader';

export default function App() {
  return (
    <View style={styles.container}>
      <LottieLoader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
