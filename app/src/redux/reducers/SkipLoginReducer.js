import {
    ROUTE_TO_REDIRECT_AFTER_SKIP_SIGNIN, CHANGE_ADDRESS_POSITION, GET_CREDIT_DETAIL,
    GET_DEBIT_DETAIL
} from '../Type'
const INITIAL_STATE = {
    toScreenName: "",
    currentPosition: 0,
    creditDetail: [],
    debitDetail: []
}
export default function SkipLoginReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ROUTE_TO_REDIRECT_AFTER_SKIP_SIGNIN:
            return {
                ...state,
                toScreenName: (action.payload)
            }
        case CHANGE_ADDRESS_POSITION:
            return {
                ...state,
                currentPosition: (action.payload)
            }
        case GET_CREDIT_DETAIL:
            return {
                ...state,
                creditDetail: action.payload
            }
        case GET_DEBIT_DETAIL:
            return {
                ...state,
                debitDetail: action.payload
            }
        default:
            return state
    }
}


