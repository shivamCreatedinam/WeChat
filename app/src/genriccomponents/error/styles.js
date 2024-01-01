import { StyleSheet } from 'react-native';
import {widthScale,heightScale} from '../../utility/Utils';
import resources from '../../../res';
const styles = StyleSheet.create({
    errorMsg: {
        marginHorizontal: widthScale(16),
        alignSelf: 'stretch',
        textAlign: 'right',
        fontSize: widthScale(14),
        color: resources.colors.black,
      },
      defaultErrorView: {
        height: heightScale(16.5),
      },
})
export default styles;