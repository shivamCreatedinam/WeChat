import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import AppUser from '../../utility/AppUser';
import events from '../../utility/Events';
import HeaderWithLocation from '../../genriccomponents/header/HeaderWithLocation';
import HeaderWithChat from '../../genriccomponents/header/HeaderWithChat';
import MaterialInput from '../../genriccomponents/input/MaterialInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HorizontalBaannerImageView from '../../genriccomponents/productView/horizontalBannerImage/HorizontalBaannerImageView';
import resources from '../../../res';
import Modal from 'react-native-modal';
import styles from './styles';
import NetInfo from '@react-native-community/netinfo';
import { CategoriesView } from './views/CategoriesView';
import * as actions from '../../redux/actions/HomeAction';
import DeviceInfo from 'react-native-device-info';
import { checkForAppUpdates } from '../../redux/actions/HomeAction';
import {
  hitAddressListingApi,
  setAddressList,
} from '../../redux/actions/AddressAction';
import { connect } from 'react-redux';
import Button from '../../genriccomponents/button/Button';
import {
  heightScale,
  isPlatformIOS,
  checkIfUserIsLoggedIn,
  myWidth,
  renderInputError,
  validateEmail,
  myHeight,
} from '../../utility/Utils';
import ImageLoad from '../../genriccomponents/image/ImageLoad';
import AppToast from '../../genriccomponents/appToast/AppToast';
import ReviewComponent from '../../genriccomponents/productView/review/Review';
import { hitReviewListingApi } from '../../redux/actions/ProductDetailsAction';
import { hitInvoiceListingApi } from '../../redux/actions/InvoiceAction';
import { getViewOrderDetailApi } from '../../redux/actions/OrderAction';
import {
  hitFirstRunningOrderApi,
  hitChatBotQueryRequestApi,
} from '../../redux/actions/DocumentAction';
import { getCartDetailApi } from '../../redux/actions/CartAction';


import database from '@react-native-firebase/database';
import { TextInput } from 'react-native';


class HomeScreen extends Component {
  static ROUTE_NAME = 'HomeScreen';
  constructor(props) {
    super(props);
    console.log("props", props?.navigation?.navigate)
    this.state = {
      allUsers: []
    };

  }
  renderHeader = () => {
    return (
      <HeaderWithLocation
        headerTitle={this.state.currentSeletcedCity}
        appLogoVisible={true}
        isBackIconVisible={false}
        isLogoutVisible={false}
        navigateProps={this.props.navigation}
        onClickLocation={this.onClickLocation}
      />
    );
  };


  componentDidMount() {
    this.readMessages();
    // try {
    //   const item = {
    //     receiver_id: 1,
    //     sender_id: 2,
    //     name: "pooja",
    //     profile_image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    //     last_message: "Hello",
    //     is_read: false,
    //     last_update: new Date().getDate(),
    //     sent_time: new Date()
    //   }
    //   database().ref('/AllMessages/users').push(
    //     item
    //   ).then((snap) => {
    //     const key = snap.key
    //     console.log("key", key)
    //     const loadRef = database().ref('/AllMessages/users').child(String(key)).update({ key: String(key) });
    //     console.log("loadRef", loadRef)
    //   });

    //   console.log("save", reference)
    // } catch (error) {
    //   console.log("error", error)
    // }
  }

  readMessages() {
    try {
      const dataRef = database().ref('/AllMessages/users');
      dataRef.on('value', snapshot => {
        const newData = [];
        snapshot.forEach(childSnapshot => {
          newData.push(childSnapshot.val());
        });
        this.setState({ allUsers: newData })
        console.log("snapshot", JSON.stringify(newData))
      });
    } catch (error) {
      console.log("error", error)
    }
  }

  renderItem(item) {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 20, elevation: 5, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 2, borderRadius: 5 }}
        onPress={() => this.props.navigation?.navigate("ChatScreen", { item: item?.item })} >
        <Image source={{ uri: item?.item?.profile_image }} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 220, marginTop: 0, }} />
        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{item?.item?.name}</Text>
          <Text>{item?.item?.last_message}</Text>
          <Text style={{ marginTop: 10, fontSize: 10, color: 'grey' }}>{item?.item?.last_update}</Text>
        </View>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7F8', marginTop: 0 }}>
        {this.renderHeader()}
        {/* <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} /> */}
        <View style={{ height: 50, width: '90%', marginHorizontal: 20, marginVertical: 10, borderRadius: 15, borderColor: 'grey', borderWidth: 1, elevation: 5, backgroundColor: '#fff' }} >
          <TextInput placeholder='Search' style={{ flex: 1, paddingLeft: 15 }} />
        </View>
        <View>
          <FlatList
            data={this.state.allUsers}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        </View>
      </SafeAreaView>
    );
  }


}

const mapStateToProps = state => {
  return {};
};
const container = connect(
  mapStateToProps,
  {
    ...actions,
    hitReviewListingApi,
    hitInvoiceListingApi,
    hitFirstRunningOrderApi,
    hitChatBotQueryRequestApi,
    getViewOrderDetailApi,
    getCartDetailApi,
    hitAddressListingApi,
    setAddressList,
    checkForAppUpdates,
    checkForAppUpdates,
  },
)(HomeScreen);

export default container;
