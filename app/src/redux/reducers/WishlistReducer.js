import {
    UPDATE_WISHLIST_BADGE_COUNT
} from '../Type'


const INITIAL_STATE = {
    wishlistBadgeCount: 0,
}
export default function WishlistReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_WISHLIST_BADGE_COUNT:
            return {
                ...state,
                wishlistBadgeCount: (action.payload)
            }
        default:
            return state
    }


}