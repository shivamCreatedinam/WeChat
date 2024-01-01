import React from 'react'
import { View, Text, } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import resources from '../../../../res';
import ImageLoad from '../../../genriccomponents/image/ImageLoad'
import { myWidth } from '../../../utility/Utils';
function ReviewComponent(props) {
    const { onSnapToItem, data, labelStyles, label, reachEnd ,reference} = props;

    return (
        <View style={styles.whiteColor}>

            <Text style={[styles.titleTextStyle, labelStyles]}>{label ? label : ""}</Text>

            <View style={[styles.mainContainer, { paddingVertical: 9 }]}>

                <Carousel
                    // contentContainerCustomStyle={{backgroundColor:'pink'}}
                    // style={{backgroundColor:'blue'}}
                    layout={"default"}
                    ref={reference}
                    data={data}
                    sliderWidth={myWidth}
                    itemWidth={myWidth / 2 - 10}
                    // firstItem={data.length > 3 ? 1 : 0}
                    firstItem={1}
                    // currentScrollPosition={1}
                    renderItem={({ item, index }) =>
                        <RenderItem data={item}
                            itemKey={index}
                        // height={customHeight}
                        />

                    }
                    onEndReachedThreshold={0.1}
                    onEndReached={reachEnd}
                    onSnapToItem={index => onSnapToItem(index)} />
            </View>
        </View>

    );

}

function RenderItem(props) {
    const { data } = props;
    return (
        <View style={[styles.renderContainer]}>
            <ImageLoad
                style={[styles.imageStyle]}
                topLeftBorderRadius={10}
                topRightBorderRadius={10}
                customImagePlaceholderDefaultStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                source={data.image ? { uri: data.image } : resources.images.img_placeholer_small}
                resizeMode="cover" />
            <View style={styles.textContainer}>
                <Text style={styles.descriptionTextStyle} ellipsizeMode={'tail'} numberOfLines={4}>{data.excerpt}</Text>
                <Text style={styles.userNameStyle}>{data.user_name}</Text>
                <Text style={styles.descriptionTextStyle}>{data.cityname}</Text>
            </View>
        </View>

    )
}

export default ReviewComponent