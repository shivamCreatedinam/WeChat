import Toast from 'react-native-simple-toast'

// const TIME = 3 // 3 seconds

function AppToast(label, TIME = 3) {
  if(typeof label =='string'){
    Toast.show(label);
  }
}

export default AppToast