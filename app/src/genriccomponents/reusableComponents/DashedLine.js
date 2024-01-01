import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../res/colors';

const DashedLine = ({customStyle,cartScreenAddAddressComp,editAddress}) => {
  return (
    <View style={ (cartScreenAddAddressComp || editAddress) ? styles.dashAddAddress :[styles.dashedBorder, {...customStyle}]}>
      <Text ellipsizeMode="clip" style={styles.text} numberOfLines={1}>
        --------------------------------------------------------------------------------------------------
      </Text>
    </View>
  );
};

export default DashedLine;

const styles = StyleSheet.create({
  dashedBorder: {
    width: '100%',
    marginTop: 24,
    marginBottom: 24,
  },
  dashAddAddress:{
    width: '100%',
    marginTop: 10,
    marginBottom: 14,
  },
  text: {color: colors.borderDot, letterSpacing: 5},
});
