import {StyleSheet, Text, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import resources from '../../../res';

const CustomButton = ({onPress, text, textStyle, btnStyle}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: resources.colors.appColor,
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: 24,
          height: 56,
          marginTop: -55,
          borderRadius: 10,
        },
        btnStyle,
      ]}>
      <Text
        style={[
          {
            color: 'white',
            fontSize: 16,
            fontWeight: '500',
            fontFamily: resources.fonts.regular,
          },
          textStyle,
        ]}>
        {text}
      </Text>
      <Image source={require('../../../res/images/Image/right.png')} />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
