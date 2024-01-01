import React from 'react';
import {View, Text, Image} from 'react-native';
import resources from '../../../res';
import res from '../../../res';
import Button from '../../genriccomponents/button/Button';
import { myWidth, wp } from '../../utility/Utils';
import styles from './styles';

function FrpDetailCard(props) {
  const {data, onPressItem, selectedSliderIndex,itemKey} = props;
  return (
    <View style={[styles.cardView,{marginTop:itemKey == 0 ? 0 : 30}]}>
      <View style={{position:'absolute',top:0,right:0}}>
        <Image source={resources.images.icn_MainBox} style={{width:240,height:200}} />
      </View>
      <View style={styles.centerView}>
        <Text style={styles.labelBold}>{data.product_name}</Text>
        <Text style={styles.labelBold1}>Best suited for a Studio apartment</Text>

        <Text style={styles.itemCount}>{data.item_quantity} products at just</Text>
        <Text style={styles.textPrice}>
          {'\u20B9'}
          <Text style={{fontFamily: res.fonts.bold, fontSize: 20}}>
            {data && data.tenure[selectedSliderIndex].attr_price}
          </Text>
          /- month
        </Text>
      </View>
     

      <View style={styles.centerView}>
        <View style={{height:8}} />
        <Button
          rounded
          disableTouch={data.in_stock ? false : true}
          btnText={data.in_stock ? 'Select Plan' : 'Out of Stock'}
          //btnStyle={[data.in_stock ? styles.btnInStock : styles.btnOutStock,{flexDirection:"row",width:"70%",justifyContent:"space-between"}]}
          textStyleOver={{fontSize: 16,fontFamily:resources.fonts.medium}}
          onPress={() => {
            onPressItem(data, selectedSliderIndex);
          }}
          showRightIcon={true}
          btnStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: wp(myWidth - 70),
            paddingHorizontal: 15,
            backgroundColor: resources.colors.appBlue,
            color: resources.colors.appBlue,
            
          }}
          
        />
      </View>
      <View style={{height:20}} />
    </View>
  );
}

export default FrpDetailCard;
