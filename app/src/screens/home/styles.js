import {StyleSheet} from 'react-native';
import {
  statusBarHeight,
  isiPhoneX,
  isPlatformIOS,
  widthScale,
  heightScale,
} from '../../utility/Utils';
import resources from '../../../res';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: resources.colors.white,
  },
  InvoiceDue: {
    flex: 1,
    marginHorizontal: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: resources.colors.white,
    height: isiPhoneX ? 120 : 115,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    // borderTopColor: "rgba(10,36,99,0.1)",
    alignItems: 'center',
    height: isiPhoneX ? 120 : 115,
    backgroundColor: resources.colors.white,
  },
  footerStyle: {
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: isiPhoneX ? 24 : 0,
    marginTop: isiPhoneX ? 12 : 0,
  },
  buttonStyle: {
    borderColor: 'rgb(36,132,198)',
    alignSelf: 'stretch',
    // marginRight: 20,
    marginTop: 10,
    height: 38,
    width: 160,
  },
  totalText: {
    fontFamily: resources.fonts.medium,
    fontSize: 18,
    color: resources.colors.black,
  },
  totalValue: {
    color: resources.colors.bluish,
    fontFamily: resources.fonts.medium,
    fontSize: 20,
  },
  seprator: {
    height: 2,
    width: '10%',
    backgroundColor: resources.colors.appColor,
    marginHorizontal: widthScale(10),
    // marginVertical: 5
    // marginTop: 12,
    // position: 'absolute',
    // left: 20,
    // top: 15
  },
  smallBanner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  imageItem: {
    width: '100%',
  },
  imageTopBoxBanner: {
    height: 200,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 2,
  },
  imageBoxBanner: {
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 2,
  },
  corporateCardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 15,
    height: 110,
    width: 270,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: resources.colors.white,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5,
  },
  productImageStyle: {
    flex: 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    margin: 6,
  },
  nameTextStyle: {
    marginTop: 8,
    color: 'rgb(45,109,154)',
    fontFamily: resources.fonts.bold,
    fontSize: 12,
    marginHorizontal: 10,
  },
  descTextStyle: {
    color: 'rgb(28,28,28)',
    // marginTop: 4,
    fontFamily: resources.fonts.regular,
    fontSize: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyContainer: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 12,
    // marginBottom:100,
    // backgroundColor: '#ddedf9',
    // paddingVertical: 10,
    // borderBottomColor: '#ddedf1',
    // borderBottomWidth: 7,
    // borderTopColor: '#ddedf1',
    // borderTopWidth: 7
  },
  safetyText: {
    // fontWeight: resources.fonts.bold,
    fontSize: 18,
    color: resources.colors.timerColor,
    textAlign: 'center',
    color: 'rgb(28,28,28)',
    fontFamily: resources.fonts.regular,
    marginHorizontal: widthScale(10),
    fontWeight: '700',
  },
  safetyDescText: {
    // fontWeight: resources.fonts.bold,
    fontSize: 13,
    textAlign: 'center',
    color: 'rgb(28,28,28)',
    fontFamily: resources.fonts.regular,
    marginHorizontal: widthScale(20),
    fontWeight: '500',
  },
  viewUpperStep: {
    flex: 0.5,
    borderWidth: 0,
    margin: 8,
    // paddingHorizontal: 15,
  },
  viewStep: {
    width: 60,
    height: 60,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 60,
    backgroundColor: resources.colors.white,
    paddingVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  imageStep: {
    width: 30,
    height: 30,
    marginBottom: 8,
    marginTop: 8,
    alignSelf: 'center',
  },
  idStep: {
    color: resources.colors.appColor,
    fontSize: 12,
    fontFamily: resources.fonts.bold,
  },
  textStep: {
    color: resources.colors.charcoalGrey,
    fontSize: isPlatformIOS ? 13 : heightScale(13),
    fontFamily: resources.fonts.bold,
    textAlign: 'center',
    // width: 75,
    marginVertical: 5,
    // marginHorizontal: 5
  },
  benefitsContainer: {
    flex: 1,
    marginVertical: 5,
    paddingHorizontal: 12,
    // marginBottom:100,
    // backgroundColor: '#ddedf9',
    // paddingVertical: 10,
    // borderBottomColor: '#ddedf1',
    // borderBottomWidth: 7,
    // borderTopColor: '#ddedf1',
    // borderTopWidth: 7
  },
  benefitsText: {
    // fontWeight: resources.fonts.bold,
    fontSize: 18,
    color: resources.colors.timerColor,
    textAlign: 'center',
    color: '#3a3a3a',
    fontFamily: resources.fonts.regular,
    marginHorizontal: widthScale(10),
    fontWeight: '700',
  },
  benefitsDescText: {
    // fontWeight: resources.fonts.bold,
    fontSize: 13,
    textAlign: 'center',
    color: 'rgb(28,28,28)',
    fontFamily: resources.fonts.regular,
    marginHorizontal: widthScale(20),
    fontWeight: '500',
  },
  bannerBoxDesign: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginVertical: 30,
    backgroundColor: '#ffffffa3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    width: 240,
  },
  topImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  topRibbonBanner: {
    color: 'white',
    backgroundColor: '#FF9800',
    // borderBottomColor: resources.colors.white,
    // borderBottomWidth: 0.6,
    // borderTopColor: resources.colors.white,
    // borderTopWidth: 0.6
  },
  topRibbonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  ribbonName: {
    fontFamily: resources.fonts.bold,
    fontSize: 15,
    color: resources.colors.white,
    textAlign: 'center',
  },
  profileSection: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: resources.colors.white,
    // height: isPlatformIOS ? 160 : 145,
    paddingHorizontal: 16,
  },
  profileSectionIOS: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: resources.colors.white,
    // height: isiPhoneX ? 160 : 145,
    paddingHorizontal: 16,
  },
  loggedInContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    // borderTopColor: "rgba(10,36,99,0.1)",
    // alignItems: 'center',
    // height: isiPhoneX ? 160 : 145,
    backgroundColor: resources.colors.white,
    justifyContent: 'center',
  },
  profileWithOrder: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: isiPhoneX ? 8 : 0,
    marginTop: isiPhoneX ? 12 : 0,
  },
  profileWithOrderInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: isiPhoneX ? 8 : 6,
    // marginTop: isiPhoneX ? 12 : 0
  },
  rowSection: {
    textAlign: 'left',
    // marginTop: 5
  },
  rowInvoiceSection: {
    textAlign: 'left',
    marginTop: 0,
  },
  profileHiName: {
    fontFamily: resources.fonts.regular,
    fontSize: 15,
    color: resources.colors.textBlack,
  },
  profileName: {
    fontFamily: resources.fonts.bold,
    fontSize: 15,
    color: resources.colors.textBlack,
  },
  profileMobile: {
    textAlign: 'left',
    color: resources.colors.charcoalGrey,
    fontSize: 12,
    marginVertical: 0,
    borderWidth: 0,
  },
  invoicePayment: {
    textAlign: 'left',
    fontFamily: resources.fonts.regular,
    color: resources.colors.charcoalGrey,
    fontSize: 15,
    marginVertical: 0,
    borderWidth: 0,
  },
  buttonOrderStyle: {
    borderColor: 'rgb(36,132,198)',
    alignSelf: 'stretch',
    // marginRight: 20,
    marginTop: 10,
    height: 38,
    width: '100%',
    paddingHorizontal: 20,
    fontSize: 14,
    borderRadius: 4,
  },
  runningServiceRequest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: isiPhoneX ? 12 : 10,
  },
  selectOrderView: {
    // height: 12
    marginTop: -16,
    marginBottom: 4,
    marginHorizontal: 10,
  },
  selectOrderText: {
    fontFamily: resources.fonts.regular,
    fontWeight: '600',
    fontSize: 12,
    color: resources.colors.timerColor,
  },
  btnMain: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    //alignItems: 'center',
    // marginBottom: 16
  },
  iconStyle: {
    height: 16,
    width: 16,
  },
  orderNumberText: {
    fontFamily: resources.fonts.medium,
    fontSize: 12,
    color: resources.colors.charcoalGrey,
    lineHeight: 16,
  },
  orderData: {
    fontFamily: resources.fonts.regular,
    fontSize: 12,
    color: resources.colors.charcoalGrey,
  },
  doneText: {
    fontFamily: resources.fonts.medium,
    fontSize: 12,
    color: resources.colors.grassGreen,
  },
  pendingText: {
    fontFamily: resources.fonts.medium,
    fontSize: 13,
    color: resources.colors.appColor,
  },
  viewMore: {
    textAlign: 'left',
    color: resources.colors.appColor,
    fontSize: 12,
    marginTop: -1,
    marginRight: 6,
  },
  invoiceDue: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginBottom: isiPhoneX ? 24 : 0,
  },
  invoiceDueInner: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: isiPhoneX ? 16 : 12,
  },
  floatingIcon: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  chatBotView: {
    // margin: 30,
    justifyContent: 'flex-end',
    marginLeft: '25%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, //120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // width: '90%',
    // height: 'auto',
    backgroundColor: resources.colors.white,
  },
  chatBotfullScreenModal: {
    // flex: 1,
    // backgroundColor: resources.colors.white,
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    // height: '75%',
  },
  actionOnChat: {
    marginVertical: 12,
    marginBottom: 10,
    // alignContent: 'flex-end',
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
    marginHorizontal: 20,
  },
  chatInfo: {
    fontFamily: resources.fonts.regular,
    fontSize: 13,
    marginBottom: 10,
    // marginHorizontal: 12,
    // marginVertical: 20,
    color: resources.colors.black,
    lineHeight: 15,
    textAlign: 'center',
  },
  buttonChatBotStyle: {
    borderColor: 'rgb(36,132,198)',
    alignSelf: 'stretch',
    // marginRight: 20,
    marginTop: 10,
    height: 38,
    width: 180,
    fontSize: 14,
    borderRadius: 4,
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(10,36,99,0.1)',
    backgroundColor: resources.colors.white,
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  step1: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  step2Container: {},
  chatMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chatBtn: {
    textAlign: 'right',
    color: resources.colors.charcoalGrey,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: resources.colors.charcoalGrey,
  },
  step3Main: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isPlatformIOS ? 20 : 30,
    marginTop: 0,
    // marginBottom: 16
  },
  chatStep3Text: {
    fontFamily: resources.fonts.medium,
    fontSize: 14,
    color: resources.colors.charcoalGrey,
    lineHeight: 18,
    textAlign: 'center',
  },

  // cart Style
  cartInnerBottom: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginBottom: isiPhoneX ? 14 : 10,
    marginLeft: 20,
    marginRight: 0,
    height: 45,
  },
  buttonCartStyle: {
    borderColor: 'rgb(36,132,198)',
    alignSelf: 'stretch',
    // marginRight: 20,
    // marginTop:10,
    height: 45,
    marginRight: 0,
    fontSize: 12,
    borderRadius: 0,
    fontFamily: resources.fonts.regular,
  },
  cartSection: {
    flex: 1,
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: resources.colors.white,
    // height: isiPhoneX ? 160 : 145,
  },
  cartPrice: {
    fontFamily: resources.fonts.bold,
    fontSize: 14,
    color: resources.colors.textBlack,
  },
  cartTotal: {
    textAlign: 'left',
    fontFamily: resources.fonts.regular,
    color: resources.colors.charcoalGrey,
    fontSize: 13,
    marginVertical: 0,
    borderWidth: 0,
  },
  cartHeading: {
    textAlign: 'left',
    fontFamily: resources.fonts.bold,
    color: resources.colors.charcoalGrey,
    fontSize: 14,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 0,
  },
  viewCard: {
    height: 110,
    width: '100%',
    // flex: 1,
    // justifyContent: 'flex-end',
    // marginHorizontal: 20,
    // paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: resources.colors.white,
    // backgroundColor: 'red',
    flexDirection: 'row',
    // shadowColor: "rgba(0,0,0,0.8)",
    // shadowOffset: {
    //     width: 1,
    //     height: 0,
    // },
    // shadowRadius: 4,
    // shadowOpacity: 0.3,
    // elevation: 6,
    // borderWidth: 1,
    marginTop: 0,
  },
  summerText: {
    fontFamily: resources.fonts.regular,
    fontSize: 14,
    fontWeight: '600',
    color: resources.colors.timerColor,
    marginHorizontal: 20,
    marginTop: 10,
  },
  frpImageViewCard: {
    flexDirection: 'row',
  },
  frpViewCard: {
    // height: 150,
    // borderWidth: 1,
    // marginTop: 5,
    width: '100%',
    // flex: 1,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: resources.colors.white,
    // shadowColor: "rgba(0,0,0,0.8)",
    // shadowOffset: {
    //     width: 1,
    //     height: 0,
    // },
    // shadowRadius: 2,
    // shadowOpacity: 0.3,
    // elevation: 6,
  },
  cardContainer: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  imageStyle: {
    // height: 100,
    width: 125,
    height: 110,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    // borderWidth: 1
  },
  frpImageStyle: {
    // height: 150,
    width: 120,
    maxHeight: 110,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    // borderWidth: 2,
    marginTop: 10,
  },
  valuesContainer: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-between',
    // borderWidth: 1,
    marginBottom: 10,
    // marginTop: 2,
  },
  titleName: {
    color: 'rgb(45,109,154)',
    fontSize: 13,
    fontFamily: resources.fonts.bold,
    marginRight: 3,
    // width: "80%"
  },
  applyText: {
    color: 'rgb(28,28,28)',
    fontSize: 18,
    fontFamily: resources.fonts.regular,
    fontWeight: '600',
    marginTop: -10,
  },
  freeServiceText: {
    color: 'rgb(28,28,28)',
    fontSize: 18,
    fontFamily: resources.fonts.regular,
    fontWeight: '600',
    // marginBottom: 10,
    marginTop: 18,
  },
  orderText: {
    color: 'rgb(28,28,28)',
    fontSize: 18,
    fontFamily: resources.fonts.regular,
    fontWeight: '600',
    // marginBottom: 10,
    marginTop: 10,
  },
  subTitleName: {
    fontFamily: resources.fonts.regular,
    fontSize: 12,
    color: '#6a6a6a',
    marginTop: isPlatformIOS ? 3 : 2,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crossStyle: {
    height: 17,
    width: 17,
  },
  detailCard: {
    flex: 1,
    // height: 275,
    width: '100%',
    marginTop: 6,
    backgroundColor: resources.colors.white,
    flexDirection: 'row',
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 6,
  },
  orderValuesText: {
    fontFamily: resources.fonts.regular,
    fontSize: 12,
    color: 'rgb(28,28,28)',
    marginTop: isPlatformIOS ? 12 : 10,
    alignSelf: 'flex-end',
  },
  orderPropText: {
    fontFamily: resources.fonts.regular,
    fontSize: 12,
    color: 'rgb(28,28,28)',
    marginTop: isPlatformIOS ? 12 : 10,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    // height: 40,
    marginBottom: 5,
    // flex:1
  },
  orderCardContainer: {
    // marginHorizontal: 10,
    flex: 1,
  },
  totalTextStyle: {
    fontFamily: resources.fonts.bold,
    fontSize: 12,
    color: 'rgb(28,28,28)',
    marginTop: 10,
  },
  emiTextStyle: {
    fontFamily: resources.fonts.bold,
    fontSize: 12,
    color: resources.colors.appColor,
    marginTop: 4,
    marginHorizontal: 10,
  },
  instructionContainer: {
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconTextContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: 20,
    marginBottom: 20,
  },
  kycTextContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  iconStyle: {
    width: 19,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTruck: {
    width: 15,
    height: 13,
    marginLeft: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    fontFamily: resources.fonts.regular,
    fontSize: 11.5,
    color: 'rgb(28,28,28)',
    marginLeft: 10,
  },
  textInputStyle: {
    flex: 1,
    padding: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingVertical: 0,
    fontSize: 14,
    color: resources.colors.black,
    fontFamily: resources.fonts.regular,
    borderBottomWidth: 1,
    marginRight: 40,
    borderBottomColor: 'rgba(54,69,79,0.5)',
    top: 0,
  },
  buttonStyle: {
    width: 80,
    height: 36,
    borderRadius: 6,
  },
  normalButton: {
    width: 80,
    height: 36,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'dashed',
    borderRadius: 6,
    backgroundColor: resources.colors.white,
    padding: 2,
  },
  normalTextStyle: {
    color: 'black',
    fontSize: 12,
    fontFamily: resources.fonts.regular,
  },
  btnTextStyle: {
    color: resources.colors.white,
    fontSize: 12,
    fontFamily: resources.fonts.regular,
    // borderWidth:1,
    textAlign: 'center',
  },
  grayBackground: {
    backgroundColor: resources.colors.white,
    flex: 1,
  },
  offerTextButtonCon: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
    marginVertical: 3,
  },
  offerTextStyle: {
    marginRight: 15,
    fontSize: isPlatformIOS ? 10 : 11,
    fontFamily: resources.fonts.regular,
    color: 'rgb(28,28,28)',
    lineHeight: 15,
  },
  boldTextStyle: {
    marginRight: 3,
    fontSize: 12,
    fontFamily: resources.fonts.bold,
    color: 'rgb(28,28,28)',
  },
  mediumTextStyle: {
    marginRight: 15,
    fontSize: 12,
    fontFamily: resources.fonts.regular,
    color: 'rgb(28,28,28)',
  },
  seprator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(54,69,79,0.5)',
    marginVertical: 5,
  },
  seprator1: {
    marginTop: 10,
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(54,69,79,0.5)',
  },
  serviceIcon: {
    height: 25,
    width: 25,
  },
  space: {
    width: 70,
  },
  rowTextCon: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  couponCardCon: {
    backgroundColor: resources.colors.white,
    borderRadius: 6,
    marginTop: 8,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 6,
  },
  textInputCon: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 22,
    marginBottom: 12,
  },
  checkotBtnStyle: {
    width: 130,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
    // marginRight: 20,
  },
  chooseDuration: {
    textAlign: 'center',
    fontSize: 18,
    // justifyContent: 'center',
    // alignItems: 'center',
    color: 'rgb(28,28,28)',
    fontFamily: resources.fonts.regular,
    fontWeight: '600',
  },
  footerStyle: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 20,
  },
  cartButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    width: '100%',
    borderTopColor: 'rgba(10,36,99,0.1)',
    alignItems: 'center',
    height: 100,
    backgroundColor: resources.colors.white,
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
    // paddingHorizontal: 20,
  },
  totalStyle: {
    color: 'rgb(45,109,154)',
    fontSize: 20,
    fontFamily: resources.fonts.regular,
    fontWeight: '600',
    textAlign: 'left',
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  appliedText: {
    color: 'green',
    marginLeft: 10,
    fontSize: 12,
    fontFamily: resources.fonts.bold,
  },
  viewMoreText: {
    fontFamily: resources.fonts.bold,
    // fontSize: 12,
    color: resources.colors.bluish,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 5,
  },
  containerLoaderStyle: {
    marginVertical: 20,
    height: 60,
  },
});

export default styles;
