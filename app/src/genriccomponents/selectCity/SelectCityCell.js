import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import res from '../../../res'
import styles from './style';

const SelectCityCell = (props) => {
  return (

    <View style={[styles.cellStyle, props.isSelected && styles.cellStyleSelected]}>
      <TouchableOpacity onPress={props.onPress}>
        <Image style={styles.imageThumbnail} source={{ uri: props.src }} />
      </TouchableOpacity>
    </View>
  );
};
export default SelectCityCell;
