import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const IconText = ({url, text}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={url}
        resizeMode="contain"
        resizeMethod="auto"
      />
      <Text style={{color: '#36454f', fontSize: 12}}>{text}</Text>
    </View>
  );
};

export default IconText;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
  },
});
