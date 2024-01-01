import { StyleSheet } from 'react-native';
import res from '../../../res/index';
import resources from '../../../res/index';
import { isPlatformIOS, widthScale } from '../../utility/Utils';
import fonts from '../../../res/constants/fonts';

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 10,
    // width: '85%',
    fontSize: 15,
    fontWeight: '600',
    color: res.colors.labelColor,
    fontFamily: resources.fonts.regular,
  },
  textInputStyle: {
    flex: 1,
    padding: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingVertical: 0,
    fontSize: widthScale(14),
    color: res.colors.labelColor,
    fontFamily: resources.fonts.regular,
    borderBottomWidth: 1,
    borderColor: res.colors.labelColor,
    top: 0,
  },
  topView: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
  },
  errorText: {
    color: 'red',
    lineHeight: 24,
    fontFamily: res.fonts.regular,
  },
  layoutHorizontal: {
    flexDirection: 'row',
    height: 45,
  },
  borderBottom: {
    // borderWidth: 2,
    borderBottomWidth: 2,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: res.colors.labelColor,
    position: 'absolute',
    right: 10,
  },
  borderBottomThin: {
    // borderWidth: 2,
    // borderBottomWidth: 1,

    alignItems: 'center',
    justifyContent: 'center',
    borderColor: res.colors.labelColor,
    position: 'absolute',
    right: 10,
    bottom: -20
  },
  borderBottomThick: {
    // borderWidth: 2,
    //borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: res.colors.labelColor,
  },
  txtGetOTP: {
    fontFamily: resources.fonts.medium,
    color: resources.colors.txtGetOTP,
    fontSize: 12,
    lineHeight: 16
  },
  verifiedTextStyle: {
    color: resources.colors.green,
  },
  notVerifiedTextStyle: {
    color: resources.colors.red,
  },
  imgDropDown: {
    width: 9,
    height: 8,
    marginRight: 10,
    marginTop: 20,
    // backgroundColor:'red'
  },
  isDropDown: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: res.colors.labelColor,
    //  backgroundColor:'red'
  },
  myInputContainer: {
    width: '100%',
    backgroundColor: resources.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: resources.colors.borderDot,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
     elevation: 2
  },
  InputContainer: {
    width: '100%',
    backgroundColor: resources.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: resources.colors.white,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', elevation: 2
  },
  myInput: {
    flex: 1,
    fontFamily: resources.fonts.regular,
    fontSize: 16,
    fontWeight: '400',
    color: resources.colors.headingBlack,
    padding: 12,
  },
  myInputRightButton: {},
  myInputRightButtonTxt: {
    fontFamily: resources.fonts.medium,
    fontSize: 16,
    fontWeight: '500',
    color: '#C0C0C6',
  },
});

export default styles;
