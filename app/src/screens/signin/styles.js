import {StyleSheet, Platform} from 'react-native';
import {widthScale, heightScale} from '../../utility/Utils';
import resources from '../../../res';
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: resources.colors.white,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 1,
    color: '#222222',
  },

  underlineStyleHighLighted: {
    borderColor: '#222222',
  },

  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailText: {
    color: '#45454A',
    fontSize: 14,
    fontFamily: resources.fonts.regular,
  },
  appNameStyle: {
    marginLeft: widthScale(32.6),
    letterSpacing: 8,
    color: resources.colors.black,
    fontSize: widthScale(48.9),
  },
  inputStyle: {
    // marginTop: 7,
    //  paddingBottom: 7,
  },
  layoutHorizontal: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSignInViaStyle: {
    alignSelf: 'center',
    marginVertical: heightScale(20),
    fontFamily: resources.fonts.bold,
    color: resources.colors.labelColor,
  },
  textForgotPass: {
    alignSelf: 'flex-end',
    color: resources.colors.txtGetOTP,
    fontFamily: resources.fonts.regular,
    fontWeight: '600',
    fontSize: 16,
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  dontHaveAccount: {
    fontFamily: resources.fonts.regular,
    fontSize: widthScale(12),
    color: resources.colors.labelColor,
  },
  txtSignin: {
    fontFamily: resources.fonts.bold,
    fontSize: widthScale(14),
    marginHorizontal: 5,
    alignSelf: 'center',
    color: resources.colors.labelColor,
  },
  backgroundImage: {
    flex: 1,
  },
  titleText: {
    color: '#45454A',
    fontSize: 24,
    fontFamily: resources.fonts.regular,
  },
  subTitleText: {
    color: '#9A9AA2',
    fontFamily: resources.fonts.regular,
    fontSize: 14,
  },
  subTitleText1: {
    color: '#71717A',
    fontFamily: resources.fonts.regular,
    fontSize: 16,
    lineHeight:20
  },
  skipText: {
    fontFamily: resources.fonts.regular,

    fontSize: 20,
    color: resources.colors.blueText,
  },
  skipBtn: {
    marginRight: 21,
    marginTop: 10,
  },
  textAppVersion: {
    alignSelf: 'center',
    color: resources.colors.labelColor,
    fontFamily: resources.fonts.regular,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;
