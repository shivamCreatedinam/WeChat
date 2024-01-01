import { StyleSheet } from 'react-native';
import { widthScale, heightScale, myWidth, myHeight } from '../../../utility/Utils';
import resources from '../../../../res';
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    renderContainer: {
        // borderRadius: 10,
        // height: heightScale(140),
        // backgroundColor: resources.colors.white,
        // alignItems: 'center'
    },
    imageStyle: {
        width: myWidth,
        height: heightScale(240),
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    frpImageStyle: {
        width: myWidth,
        height: heightScale(278),
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    modalImage: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    frpVideoStyle: {
        flex: 1,
        width: myWidth,
        height: myHeight,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        resizeMode:'contain'
    },
    videoStyle: {
        flex: 1,
        width: myWidth,
        height: myHeight,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    modalVideoImage: {
        marginHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        resizeMode:'contain'
        // marginVertical: 100
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionTextStyle: {
        fontSize: widthScale(10),
        textAlign: 'center',
        color: "rgb(28,28,28)",
        marginTop: heightScale(6),
        marginHorizontal: widthScale(10)
    },
    userNameStyle: {
        fontSize: widthScale(12),
        textAlign: 'center',
        color: "rgb(45,109,154)",
        marginTop: heightScale(14)
    },
    activeDotStyle: {
        width: widthScale(8),
        height: heightScale(8),
        borderRadius: 5,
        zIndex: 9999

    },
    transparentColor: {
        backgroundColor: 'transparent',
    },
    whiteColor: {
        backgroundColor: resources.colors.white
    },
    dotContainer: {
        position: 'absolute',
        marginTop: heightScale(180)
    },
    marginHoriDotStyle: {
        marginHorizontal: widthScale(4)
    },
    frpDotContainer: {
        position: 'absolute',
        marginTop: heightScale(210)
    },
    toolbar: {
      marginTop: 30,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    mediaPlayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'black',
      justifyContent: 'center',
    },


});

export default styles;
