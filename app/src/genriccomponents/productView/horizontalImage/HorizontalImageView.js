import React from 'react';
import {View, TouchableOpacity, Image,Text} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styles from './styles';
import resources from '../../../../res';
import {myWidth} from '../../../utility/Utils';

function HorizontalImageView(props) {
  const {
    onSnapToItem,
    data,
    onPressBack,
    onPressHorizontalImageView,
    frpStyle,
    reference,
    pageType,
  } = props;

  return (
    <View style={{alignItems: 'center'}}>
      <Carousel
        ref={reference}
        data={data}
        sliderWidth={pageType == "combo" ? myWidth - 55 : pageType == 'categoryScreen' ? myWidth - 50 : myWidth}
        itemWidth={pageType == "combo" ? myWidth - 55 : myWidth + 200}
        layout={'default'}
        containerCustomStyle={pageType == "combo" ? {backgroundColor: 'white',borderTopLeftRadius:10,borderTopRightRadius:10} : {backgroundColor: 'white'}}
        renderItem={({item, index}) => (
          <RenderItem
            data={item}
            itemKey={index}
            onPressBack={onPressBack}
            onPressHorizontalImageView={onPressHorizontalImageView}
            frpStyle={frpStyle}
            pageType={pageType}
          />
        )}
        onSnapToItem={index => onSnapToItem(index)}
      />
      <View style={[frpStyle ? styles.frpDotContainer : styles.dotContainer]}>
        {pagination(props)}
      </View>
    </View>
  );
}

function pagination(props) {
  const {data, activeIndexHorizontal} = props;
  return (
    <Pagination
      dotsLength={data.length}
      activeDotIndex={activeIndexHorizontal}
      containerStyle={styles.transparentColor}
      dotStyle={styles.activeDotStyle}
      inactiveDotStyle={styles.whiteColor}
      //#C0C0C6 inactiveDotColor={resources.colors.white}
      inactiveDotColor={'#C0C0C6'}
      //dotColor={resources.colors.newYellow}
      dotColor={'#71717A'}
      inactiveDotOpacity={1}
      inactiveDotScale={1}
      dotContainerStyle={styles.marginHoriDotStyle}
    />
  );
}
function RenderItem(props) {
  const {data, frpStyle, onPressHorizontalImageView, pageType} = props;
  return (
    <View>
      <TouchableOpacity onPress={onPressHorizontalImageView}>
    
        <Image
          source={data ? {uri: data} : resources.images.img_placeholer_large}
          style={[ pageType == "combo" ?  styles.productImage  :
            frpStyle
              ? pageType == 'categoryScreen'
                ? styles.frpImageStyle
                : styles.frpImageStyle1
              : pageType == 'categoryScreen'
              ? styles.imageStyle
              : styles.imageStyle1,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

export default HorizontalImageView;
