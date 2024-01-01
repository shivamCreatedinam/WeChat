import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import res from '../../../res';
import resources from '../../../res';
import fonts from '../../../res/constants/fonts';
import colors from '../../../res/colors';
import images from '../../../res/images';
import { Slider } from '@miblanchard/react-native-slider';

const marks = [
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
  { value: 18, label: '18' },
  { value: 24, label: '24' },
];

function NormalTenureSlider(props) {
  const {
    rental_frequency_message,
    serverData,
    onSliderCallback,
    defaultItem,
    dataSet,
    onChangeTab,
    selectedDuration,
  } = props;
  const [value, setValue] = useState(serverData.length - 1);
  console.log('tenure data------', serverData[0]?.attr_name.split(' ')[0]);

  let localDefaultItem = 0;
  let lastIndex = serverData.length - 1;
  if (defaultItem > lastIndex) {
    localDefaultItem = lastIndex;
  } else {
    localDefaultItem = defaultItem;
  }

  const data = getFormatedArray(serverData);

  let sliderMarks = serverData.map((item, index) => {
    return index;
  });

  const handleSetValue = i => {
    setValue(i);
    onChangeTab(i);
  };
  const isPercent =
    selectedDuration?.strikeout_price &&
    selectedDuration?.strikeout_price.length &&
    selectedDuration?.attr_price &&
    selectedDuration?.attr_price;
  return serverData.length > 0 ? (
    <View style={{ width: '88%' }}>
      <Slider
        value={value}
        onValueChange={value => {
          handleSetValue(value);
        }}
        containerStyle={{ marginTop: 20, marginBottom: 25 }}
        trackMarks={sliderMarks}
        trackStyle={[styles.slider]}
        minimumTrackStyle={styles.slider}
        step={1}
        // animateTransitions={true}
        thumbTouchSize={{ height: 100, width: 50 }}
        animationType="timing"
        renderTrackMarkComponent={index => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleSetValue(index);
              }}>
              <Text
                onPress={() => handleSetValue(index)}
                style={[styles.tenureText, { padding: 20 }]}>
                {serverData[index]?.attr_name.split(' ')[0]}+
              </Text>
            </TouchableOpacity>
          );
        }}
        minimumValue={0}
        maximumValue={serverData?.length - 1}
        renderThumbComponent={() => {
          return (
            <View>
              <ImageBackground
                source={images.outer_container}
                resizeMode="contain"
                style={[styles.activeTab, { alignContent: 'center' }]}>
                <Text
                  style={[styles.tenureText, { fontSize: 18, color: 'white' }]}>
                  {serverData[value]?.attr_name.split(' ')[0]}+
                </Text>
              </ImageBackground>
            </View>
          );
        }}
      />

      <View
        style={{
          backgroundColor: '#EFECE6',
          padding: 12,
          borderRadius: 20,
          marginTop: 20, paddingLeft: 20
        }}>
        <View style={styles.rentalHeading}>
          <Text style={styles.titleText}>Rental details</Text>
        </View>
        <View style={styles.top}>
          <View style={styles.row}>
            <View style={{ alignItems: 'center', marginTop: 5 }} >
              <Image
                style={styles.icon}
                source={require('../../../res/images/productDetail/icon.png')}
              />
            </View>
            <View style={styles.durContainer}>
              <Text style={styles.lblText}>Duration</Text>
              <Text style={styles.lblText1}>{selectedDuration?.attr_name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.top}>
          <View style={styles.row}>
            <View style={{ alignItems: 'center', marginTop: 8 }} >
              <Image
                style={styles.icon}
                source={require('../../../res/images/productDetail/rupee.png')}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.lblText}>Monthly Rent</Text>
              <View style={[styles.row, { alignItems: 'center' }]}>
                <Text style={styles.lblText1}>
                  ₹{selectedDuration?.attr_price}
                </Text>
                {selectedDuration?.strikeout_price ? (
                  <Text style={styles.strikedPrice}>
                    ₹{selectedDuration?.strikeout_price}
                  </Text>
                ) : (
                  <></>
                )}

                {isPercent ? (
                  <View style={styles.percent}>
                    <Image
                      source={images.img_percent}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={{
                        color: colors.white,
                      }}>
                      {parseInt(
                        ((selectedDuration?.strikeout_price -
                          selectedDuration?.attr_price) /
                          selectedDuration?.strikeout_price) *
                        100,
                      )}
                      % OFF
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.top}>
          <View style={styles.row}>
            <View style={{ alignItems: 'center' }} >
              <Image
                style={styles.iconLock}
                source={require('../../../res/images/productDetail/lock.png')}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.lblText}>Security Deposit</Text>
              <Text style={styles.lblText1}>
                ₹{selectedDuration?.shipping_deposit}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.top}>
          <View style={styles.row}>
            <View style={{ alignItems: 'center' }} >
              <Image
                style={styles.iconLock}
                source={require('../../../res/images/productDetail/installation.png')}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.lblText}>One-time Installation charges</Text>
              <Text style={styles.lblText1}>
                ₹{selectedDuration?.shipping_deposit}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  ) : (
    renderEmptyListView()
  );
}
function renderEmptyListView() {
  return <View style={{ height: 20 }} />;
}
function getFormatedArray(serverData) {
  let arr = [];
  for (let index = 0; index < serverData.length; index++) {
    const element = serverData[index];
    arr.push({
      value: index,
      label: getMonthOnly(element.attr_name),
    });
  }
  return arr;
}

function getMonthOnly(string) {
  return string.substr(0, string.indexOf(' ')) + '+';
}
const styles = StyleSheet.create({
  slider: { height: 48, backgroundColor: '#EFECE6', borderRadius: 20 },
  sliderDot: {
    width: 18,
    height: 18,
    backgroundColor: res.colors.white,
    borderWidth: 5,
    borderColor: res.colors.appColor,
  },
  percent: {
    backgroundColor: colors.uploadedText,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  activeTab: {
    // backgroundColor: '#2D9469',
    width: 82.5,
    height: 72,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: resources.fonts.medium, color: colors.titleBlack
  },
  top: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  lblText1: {
    fontSize: 20, color: '#222222',
    fontWeight: '500',
    fontFamily: resources.fonts.medium,
  },
  strikedPrice: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.labelColor,
    marginLeft: 8,
    textDecorationLine: 'line-through',
  },
  tenureText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: resources.fonts.medium,
    color: colors.labelColor,
  },
  lblText: {
    fontSize: 14,
    fontWeight: '400', color: colors.titleBlack,
    fontFamily: resources.fonts.regular,
  },
  icon: {
    height: 22,
    width: 22, resizeMode: 'contain', tintColor: "#000",
  },
  iconLock: {
    height: 25,
    width: 25, resizeMode: 'contain', tintColor: "#000"
  },
  rentalHeading: {
    // paddingLeft:5,
    paddingTop: 2
  },
  durContainer: {
    marginLeft: 10
  }
});
export default NormalTenureSlider;
