import React from 'react';
import { View, StyleSheet } from 'react-native';
import MarketsOverview1 from '@/components/MarketsOverview1';

export default function Home() {
  return (
    <View style={styles.container}>
      <MarketsOverview1 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});