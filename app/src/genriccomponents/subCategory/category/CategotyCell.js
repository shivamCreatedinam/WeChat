import React, {useEffect, useRef} from 'react';
import {Text, Image, View, FlatList, TouchableOpacity} from 'react-native';
import resources from '../../../../res';
import events from '../../../utility/Events';
import AppUser from '../../../utility/AppUser';
//import DefaultTabBar from './DefaultTabBar';

const CategotyCell = props => {
  const {
    selectedIndex,
    listDataItem,
    initialPageIndex,
  } = props;
  const flatListRef = useRef();

  useEffect(() => {
    let obj = AppUser.getInstance().emitterInst;
    obj.on(events.GOTO_PARTICULAR_CATEGORY_FROM_HOME, tab => {
      if (tab) {
        let dataValue = JSON.parse(tab);
        selectedIndex(dataValue.categoryIndex, '');
      }
    });
  }, []);

  useEffect(() => {
    if (initialPageIndex) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: initialPageIndex,
        // viewPosition: 0.5,
      });
    }
  }, [initialPageIndex]);

  return (
    <>
      <FlatList
        data={listDataItem}
        extraData={listDataItem}
        horizontal={true}
        ref={flatListRef}
        initialScrollIndex={initialPageIndex}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => selectedIndex(index, initialPageIndex)}
              style={{
                borderBottomWidth: initialPageIndex == index ? 2 : 0,
                padding: 12,
              }}
              key={index}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {item.cat_name == 'Bedroom' || item.cat_name =='Bed Room' ? (
                  <Image
                    source={resources.images.icn_bedroom}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                ) : item.cat_name == 'Living Room' ? (
                  <Image
                    source={resources.images.icn_bedroom1}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                ) : item.cat_name == 'Dining Room' ? (
                  <Image
                    source={resources.images.icn_bedroom2}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                ) : item.cat_name == 'Study Room' ? (
                  <Image
                    source={resources.images.icn_bedroom3}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                ) : item.cat_name == 'Appliances' ? (
                  <Image
                    source={resources.images.icn_bedroom4}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                ) : item.cat_name == 'Office Furniture' ? (
                  <Image
                    source={resources.images.icn_bedroom5}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                ) : item.cat_name == 'All' ? (
                  <Image
                    source={resources.images.icn_category}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                ) : item.cat_name == 'Value Combos' ? (
                  <Image
                    source={resources.images.c1}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                ) : (
                  <Image
                    source={resources.images.icn_bedroom5}
                    tintColor={
                      initialPageIndex == index ? '#222222' : '#71717A'
                    }
                    style={{width: 25, height: 25}}
                  />
                )}
              </View>

              <Text
                style={{
                  fontSize: 12,
                  color: initialPageIndex == index ? '#222222' : '#71717A',
                  textAlign: 'center',
                  fontWeight: '400',
                  fontFamily: resources.fonts.regular,
                }}>
                {item.cat_name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default CategotyCell;
