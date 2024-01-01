import { StyleSheet } from 'react-native';
import { widthScale, heightScale, myWidth } from '../../../utility/Utils';
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
        height: heightScale(300)
    },
    frpImageStyle: {
        width: myWidth - 50,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: heightScale(300),
        borderRadius: 10
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
        //marginTop: heightScale(120)
        bottom: -10
    },


});

export default styles;
