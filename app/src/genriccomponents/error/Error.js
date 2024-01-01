import React from 'react'
import { Text,View } from 'react-native'
import styles from './styles'

const Error = props => {
    const { style = {}, errorText  } = props;
    return (
        errorText ? (
            <View>
               <Text style={styles.errorMsg}>{errorText}</Text> 
            </View>
        ) : <View style={styles.defaultErrorView} />
    )
}

export default Error 