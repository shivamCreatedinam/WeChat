import {StyleSheet} from 'react-native';
import {widthScale, heightScale} from '../../utility/Utils';
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightScale(130),
    width: widthScale(160),
  },

  imageView: {
    width: '50%',
    height: heightScale(100),
    margin: 7,
    borderRadius: 7,
  },
  textChooseCity: {
    // fontFamily:'Nunito-Regular',
    fontSize: 12,
  },

  textView: {
    width: '50%',
    textAlignVertical: 'center',
    padding: 10,
    color: '#000',
  },
  cellStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: widthScale(0),
      height: heightScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cellStyleSelected: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: widthScale(0),
      height: heightScale(4),
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
    elevation: 7,
  },
  chooseCity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightScale(33),
  },
});

export default styles;
