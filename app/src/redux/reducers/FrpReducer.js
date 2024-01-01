import {
    SAVE_FRP_PRODUCT_DETAIL
} from '../Type'

const INITIAL_STATE = {
    FrpProductDetailObj: null,
}
export default function FrpReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SAVE_FRP_PRODUCT_DETAIL:
            return {
                ...state,
                FrpProductDetailObj: (action.payload)
            }
        default:
            return state
    }
}


