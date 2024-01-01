import {StyleSheet} from 'react-native';
import {
  widthScale,
  myHeight,
  myWidth,
  isPlatformIOS,
} from '../../../utility/Utils';
import resources from '../../../../res';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  renderContainer: {
    flex: 1,
    borderRadius: 10,
    height: !isPlatformIOS ? myHeight / 3 : myHeight / 3.5,
    width: myWidth / 2 - 10,
    backgroundColor: resources.colors.white,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 3,
    marginVertical: 3,
  },
  imageStyle: {
    flex: 0.5,
    width: myWidth / 2 - 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  descriptionTextStyle: {
    fontSize: 10,
    textAlign: 'center',
    color: 'rgb(28,28,28)',
    marginHorizontal: 10,
    lineHeight: 15,
  },
  userNameStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgb(45,109,154)',
    marginTop: 4,
  },
  titleTextStyle: {
    fontSize: 18,
    color: '#3a3a3a',
    fontFamily: resources.fonts.regular,
    marginHorizontal: widthScale(20),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
  },
  whiteColor: {
    backgroundColor: resources.colors.white,
  },
});

export default styles;
