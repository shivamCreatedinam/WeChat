import {
    SAVE_KYC_DOCUMENT_DETAIL
} from '../Type'

const INITIAL_STATE = {
    kycDocumentsDetailObj: null,
}
export default function KycReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SAVE_KYC_DOCUMENT_DETAIL:
            return {
                ...state,
            kycDocumentsDetailObj: (action.payload)
            }
        default:
            return state
    }
}


