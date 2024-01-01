import {
    UPDATE_CART_BADGE_COUNT
} from '../Type'


const INITIAL_STATE = {
    cartBadgeCount: 0,
}
export default function CartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_CART_BADGE_COUNT:
            return {
                ...state,
                cartBadgeCount: (action.payload)
            }
        default:
            return state
    }


}