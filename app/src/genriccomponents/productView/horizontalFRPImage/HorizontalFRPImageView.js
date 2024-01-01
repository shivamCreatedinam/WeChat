import React from 'react'
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './styles';
import resources from '../../../../res';
import ImageLoad from '../../image/ImageLoad'
import { myWidth } from '../../../utility/Utils';

function HorizontalFRPImageView(props) {
    const { onSnapToItem, data, onPressBack, frpStyle, reference } = props;
    return (
        <View style={{ alignItems: 'center' }}>
            <Carousel
                ref={reference}
                data={data}
                sliderWidth={myWidth}
                itemWidth={myWidth}
                layout={'default'}
                containerCustomStyle={{ backgroundColor: 'white' }}
                renderItem={({ item, index }) =>
                    <RenderItem
                        data={item}
                        itemKey={index}
                        onPressBack={onPressBack}
                        frpStyle={frpStyle}
                    />
                }
                onSnapToItem={(index) => onSnapToItem(index)}
            />
            <View style={[frpStyle ? styles.frpDotContainer : styles.dotContainer]}>
                {pagination(props)}
            </View>
        </View>
    );
}

function pagination(props) {
    const { data, activeIndexHorizontal } = props;
    return (
        <Pagination
            dotsLength={data.length}
            activeDotIndex={activeIndexHorizontal}
            containerStyle={styles.transparentColor}
            inactiveDotColor={"#C0C0C6"}
      //dotColor={resources.colors.newYellow}
      dotColor={"#71717A"}
            //dotStyle={styles.activeDotStyle}
            //inactiveDotStyle={styles.whiteColor}
            //inactiveDotColor={resources.colors.white}
            //dotColor={"rgb(239,83,78)"}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
            dotContainerStyle={styles.marginHoriDotStyle}
        />
    );
}
function RenderItem(props) {
    const { data, frpStyle } = props;
    return (
        <View>
            <ImageLoad
                source={data ? { uri: data } : resources.images.img_placeholer_large}
                borderRadius={8}
                style={[frpStyle ? styles.frpImageStyle : styles.imageStyle]}
                resizeMode={'cover'} />
        </View >


    )

}

export default HorizontalFRPImageView