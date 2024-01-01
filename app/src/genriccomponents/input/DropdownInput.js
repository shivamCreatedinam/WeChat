import {View, StyleSheet, TextInput, Image} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import resources from '../../../res';
import {wp} from '../../utility/Utils';

const DropdownInput = props => {
  const {dropdownProps, inputProps} = props;
  return (
    <Dropdown
      animationDuration={1}
      rippleDuration={1}
      onChangeText={dropdownProps?.onDropdownSelect || null}
      data={dropdownProps?.data || []}
      value={dropdownProps?.value}
      dropdownPosition={-3}
      renderBase={props => (
        <View style={[styles.dropDown, dropdownProps?.value && {borderColor: resources.colors.black}]}>
          <TextInput
            value={inputProps?.value}
            placeholder={"Select Document type"}
            placeholderTextColor={resources.colors.grayColor}
            editable={false}
            style={{color: resources.colors.labelColor}}
            {...inputProps}
          />
          <Image
            source={resources.images.img_DropDown}
            style={styles.imgDropDown}
          />
        </View>
      )}
      error={dropdownProps.error}
      {...dropdownProps}
    />
  );
};

export default DropdownInput;

const styles = StyleSheet.create({
  dropDown: {
    height: wp(50),
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: wp(16),
    borderRadius: 8,
    borderColor: resources.colors.borderDot,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgDropDown: {
    height: wp(10),
    width: wp(10),
  },
});
