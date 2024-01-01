import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import res from '../../../res'
import styles from './styles';

const flterCell = (props) => {
    const { filterOption } = props
    return (
        <View style={styles.cell}>
            <TouchableOpacity style={styles.cellItemStyle} onPress={props.onPress} >
                <View style={styles.row}>
                    <View>
                        {
                            props.isSelected ? <Text style={styles.selectedFontStyle}>
                                {props.filterOption}
                            </Text> :
                                <Text style={styles.fontStyle}>
                                    {filterOption}
                                </Text>
                        }
                    </View>
                    <View style={styles.checkbox}>
                        {
                            !props.isSelected ?
                                <Image source={res.images.icn_unSelectedSqure} style={styles.checkboxStyle} resizeMode={'contain'} />
                                :
                                <Image source={res.images.icn_selectedsaqure} style={styles.checkboxStyle} resizeMode={'contain'} />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default flterCell;
