import { StyleSheet } from 'react-native';
import { widthScale, heightScale, myWidth } from '../../../utility/Utils';
import resources from '../../../../res';
const styles = StyleSheet.create({

    titleTextStyle: {
        fontSize: 18,
        color: "rgb(28,28,28)",
        fontFamily: resources.fonts.regular,
        fontWeight: "700",
        marginHorizontal: widthScale(20),
        // marginVertical: 10,
        textAlign: 'left',
    },
    corporateTitle: {
        fontSize: 18,
        color: "rgb(28,28,28)",
        fontFamily: resources.fonts.regular,
        fontWeight: "600",
        // marginHorizontal: widthScale(20),
        marginVertical: 10
    },
    titleText: {
        fontSize: 18,
        color: resources.colors.timerColor,
        fontFamily: resources.fonts.medium,
        marginHorizontal: 20,
        marginVertical: 10
    },
    viewTextStyle: {
        fontFamily: resources.fonts.regular,
        fontSize: widthScale(12),
        letterSpacing: 0.06,
        marginRight: widthScale(3),
        color: "rgb(61,59,90)"
    },
    forwardIconStyle: {
        width: 24,
        height: 24,
        marginRight: 20,
    },
    mainContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: resources.colors.white,
        marginBottom: heightScale(8),
        // marginTop: heightScale(10)
    },
    arrowContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: heightScale(10),
        marginHorizontal: 10,
    },
    nameTextStyle: {
        marginTop: 8,
        color: "rgb(45,109,154)",
        fontFamily: resources.fonts.bold,
        fontSize: 12,
        marginHorizontal: 10,
    },
    priceTextStyle: {
        color: "rgb(28,28,28)",
        // marginTop: 4,
        fontFamily: resources.fonts.bold,
        fontSize: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceCrossTextStyle: {
        color: "rgb(151,151,151)",
        marginTop: 8,
        fontSize: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    productImageStyle: {
        flex: 1,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    productImag: {
        height: 130,
        width: 150,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    corporateImag: {
        height: 100,
        width: 150,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    cardCont: {
        alignItems: 'flex-start',
        // borderRadius: 15,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 180,
        width: 150,
        marginBottom: 10,
        marginLeft: 15,
        marginTop: 2,
        backgroundColor: resources.colors.white,
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 5,
    },
    cardContainer: {
        alignItems: 'flex-start',
        borderRadius: widthScale(15),
        height: heightScale(195),
        width: widthScale(150),
        marginBottom: heightScale(10),
        marginLeft: widthScale(15),
        backgroundColor: resources.colors.white,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
            width: heightScale(2),
            height: heightScale(2),
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        elevation: 5,
    },
    rowDirection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
        flex: 1

    }, marginLeftCorporate: {
        marginLeft: -10
    },
    marginLeft: {
        // marginHorizontal: 5
        paddingRight: 10,
        marginLeft: 10,
        marginTop: 10
    },
    sort_Text: {
        fontFamily: resources.fonts.regular,
        fontSize: 10,
        color: resources.colors.timerColor,
        textAlign: 'left',
        lineHeight: 15

    },
    short_Note: {

        marginHorizontal: 10,
        // flex: 1
    }, titleView: {
        marginTop: 7,
        color: resources.colors.txtGetOTP,
        fontFamily: resources.fonts.medium,
        fontSize: 12,
    },
    corporateCardContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 15,
        height: 90,
        width: 275,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: resources.colors.white,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        elevation: 5,

    }, 
    corporateVerticalCardContainer: {
        alignItems: 'flex-start',
        borderRadius: 8,
        height: 115,
        width: 120,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: resources.colors.white,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 1,
        shadowOpacity: 1,
        elevation: 1,

    },corporateTitleTextStyle: {
        fontSize: 18,
        color: resources.colors.timerColor,
        fontFamily: resources.fonts.medium,
        // marginHorizontal: 20,
        marginVertical: 10
    },
    seprator: {
        height: 2,
        width: "10%",
        backgroundColor: resources.colors.appColor,
        // marginVertical: 5
        // marginTop: 12,
        // position: 'absolute',
        // left: (myWidth / 2) - 60,
        top: 0,
        marginHorizontal: 22
        // marginBottom: 10
    },
});

export default styles;
