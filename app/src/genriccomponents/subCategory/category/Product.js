import {Header, Left, Right, Body, Title} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import resources from '../../../../res';
import {MyStatusBar} from '../../header/HeaderAndStatusBar';
import AsyncStorage from '@react-native-community/async-storage';
import {isPlatformIOS, myWidth} from '../../../utility/Utils';
import Banner from '../../../screens/home/views/Banner';
import AppUser from '../../../utility/AppUser';
import events from '../../../utility/Events';
import {connect} from 'react-redux';
import {CartIconWithBadge} from '../../badge/CartBadge';
import AppToast from '../../appToast/AppToast';
const NORMAL_PRODUCT_TYPE = 0;
const COMBO_PRODUCT_TYPE = 1;
const FRP_PRODUCT_TYPE = 2;
const ProductPage = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [homePageData, setHomePageData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function getHomePageData() {
      const value = await AsyncStorage.getItem('HomePageData');
      if (value !== null) {
        let dataSet = JSON.parse(value);
        setHomePageData(dataSet);
        setIsLoading(false);
      }
    }
    getHomePageData();
  }, []);

  const renderHeader = () => {
    return (
      <>
        <Header
          style={{backgroundColor: 'white', borderBottomWidth: 0, height: 60}}>
          <Body style={{marginLeft: 16, flex: 1}}>
            <Title>
              <Text style={styles.headerTitle}>Products</Text>
            </Title>
          </Body>
          <Right style={{marginRight: 12}}>
            <View style={styles.flexRow}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.push('SearchScreen', {data: homePageData})
                }
                style={{marginRight: 15}}>
                <Image
                  style={styles.headerIcon}
                  source={resources.images.icn_searchPage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: 8}}
                onPress={() => props.navigation.push('CartScreen')}>
                <Image
                  style={styles.headerIcon}
                  source={resources.images.icn_cartPage}
                />
                <View style={{position: 'absolute', top: -10}}>
                  <CartIconWithBadge />
                </View>
              </TouchableOpacity>
            </View>
          </Right>
        </Header>
      </>
    );
  };

  const onPressCategory = (item, index) => {
    if (item.url) {
      Linking.openURL(item.url)
        .then(data => {
          console.log('url open');
        })
        .catch(() => {
          console.log('Error while opening url');
        });
    } else {
      //    id = 27 home furniture
      let val = item.categoryType;
      let type =
        val == NORMAL_PRODUCT_TYPE
          ? NORMAL_PRODUCT_TYPE
          : val == COMBO_PRODUCT_TYPE
          ? COMBO_PRODUCT_TYPE
          : null;
      if (type == null) {
        AppToast('Something went wrong');
        return;
      }

      let event = AppUser.getInstance().emitterInst;
      let data = {
        categoryId: item.id,
        categoryTypeFromHome: type,
        categoryIndex: index,
        seoUrl: item.seourl,
      };

      props.navigation.navigate('CategoryScreen');
      setTimeout(() => {
        event.emit(
          events.GOTO_PARTICULAR_CATEGORY_FROM_HOME,
          JSON.stringify(data),
        );
      }, 400);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isPlatformIOS ? null : (
        <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
      )}

      {renderHeader()}
      {isLoading ? (
        <View style={{marginTop: 20}}>
          <ActivityIndicator color={resources.colors.appColor} />
        </View>
      ) : (
        <View style={{padding: 10}}>
          <FlatList
            data={homePageData.categories}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => onPressCategory(item, index)}
                    style={{padding: 10}}>
                    <Image
                      source={{uri: item.imgUrl}}
                      style={styles.imageThumb}
                    />
                    <Text style={styles.cateName}>{item.cat_name}</Text>
                    {/* <Image  /> */}
                  </TouchableOpacity>
                </View>
              );
            }}
            ListFooterComponent={() => {
              return (
                <>
                  <Banner
                    showSearchBox={false}
                    data={homePageData}
                    navigation={props.navigation}
                    cityMax={false}
                  />
                  <View style={{height: 80}} />
                </>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTitle: {
    color: '#45454A',
    fontSize: 18,
    fontFamily: resources.fonts.regular,
    fontWeight: '500',
    marginLeft: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  imageThumb: {
    width: myWidth / 2.45,
    height: 120,
    borderRadius: 12,
  },
  cateName: {
    marginTop: 8,
    color: '#222222',
    fontFamily: resources.fonts.regular,
    textAlign: 'center',
    fontWeight: '500',
  },
});

const mapStateToProps = state => {
  return {};
};
const container = connect(mapStateToProps)(ProductPage);

export default container;
