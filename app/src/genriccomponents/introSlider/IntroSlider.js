import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { myWidth, myHeight, heightScale } from '../../utility/Utils';
import resources from '../../../res';
import ImageLoad from '../../genriccomponents/image/ImageLoad'
 
const slides = [
    {
      key: 's1',
      text: 'Choose Your Plan',
      title: 'Choose Your Plan',
      image: resources.images.img_Intro1,
      backgroundColor: resources.colors.appColor,
    },
    {
      key: 's2',
      title: 'Select Slots',
      text: 'Upto 25% off on Domestic Flights',
      image: resources.images.img_Intro2,
      backgroundColor: resources.colors.appColor,
    },
    {
      key: 's3',
      title: 'Add Products',
      text: 'Enjoy Great offers on our all services',
      image: resources.images.img_Intro3,
      backgroundColor: resources.colors.appColor,
    },
    {
      key: 's4',
      title: 'Verify Product',
      text: ' Best Deals on all our services',
      image: resources.images.img_Intro4,
      backgroundColor: resources.colors.appColor,
    },
    {
      key: 's5',
      title: 'Checkout',
      text: 'Enjoy Travelling on Bus with flat 100% off',
      image: resources.images.img_Intro5,
      backgroundColor: resources.colors.appColor,
    }
  ];
 
class IntroSlider extends React.Component {
    constructor(props){
        super(props);
        this.onDoneCallback = this.props.onDoneCallback ? this.props.onDoneCallback : null
        this.onSkipCallback = this.props.onSkipCallback ? this.props.onSkipCallback : null
        this.state = {
            showRealApp: this.props.showRealApp ? this.props.showRealApp : false,
            showSkipButton: this.props.showSkipButton ? this.props.showSkipButton : false,
        }
    }
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
            flex: 1,
            backgroundColor: item.backgroundColor,
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 70,
            borderRadius: 10
        }}>
        <Text style={styles.introTitleStyle}>
            {item.title}
        </Text>
        {/* <Image
            style={styles.introImageStyle}
            source={item.image} /> */}
        <ImageLoad
            style={[styles.introImageStyle]}
            topLeftBorderRadius={10}
            topRightBorderRadius={10}
            customImagePlaceholderDefaultStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            source={item.image ? item.image : resources.images.img_placeholer_small}
            resizeMode="cover" />
        {/* <Text style={styles.introTextStyle}>
            {item.text}
        </Text> */}
    </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
        return <AppIntroSlider 
            renderItem={this._renderItem} 
            data={slides} 
            onDone={this.onDoneCallback}
            showSkipButton={this.state.showSkipButton}
            // showPrevButton={true}
            onSkip={this.onSkipCallback}
            // bottomButton
        />;
    } else {
        return null;
    }
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 10,
      justifyContent: 'center',
    },
    titleStyle: {
      padding: 10,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    paragraphStyle: {
      padding: 20,
      textAlign: 'center',
      fontSize: 16,
    },
    introImageStyle: {
        // width: 200,
        // height: myHeight,
        flex: 1,
        width: '80%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    introTextStyle: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      paddingVertical: 30,
    },
    introTitleStyle: {
      fontSize: 25,
      color: 'white',
      textAlign: 'center',
      marginBottom: 16,
      marginTop: 15,
      fontWeight: 'bold',
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default IntroSlider;