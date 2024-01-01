import React from 'react'
import { View, Text, Image, TouchableOpacity, } from 'react-native'
import res from '../../../res'
import styles from './SortFilterCellStyle';

const SortFilterCell = (props) => {
    return (
        <View style={styles.cell}>
            <TouchableOpacity onPress={props.onPress} >
                <View style={styles.row}>
                    <View>
                        <Text style={props.isSelected ? styles.fontStyleSelected : styles.fontStyle} >
                            {props.filterOption}
                        </Text>
                    </View>
                    <View style={styles.chechbox}>
                        {
                            !props.isSelected ?
                                <Image source={res.images.icn_roundCheck} />
                                :
                                <Image source={res.images.icn_roundchecked} />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default SortFilterCell;
