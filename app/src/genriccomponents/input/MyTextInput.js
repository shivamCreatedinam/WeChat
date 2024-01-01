import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import resources from '../../../res';

export class MyTextInput extends Component {
  constructor(props) {
    super(props);
    this.refInput = null;
  }
  onFocus = () => {
    this.refInput?.focus();
  };
  onRightButtonClick = () => {
    this.refInput?.blur();
    this.props.rightButtonProps.onPress();
  };
  render() {
    const {renderRightView, rightButtonProps, placeholderText,isCart,isGst, containerStyle={}} = this.props;
    return (
      <TouchableOpacity onPress={this.onFocus} style={( isCart || isGst) ? [styles.InputContainer, containerStyle] : [styles.myInputContainer, containerStyle]}>
        <TextInput
          ref={ref => (this.refInput = ref)}
          style={styles.myInput}
          placeholder={placeholderText}
          autoCaptialize={'none'}
          autoCorrect={false}
          autoFocus={false}
          placeholderTextColor={resources.colors.grayColor}
          underlineColorAndroid={'transparent'}
          {...this.props}
        />
        {renderRightView
          ? renderRightView()
          : rightButtonProps.isShow && (
              <TouchableOpacity style={styles.myInputRightButton} onPress={this.onRightButtonClick}>
                <Text
                  style={styles.myInputRightButtonTxt}
                  >
                  {rightButtonProps.text}
                </Text>
              </TouchableOpacity>
            )}
      </TouchableOpacity>
    );
  }
}

export default MyTextInput;
