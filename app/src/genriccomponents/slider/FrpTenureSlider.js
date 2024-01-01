import React from "react"
import { View, Text, StyleSheet } from "react-native"
import res from '../../../res'
import SnapSlider from './SnapSlider'
import { isPlatformIOS } from '../../utility/Utils'

const marks = [
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 18, label: '18' },
    { value: 24, label: '24' },
];


function FrpTenureSlider(props) {
    const { serverData, onSliderCallback, defaultItem } = props;
    // console.log(defaultItem,  " defaultItem")
    let localDefaultItem = 0;
    let lastIndex = serverData.length - 1;
    if (defaultItem > lastIndex) {
        localDefaultItem = lastIndex;
    }else{
        localDefaultItem = defaultItem;
    }

    // console.log( "SLIDER ANJALI localDefaultItem",localDefaultItem, )


    const data = getFormatedArray(serverData)
    return (
        serverData.length > 0 ?
            <View>
                <Text style={{ fontFamily: res.fonts.bold, color: res.colors.labelColor, fontSize: 16, marginTop: 20 }}>
                    Choose your duration (in Months)
            </Text>
                <SnapSlider
                    items={data}
                    labelPosition="bottom"
                    defaultItem={localDefaultItem}
                    maximumTrackTintColor={res.colors.lightGreyTxt}
                    minimumTrackTintColor={res.colors.appColor}
                    thumbImage={res.images.img_slider_thumb}
                    thumbTintColor={!isPlatformIOS ? res.colors.appColor : ""}
                    // currentPosition={defaultItem ? defaultItem : serverData.length - 1}
                    currentPosition={localDefaultItem}
                    onSlidingComplete={(value) => { onSliderCallback(value) }} />
            </View>
            :
            renderEmptyListView()
    )
}
function renderEmptyListView() {
    return (
        <View style={{ height: 20 }}>

        </View>
    )
}
function getFormatedArray(serverData) {
    let arr = []
    for (let index = 0; index < serverData.length; index++) {
        const element = serverData[index];
        arr.push({
            value: index,
            label: getMonthOnly(element.attr_name)
        })
    }
    return arr
}

function getMonthOnly(string) {
    return string.substr(0, string.indexOf(' '));

}
const styles = StyleSheet.create({
    sliderDot: {
        width: 18,
        height: 18,
        backgroundColor: res.colors.white,
        borderWidth: 5,
        borderColor: res.colors.appColor
    }
})
export default FrpTenureSlider