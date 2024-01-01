import {StyleSheet} from 'react-native';
import {shadow, widthScale} from '../../utility/Utils';
import resources from '../../../res';
const style = StyleSheet.create({
  defaultStyle: {
    // ...shadow(2),
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: resources.colors.appColor,
    borderColor: resources.colors.appColor,
    alignSelf: 'stretch',
  },
  styleTouchableView: {
    height: 48,
    width: '100%',
    alignSelf: 'flex-start',
  },
  roundBorder: {
    borderRadius: 8,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 14,
    // color: '#3a3a3a',
    color: resources.colors.white,
    lineHeight: 24,
    // borderWidth:1,
    // flex:1,
    // height:17,
    fontFamily: resources.fonts.regular,
    // textAlignVertical:'center'
    textAlign: 'left',
    
  },
  solid: {
    backgroundColor: resources.colors.appColor,
    borderColor: resources.colors.appColor,
  },
  uploaded: {
    backgroundColor: resources.colors.uploadedGreen,
    borderColor: resources.colors.uploadedText,
  },
});
export default style;
