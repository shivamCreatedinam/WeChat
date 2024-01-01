import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import Modal from "react-native-modal";
import resources from '../../../res';
import { myHeight, myWidth } from '../../utility/Utils';
import Button from '../../genriccomponents/button/Button'
import Store from '../../redux/store/Store'

const API_VERIFY = "VERIFY_CRIF_ANSWER_API";

function CreditQuestionsView(props) {
    const { visibleModal, onPressBackDrop } = props
    return (
        <Modal
            avoidKeyboard
            animationOutTiming={0}
            onBackdropPress={() => onPressBackDrop()}
            isVisible={visibleModal === 'bottom'}
            style={styles.bottomModal}
        >
            {renderPickTypes(props)}

        </Modal>
    )
}

function renderPickTypes(props) {
    const { data, onSubmitCrifAnswer } = props
    return (

        <View style={{
            minHeight: myHeight / 2,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: 20,
        }}>
            <Text style={{
                fontFamily: resources.fonts.regular,
                fontSize: 19,
                marginBottom: 10,
            }}>{data.data.question} </Text>

            {
                renderOptions(props)
            }

            {
                renderProgress()
            }

            <Button
                touchOpacityStyle={{ marginVertical: 20, height: 40, width: myWidth - 40 }}
                rounded
                btnText={resources.strings.SUBMIT}
                onPress={onSubmitCrifAnswer} />
        </View>

    )
}
function renderProgress() {
    let state = Store.getState()
    const { apiLables, apiModel } = state.api_reducer
    if (apiLables[0] == API_VERIFY && apiModel.API_IS_LOADING) {
        return (
            <ActivityIndicator style={{ position: 'absolute', top: myHeight / 4 }}
                size="large" color={resources.colors.appColor} />
        )
    } else {
        return null
    }
}
function renderOptions(props) {
    const { data, onClickAnswer } = props
    let views = []

    data.optionsListNew.forEach(element => {
        views.push(
            <TouchableOpacity
                style={{ borderWidth: 0, width: '90%', marginVertical: 10 }}
                onPress={() => onClickAnswer(element)}>
                {element.isSelected ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={resources.images.icn_selectedsaqure}
                            style={{ width: 20, height: 20, paddingVertical: 2, marginRight: 15 }}
                        />
                        <Text style={{
                            fontFamily: resources.fonts.regular,
                            fontSize: 17
                        }}>{element.ans} </Text>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={resources.images.icn_unSelectedSqure}
                            style={{ width: 20, height: 20, paddingVertical: 2, marginRight: 15 }} />
                        <Text style={{
                            fontFamily: resources.fonts.regular,
                            fontSize: 17
                        }}>{element.ans} </Text>
                    </View>}
            </TouchableOpacity>
        )
    });
    return views
}

export { CreditQuestionsView };

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    featureLabel: {
        fontFamily: 'Gill Sans',
        fontSize: 15,
        height: 25,
        marginHorizontal: 10,
        marginTop: 4,
        color: resources.colors.black,
        fontWeight: '500',
    },
    categoryLabel: {
        fontFamily: 'Gill Sans',
        fontSize: 15,
        alignSelf: 'center',
        color: resources.colors.black,
        fontWeight: '500',
    },
})