import { StyleSheet } from 'react-native';
import { widthScale, heightScale, myWidth, isIphone11orAbove } from '../../../utility/Utils';
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
        height: isIphone11orAbove() ? heightScale(170) : heightScale(200)
    },
    frpImageStyle: {
        
        width: myWidth - 30,
        height: isIphone11orAbove() ? heightScale(170) : heightScale(200)
    },
    photo:{

    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
      },
      image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
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
        marginTop: isIphone11orAbove() ? heightScale(125) : heightScale(140)
    },
    marginHoriDotStyle: {
        marginHorizontal: widthScale(4)
    },
    frpDotContainer: {
        position: 'absolute',
        marginTop: isIphone11orAbove() ? heightScale(125) : heightScale(140)
    },


});

export default styles;
