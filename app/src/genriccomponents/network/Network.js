import React, {Component} from 'react';
import {View, Text} from 'react-native';
import NetInfo, {NetInfoStateType} from '@react-native-community/netinfo';
import strings from '../../../res/constants/strings';
import styles from './styles';

class OfflineNotice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: true,
    };
  }
  componentDidMount() {
    NetInfo.fetch()
      .then(connectionInfo => this.handleNetInfoChange(connectionInfo))
      .catch(error => {
        // console.log(`net err 01=> `, error);
      });

    // Subscribe net setting change.
    this.unsubscribeNet = NetInfo.addEventListener(this.handleNetInfoChange);
  }

  componentWillUnmount() {
    // Unsubscribe net setting change.
    if (this.unsubscribeNet) this.unsubscribeNet();
  }

  // Handle net setting change.
  handleNetInfoChange = connectionInfo => {
    const {isConnected, type} = connectionInfo;
    if (
      `${type}` === NetInfoStateType.none ||
      `${connectionInfo.type}` === NetInfoStateType.unknown
    ) {
      this.setState({isConnected});
    }
    this.setState({isConnected});
  };

  // Show message on no internet connection.
  MiniOfflineSign = () => {
    return (
      <View style={styles.offlineContainer}>
        <Text
          style={styles.offlineText}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {strings.NO_INTERNET_CONNECTION}
        </Text>
      </View>
    );
  };

  render() {
    if (!this.state.isConnected) {
      return this.MiniOfflineSign();
    }
    return null;
  }
}

export default OfflineNotice;
