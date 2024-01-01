import React, {Component} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Dimensions, Platform, StyleSheet, View, Text} from 'react-native';
import {
  heightScale,
  isIphone11orAbove,
  isPlatformIOS,
  myWidth,
} from '../../../utility/Utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');

const HorizontalBaannerImageView = props => {
  const handlePress = cat_name => {
    console.log('handlepress', cat_name);
    props.onPressSliderAction(cat_name);
  };
  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('corousel item---', item);
          handlePress(item.cat_name);
        }}
        style={styles.item}>
        <ParallaxImage
          source={{uri: item?.imgUrl}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.0}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2} />
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      sliderWidth={screenWidth}
      sliderHeight={screenWidth}
      itemWidth={screenWidth - 60}
      data={props.data}
      renderItem={_renderItem}
      hasParallaxImages={true}
      firstItem={1}
      loop={true}
    />
  );
};

export default HorizontalBaannerImageView;

const styles = StyleSheet.create({
  item: {
    // width: screenWidth - 60,
    // height: screenWidth - 60,
    width: myWidth - 60,
    height: isIphone11orAbove() ? heightScale(190) : heightScale(190),
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'transparent',
    borderRadius: isPlatformIOS ? 15 : 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
