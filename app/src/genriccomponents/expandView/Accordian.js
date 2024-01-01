import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet,
  LayoutAnimation, Platform, UIManager, Image
} from "react-native";
import Colors from '../../../res/colors';
import resources from '../../../res';
import { myWidth } from '../../utility/Utils';

class Accordian extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: props.isExpand,
      onExpand: props.onExpand,
      id: props.id
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.expanded !== nextProps.isExpand) {
      this.setState({ expanded: nextProps.isExpand })
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity ref={this.accordian} style={styles.row}
          onPress={() => this.toggleExpand()}>
          <Text style={[styles.title, styles.font]}
            numberOfLines={2}
            ellipsizeMode={'tail'}
          >
            {this.props.title}</Text>
          <Image source={this.state.expanded ? resources.images.icn_Minus : resources.images.icn_Plus}
            style={{ width: 15, height: 15 }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {
          this.state.expanded &&
          <View style={styles.child}>
            <Text style={styles.childTextStyle}>{this.props.data}</Text>
          </View>
        }

      </View>
    )
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({ expanded: !this.state.expanded },
      () => {
        if (this.props.onExpand) {
          this.props.onExpand(this.props.id,this.state.expanded)
        }
      })
  }

}

const styles = StyleSheet.create({
  title: {
    fontSize: 14.5,
    fontWeight: '500',
    fontFamily: resources.fonts.regular,
    color: Colors.txtGetOTP,
    width: myWidth - 70,
    borderWidth: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  parentHr: {
    height: 1,
    color: Colors.white,
    width: '100%'
  },
  child: {
    backgroundColor: Colors.white,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  childTextStyle: {
    fontFamily: resources.fonts.regular,
    color: resources.colors.timerColor,
    fontSize: 14
  }

});

export default Accordian