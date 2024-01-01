import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet,
  LayoutAnimation, Platform, UIManager, Image
} from "react-native";
import Colors from '../../../res/colors';
import resources from '../../../res';
import { myWidth } from '../../utility/Utils';

class FrpAccordian extends Component {

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
    fontSize: 13.5,
    fontWeight: '500',
    fontFamily: resources.fonts.regular,
    color: Colors.txtGetOTP,
    width: myWidth - 75,
    borderWidth: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    paddingLeft: 15,
    paddingRight: 25,
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
    padding: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  childTextStyle: {
    fontFamily: resources.fonts.regular,
    color: resources.colors.timerColor,
    fontSize: 13
  }

});

export default FrpAccordian