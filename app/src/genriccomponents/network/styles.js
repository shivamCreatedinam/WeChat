import { StyleSheet } from 'react-native';
import resources from '../../../res';
import { heightScale } from '../../utility/Utils';

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: resources.colors.red,
        height: heightScale(30),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
        position: 'absolute',
        bottom: 0,
        zIndex: 50,
    },
    offlineText: {
        color:'#ffffff',
        textAlign: 'center',
    },
});

export default styles;