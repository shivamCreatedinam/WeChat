import {
    VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE
} from '../Type'
// initial state for verifyOtp 
const INITIAL_STATE = {
    verifyOtpResponse: {},
}
export default function OtpReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                verifyOtpResponse: (action.payload)
            }
        case VERIFY_OTP_FAILURE:
            return {
                ...state,
                verifyOtpResponse: (action.payload)
            }
        default:
            return state
    }


}


