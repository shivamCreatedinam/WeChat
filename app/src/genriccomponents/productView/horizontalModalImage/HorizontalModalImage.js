import React, {useState, useRef} from 'react';
import { View, TouchableOpacity, Dimensions, Text } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './styles';
import resources from '../../../../res';
import ZoomImageLoad from '../../../genriccomponents/image/ZoomImageLoad'
import { myHeight, myWidth } from '../../../utility/Utils';

import VideoPlayer from 'react-native-video-player';

function HorizontalModalImage(props) {
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
                        mediaType={item.mediaType}
                        itemKey={index}
                        onPressBack={onPressBack}
                        frpStyle={frpStyle}
                    />
                }
                onSnapToItem={(index) => onSnapToItem(index)}
            />
            {/* <View style={[frpStyle ? styles.frpDotContainer : styles.dotContainer]}>
                {pagination(props)}
            </View> */}
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
            dotStyle={styles.activeDotStyle}
            inactiveDotStyle={styles.whiteColor}
            inactiveDotColor={resources.colors.white}
            dotColor={"rgb(239,83,78)"}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
            dotContainerStyle={styles.marginHoriDotStyle}
        />
    );
}
function RenderItem(props) {
    const { data, mediaType, frpStyle, itemKey } = props;

    if (mediaType === "image") {
        return (
            <View style={styles.modalImage}>
                <ZoomImageLoad
                    source={data && data.url ? { uri: data.url } : resources.images.img_placeholer_large}
                    style={[frpStyle ? styles.frpImageStyle : styles.imageStyle]}
                    resizeMode={'cover'} />
            </View>
        )
    } else if (mediaType === "video") {
        return (
            <View style={styles.modalVideoImage}>
               <VideoPlayer
                    style={[frpStyle ? styles.frpVideoStyle : styles.videoStyle]}
                    video={data && data.url ? { uri: data.url } : { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
                    videoWidth={myWidth}
                    videoHeight={myHeight}
                    showDuration={true}
                    resizeMode={'contain'}
                    disableControlsAutoHide={true}
                    hideControlsOnStart={true}
                    defaultMuted={false}
                    muted={true}
                    customStyles={{
                        wrapper: {
                            flex: 1,
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            resizeMode:'contain'
                        },
                        video: {
                            flex: 1,
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            resizeMode:'contain'
                        },
                        videoWrapper: {
                            flex: 1,
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            resizeMode:'contain'
                        }
                    }}
                    endThumbnail={data && data.media_url ? { uri: data.media_url } : resources.images.img_placeholer_large}
                    thumbnail={data && data.media_url ? { uri: data.media_url } : resources.images.img_placeholer_large}
                />
            </View>
        )
    } else {
        return null
    }
    // return (
    //     <View style={styles.modalImage}>
    //         <ZoomImageLoad
    //             source={data ? { uri: data } : resources.images.img_placeholer_large}
    //             style={[frpStyle ? styles.frpImageStyle : styles.imageStyle]}
    //             resizeMode={'cover'} />
    //     </View>
    // )

}

export default HorizontalModalImage