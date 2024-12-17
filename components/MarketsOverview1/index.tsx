import React from "react";
import { View, StyleSheet } from "react-native";
import Swiper from 'react-native-swiper';
import Indian from "./Indian";

const MarketsOverview1 = () => {
  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={true}
        showsPagination={true}
        loop={false}
      >
        <View style={styles.slide}>
          <Indian />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
});

export default MarketsOverview1;