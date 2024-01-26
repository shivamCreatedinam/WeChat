import { StyleSheet } from 'react-native';
import { widthScale, heightScale } from '../../utility/Utils';
import resources from '../../../res';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: 200, height: 200, alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appNameStyle: {
    marginLeft: widthScale(32.6),
    letterSpacing: 8,
    color: resources.colors.black,
    fontSize: widthScale(48.9),
  },


});

export default styles;
