import React from "react"
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView } from "react-native"
import styles from './styles'
import resources from "../../../res";
import NetInfo from '@react-native-community/netinfo'
import { myWidth } from "../../utility/Utils";

function checkInternetAndCall(data, props) {
    const { onPressItem } = props;
    NetInfo.fetch().then(state => {
        if (!state.isConnected) {
            return
        } else {
            onPressItem(data)
        }
    });
}

  {/* <View style={{position:'absolute'}}>
                        <Text>{data.name}</Text>   
                        </View> */}

function FrpProductHolder(props) {
    const { data,onRemoveItem,index } = props;
    
    return (
        <TouchableOpacity
            // activeOpacity={0.7}
             style={[styles.viewProductHolder,{marginLeft:index == 0 ? 0 : 10}]} 
             onPress={() => { checkInternetAndCall(data,props) }}
            >
            {data.selectedImgUrl ?
                <>
                    <Image 
                        style={{width:myWidth / 2.5,height:140,borderTopLeftRadius:10,borderTopRightRadius:10}}
                        source={{ uri: data.selectedImgUrl }}
                        resizeMode={"cover"}
                    />
                    <View style={{padding:6,justifyContent:'center',alignItems:'center',flex:1}}>
                        <Text style={{color:"#45454A",fontFamily:resources.fonts.medium}}>{data.product_name}</Text>
                    </View>
                    <TouchableOpacity style={{alignSelf:'flex-end',width:20,height:20,alignItems:'center',justifyContent:'center',position:'absolute'}} onPress={()=>{onRemoveItem(data)}}>
                        <Image style={{ width: 20, height: 20,marginRight:10,marginTop:10,  }} source={resources.images.inc_small_cross} />
                    </TouchableOpacity>

                {/* <ImageBackground style={styles.imgCover}
                    //resizeMode="stretch"
                    resizeMode='cover'
                    imageStyle={{ borderRadius: 6 }}
                    source={{ uri: data.selectedImgUrl }}>
                    <TouchableOpacity style={{alignSelf:'flex-end',width:20,height:20,alignItems:'center',justifyContent:'center'}} onPress={()=>{onRemoveItem(data)}}>
                        <Image style={{ width: 20, height: 20,marginRight:10,marginTop:10,  }}
                            source={resources.images.inc_small_cross} />

                      
                        

                    </TouchableOpacity>

                </ImageBackground> */}
                </>
                
                :
                <View style={styles.viewHolder}>
                    <Image style={{ width: 25, height: 25 }}
                        source={data.icon ? { uri: data.icon } : resources.images.img_placeholer_small} />
                    <Text style={styles.textProduct}
                        ellipsizeMode='tail' numberOfLines={1}>
                        {data.name}
                    </Text>

                </View>}
        </TouchableOpacity>
        
    )
}

export default FrpProductHolder;