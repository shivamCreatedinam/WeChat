import { StyleSheet } from 'react-native';
import { widthScale, heightScale } from '../../../utility/Utils';
import resources from '../../../../res';
const styles = StyleSheet.create({
  fullScreen: {
    height:heightScale(34),
    width:'100%',
    // backgroundColor:'blue'
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },categotySelect:{
      width:widthScale(100),
      height:heightScale(34)
  },selectedText: {
    
    fontFamily:resources.fonts.regular,
    fontSize:12,
    color:resources.colors.bluish
  },
  textCategory: {
      fontFamily:resources.fonts.regular,
      fontSize:12,
      color:resources.colors.blueGrey
  },bar : {
      height:heightScale(2),
      backgroundColor:'#2d6d9a'
  },tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingLeft: 65,
    paddingRight: 65,
    // justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: 'red',
    borderRadius: 3,
    width: 15,
  },
})
export default styles;