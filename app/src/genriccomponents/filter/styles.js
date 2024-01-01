import { StyleSheet } from 'react-native';
import { widthScale, heightScale } from '../../utility/Utils';
import resources from '../../../res';
const styles = StyleSheet.create({
    line: {
        backgroundColor: resources.colors.maring
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    cell: {
        padding: widthScale(10),
        fontSize: widthScale(18),
        height: heightScale(53),
        paddingHorizontal: widthScale(20),
        justifyContent: 'center',
        width:'100%'
    },
    checkbox: {
        marginLeft: widthScale(21)
    },
    checkboxStyle: {
        height: heightScale(20),
        width: widthScale(20)
    },
    fontStyle: {
        fontSize: 14,
        fontFamily: resources.fonts.medium,
        color: "#45454A"
    },
    selectedFontStyle: {
        fontSize: 14,
        fontFamily: resources.fonts.medium,
        color: "#45454A"
    },
    cellItemStyle: {
        alignSelf: 'stretch',
        height: heightScale(50),
        justifyContent: 'center'
    }

})
export default styles;