'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import res from '../../../res';

import {
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Text,
  View,
  Platform,
} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import resources from '../../../res';
import { wp } from '../../utility/Utils';
var textPropTypes = Text.propTypes || ViewPropTypes;
var textInputPropTypes = TextInput.propTypes || textPropTypes;
var propTypes = {
  ...textInputPropTypes,
  inputStyle: textInputPropTypes.style,
  labelStyle: textPropTypes.style,
  disabled: PropTypes.bool,
  style: ViewPropTypes.style,
};

var FloatingLabel = createReactClass({
  propTypes: propTypes,

  getInitialState() {
    var state = {
      text: this.props.value,
      dirty: this.props.value || this.props.placeholder,
      initial: true,
    };

    var style = state.dirty ? dirtyStyle : cleanStyle;
    state.labelStyle = {
      fontSize: new Animated.Value(style.fontSize),
      top: new Animated.Value(style.top),
    };

    return state;
  },

  componentWillReceiveProps(props) {
    if (typeof props.value !== 'undefined' && props.value !== this.state.text) {
      this.setState({text: props.value, dirty: !!props.value});
      if (this.state.initial) this._animate(!!props.value);
    }
  },

  _animate(dirty) {
    var nextStyle = dirty ? dirtyStyle : cleanStyle;
    var labelStyle = this.state.labelStyle;
    var anims = Object.keys(nextStyle).map(prop => {
      return Animated.timing(
        labelStyle[prop],
        {
          toValue: nextStyle[prop],
          duration: this.state.initial ? 0 : 200,
        },
        Easing.ease,
      );
    });
    this.state.initial = false;
    Animated.parallel(anims).start();
  },

  _onFocus() {
    this._animate(true);
    this.setState({dirty: true});
    if (this.props.onFocus) {
      this.props.onFocus(arguments);
    }
  },

  _onBlur() {
    if (!this.state.text) {
      this._animate(false);
      this.setState({dirty: false});
    }

    if (this.props.onBlur) {
      this.props.onBlur(arguments);
    }
  },

  onChangeText(text) {
    this.setState({text});
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  },

  updateText(event) {
    var text = event.nativeEvent.text;
    this.setState({text});

    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
  },

  _renderLabel() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Animated.Text
          ref="label"
          style={[this.state.labelStyle, styles.label]}>
          {this.props.children}
          <Text style={this.props.labelStyle}>
            {' ' + this.props.validText}
          </Text>
        </Animated.Text>
      </View>
    );
  },

  render() {
    var props = {
        autoCapitalize: this.props.autoCapitalize,
        autoCorrect: this.props.autoCorrect,
        autoFocus: this.props.autoFocus,
        bufferDelay: this.props.bufferDelay,
        clearButtonMode: this.props.clearButtonMode,
        clearTextOnFocus: this.props.clearTextOnFocus,
        controlled: this.props.controlled,
        editable: this.props.editable,
        enablesReturnKeyAutomatically: this.props.enablesReturnKeyAutomatically,
        keyboardType: this.props.keyboardType,
        multiline: this.props.multiline,
        numberOfLines: this.props.numberOfLines,
        onBlur: this._onBlur,
        onChange: this.props.onChange,
        onChangeText: this.onChangeText,
        onEndEditing: this.updateText,
        onFocus: this._onFocus,
        ref: this.props.myRef,
        onSubmitEditing: this.props.onSubmitEditing,
        password: this.props.secureTextEntry || this.props.password, // Compatibility
        placeholder: this.props.placeholder,
        secureTextEntry: this.props.secureTextEntry || this.props.password, // Compatibility
        returnKeyType: this.props.returnKeyType,
        selectTextOnFocus: this.props.selectTextOnFocus,
        selectionState: this.props.selectionState,
        selectionColor: this.props.selectionColor,
        style: [styles.input, this.props.textInputStyle],
        testID: this.props.testID,
        accessibilityLabel: this.props.accessibilityLabel,
        value: this.state.text,
        underlineColorAndroid: this.props.underlineColorAndroid, // android TextInput will show the default bottom border
        onKeyPress: this.props.onKeyPress,
        validText: this.props.validText,
        maxLength: this.props.maxLength,
        placeholderTextColor:this.props.placeholderTextColor,
        disableFloating: this.props.disableFloating
      },
      elementStyles = [styles.element];

    if (this.props.inputStyle) {
      props.style.push(this.props.inputStyle);
    }

    if (this.props.style) {
      elementStyles.push(this.props.style);
    }

    if(this.props?.value) {
      props.style.push({borderWidth: 1, borderColor: res.colors.black, borderRadius: 8})
    }

    return (
      <View style={elementStyles}>
        {
          !props.disableFloating &&
          this._renderLabel()
        }
        <TextInput {...props} autoCaptialize={"characters"}/>
      </View>
    );
  },
});

var labelStyleObj = {
  marginTop: 26,
  marginLeft: 5,
  color: res.colors.labelColor,
  fontFamily: res.fonts.regular,
  fontWeight: '600',
  position: 'absolute',
};
var labelRightTextStyleObj = {
  marginTop: 21,
  marginLeft: 80,
  color: res.colors.labelColor,
  fontFamily: res.fonts.regular,
  fontWeight: '600',
};

if (Platform.OS === 'web') {
  labelStyleObj.pointerEvents = 'none';
}

var styles = StyleSheet.create({
  element: {
    position: 'relative',
  },
  input: {
    minHeight: 50,
    borderColor: resources.colors.borderDot,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    //borderBottomWidth: 1,
    borderWidth: 1,
    color: res.colors.labelColor,
    fontSize: 12,
    fontFamily: res.fonts.regular,
    borderRadius: 0,
    marginTop: 20,
    maxHeight: 140,
    paddingLeft: 10,
    borderRadius: 8,
  },
  label: labelStyleObj,
  labelRight: labelRightTextStyleObj,
});

var cleanStyle = {
  fontSize: 14,
  top: 7,
};

var dirtyStyle = {
  fontSize: 14,
  top: -32,
};

// module.exports = FloatingLabel;
export default FloatingLabel;
