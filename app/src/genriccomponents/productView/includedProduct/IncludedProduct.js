import React from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import resources from '../../../../res';
import ImageLoad from '../../image/ImageLoad';
function IncludedProductComponent(props) {
  const {data} = props;

  return (
    <View>
      <View style={styles.marginLeft}>
        <FlatList
          data={data ? data : []}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <IncludedProductCell data={item} itemKey={index} />
          )}
        />
      </View>
    </View>
  );
}

function IncludedProductCell(props) {
  const {data} = props;

  return (
    <View style={[styles.corporateVerticalCardContainer]}>
      <TouchableOpacity
        onPress={() => {
          console.log('click');
        }}>
        <View
          style={{
            height: 80,
            width: 120,
          }}>
          <ImageLoad
            style={styles.productImageStyle}
            topLeftBorderRadius={6}
            topRightBorderRadius={6}
            customImagePlaceholderDefaultStyle={{
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
            source={
              data.product_image
                ? {uri: data.product_image}
                : resources.images.img_placeholer_small
            }
            resizeMode={'cover'}
          />
        </View>
        <Text
          style={[styles.nameTextStyle]}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {data.product_name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default IncludedProductComponent;
