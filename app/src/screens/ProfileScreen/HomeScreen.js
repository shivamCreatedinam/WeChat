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
  Alert
} from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageContaints from '../../utility/AsyncStorageConstants';
import axios from "axios";
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
import styles from '../home/styles';
import NetInfo from '@react-native-community/netinfo';
import { CategoriesView } from '../home/views/CategoriesView';
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
import AudioRecord from 'react-native-audio-record';
import {
  hitFirstRunningOrderApi,
  hitChatBotQueryRequestApi,
} from '../../redux/actions/DocumentAction';
import { getCartDetailApi } from '../../redux/actions/CartAction';
import database from '@react-native-firebase/database';
import { TextInput } from 'react-native';
const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'test.wav' // default 'audio.wav'
};

class HomeScreen extends Component {
  static ROUTE_NAME = 'HomeScreen';
  constructor(props) {
    super(props);
    console.log("props", props?.navigation?.navigate)
    this.state = {
      allUsers: [],
      name: '',
      userToken: '',
      surveyNextBlock: '',
      surveCount: null,
      loading: false
    };
  }

  renderHeader = () => {
    return (
      <HeaderWithLocation
        headerTitle={this.state.name}
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
  }

  async readMessages() {
    try {
      AudioRecord.init(options);
      const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
      const UserData = await AsyncStorage.getItem(AsyncStorageContaints.UserData);// AsyncStorageContaints.surveyNextBlock
      const surveyNextBlock = await AsyncStorage.getItem(AsyncStorageContaints.surveyNextBlock);
      const surveyCompleteCount = await AsyncStorage.getItem(AsyncStorageContaints.surveyCompleteCount);
      this.setState({ name: UserData, userToken: userId, surveyNextBlock: surveyNextBlock, surveCount: surveyCompleteCount });
      console.log("error", userId)
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

  async navigateToSurvey() {
    // api/generate-survey-token
    let SERVER = 'https://createdinam.in/RBI-CBCD/public/api/generate-survey-token'
    let tempServerTokenId = ';'
    this.setState({ loading: true });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.state.userToken}`
    }
    axios.get(`${SERVER}`, {
      headers: headers
    })
      .then((response) => {
        if (response.data.status === true) {
          let serverToken = response?.data?.surveyToken
          console.log('navigateToSurvey', JSON.stringify(response.data))
          AsyncStorage.setItem(AsyncStorageContaints.tempServerTokenId, serverToken);
          showMessage({
            message: "Survey Token Generated",
            description: "Survey Token Generated, You can take survey!",
            type: "success",
          });
          this.setState({ loading: false });
          this.CheckCurrentActiveSurvey();
          // this.props.navigation.navigate('BlockFSurveyScreen');
        } else {
          console.log('navigateToSurvey', JSON.stringify(response.data))
          showMessage({
            message: "Something went wrong!",
            description: "Something went wrong. Try again!",
            type: "danger",
          });
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        console.log('navigateToSurvey', JSON.stringify(error))
        showMessage({
          message: "Something went wrong!",
          description: "Something went wrong. " + error,
          type: "danger",
        });
        this.setState({ loading: false });
      })
  }

  CheckCurrentActiveSurvey = () => {
    this.props.navigation.navigate('AddSurveyScreen');
  }

  navigateToPendingSurvey = () => {
    console.log("this.state.surveyNextBlock", this.state.surveyNextBlock)
    if (this.state.surveyNextBlock === '' || this.state.surveyNextBlock === null) {
      showMessage({
        message: "You Haven't Any Draft Survey",
        description: "Create new survey!",
        type: "danger",
      });
      // this.props.navigation.replace('AddSurveyScreen');
    } else if (this.state.surveyNextBlock === 'B') {
      console.log("inside B")
      this.props.navigation.replace('BlockBSurveyScreen');
    } else if (this.state.surveyNextBlock === 'C') {
      console.log("inside C")
      this.props.navigation.replace('BlockCSurveyScreen');
    } else if (this.state.surveyNextBlock === 'D') {
      this.props.navigation.replace('BlockDSurveyScreen');
      console.log("inside D")
    } else if (this.state.surveyNextBlock === 'E') {
      this.props.navigation.replace('BlockESurveyScreen');
      console.log("inside E")
    } else if (this.state.surveyNextBlock === 'F') {
      console.log("inside F")
      this.props.navigation.replace('BlockFSurveyScreen');
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7F8', marginTop: 0 }}>
        {this.renderHeader()}
        {/* <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} /> */}
        <View style={{ height: 50, width: '90%', marginHorizontal: 20, marginVertical: 10, borderRadius: 15, borderColor: 'grey', borderWidth: 1, elevation: 5, backgroundColor: '#fff' }} >
          <TextInput placeholder='Search' style={{ flex: 1, paddingLeft: 15 }} />
        </View>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <TouchableOpacity onPress={() => {
            (this.state.surveyNextBlock === '' || this.state.surveyNextBlock === null) ? this.navigateToSurvey() : showMessage({
              message: "Please Check",
              description: "You May Have A Draft Survey!",
              type: "danger",
            });
          }} style={{ paddingVertical: 14, paddingHorizontal: 20, backgroundColor: '#000', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#fff' }} source={require('../../../res/images/add_survery_logo.png')} />
            {this.state.loading === false ? <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', flex: 1 }}>Create New Survey</Text> : <ActivityIndicator style={{ alignSelf: 'center', flex: 1 }} color={'#fff'} />}
          </TouchableOpacity>
          {this.state.surveyNextBlock !== '' ? <TouchableOpacity onPress={() => this.navigateToPendingSurvey()} style={{ paddingVertical: 14, paddingHorizontal: 20, backgroundColor: '#000', borderRadius: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#fff' }} source={require('../../../res/images/add_survery_logo.png')} />
            {/* {this.state.loading === false ?  */}
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', flex: 1 }}>Draft Survey {this.state.surveyNextBlock}</Text> 
            {/* : <ActivityIndicator style={{ alignSelf: 'center', flex: 1 }} color={'#fff'} />} */}
          </TouchableOpacity> : null}
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
