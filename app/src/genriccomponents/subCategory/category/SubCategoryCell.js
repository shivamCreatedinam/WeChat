import React from 'react'
import { Text,View } from 'react-native'
import resources from '../../../../res'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

const SubCategoryCell = (props) => {
    const { tabBarActiveTextColor, tabBarInactiveTextColor,
        tabBarUnderlineStyle, listDataItem, isImageVisible, selectedIndexSub,
        subCategoryRef } = props
    const returnView = listDataItem.map((item, index) => {

        return <Text
            // key={item.id}
            tabLabel={item.cat_name}
            imgUrl={item.image}
            //imgUrl={"https://picsum.photos/seed/picsum/200/300"}
            //imgUrl = {resources.images.icn_bedroom}
            isImageVisible={isImageVisible}
            key={index.toString()}>
        </Text>
    })
    return (
        <ScrollableTabView
            style={{ backgroundColor: resources.colors.white }}
            ref={subCategoryRef}
            tabBarUnderlineStyle={tabBarUnderlineStyle}
            tabBarTextStyle={{ fontFamily: resources.fonts.regular, fontSize: 15 }}
            tabBarInactiveTextColor={tabBarInactiveTextColor}
            tabBarActiveTextColor={tabBarActiveTextColor}
            contentProps={{ height: 50 }}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
            onChangeTab={val => selectedIndexSub(val.i)}
        >
            {returnView}
        </ScrollableTabView>
    );
};



export default SubCategoryCell;