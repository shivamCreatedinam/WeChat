import {
 CHANGE_ADDRESS_POSITION,
 SET_ADDRESS_LIST
} from '../Type'
const INITIAL_STATE = {
    currentTabPosition: 0,
    addressList: []
}
export default function AddressReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_ADDRESS_POSITION:{
            return {
                ...state,
                currentTabPosition: (action.payload)
            }
        }
        case SET_ADDRESS_LIST: {
            return {
                ...state,
                addressList: action.payload
            }
        }
        default:
            return state
    }
}


