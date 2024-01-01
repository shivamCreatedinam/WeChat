import React from 'react';
import {View, FlatList, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import resources from '../../../../res';
import ImageLoad from '../../../genriccomponents/image/ImageLoad';
function ProductHorizontalView(props) {
  const {
    productList,
    labelStyles,
    label,
    customStyle,
    corporateData,
    onMoveProduct,
  } = props;
  return (
    <View>
      <View style={[styles.mainContainer, customStyle]}>
        {corporateData ? (
          <Text style={[styles.corporateTitle, labelStyles]}>
            {label ? label : ''}
          </Text>
        ) : (
          <Text style={[styles.titleTextStyle, labelStyles]}>
            {label ? label : ''}
          </Text>
        )}
      </View>

      <View
        style={corporateData ? styles.marginLeftCorporate : styles.marginLeft}>
        <FlatList
          data={productList ? productList : []}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ProductCell
              data={item}
              itemKey={index}
              onMoveProduct={onMoveProduct}
              corporateData={corporateData}
            />
          )}
        />
      </View>
    </View>
  );
}

function ProductCell(props) {
  const {data, corporateData, onMoveProduct, itemKey} = props;

  return corporateData ? (
    <View style={[styles.corporateCardContainer]}>
      <View
        style={{
          height: 100,
          width: 150,
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
            data.img ? {uri: data.img} : resources.images.img_placeholer_small
          }
          resizeMode={'cover'}
        />
      </View>
      <View style={[styles.short_Note]}>
        <Text style={styles.titleView}>{data.title}</Text>
        <Text style={styles.sort_Text}>{data.short_note} </Text>
      </View>
    </View>
  ) : (
    <View style={styles.cardCont}>
      <Image
        style={[styles.productImag]}
        source={
          data.image ? {uri: data.image} : resources.images.img_placeholer_small
        }
        resizeMode={'cover'}
      />
      <View style={styles.countView}>
        <Text style={styles.countText}>{itemKey + 1}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Text
          style={[styles.nameTextStyle]}
          // numberOfLines={2}
          ellipsizeMode={'tail'}>
          {data.product_name}
        </Text>
        <TouchableOpacity onPress={() => onMoveProduct(data.id)}>
          <Text style={styles.viewBtn}>View details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProductHorizontalView;
