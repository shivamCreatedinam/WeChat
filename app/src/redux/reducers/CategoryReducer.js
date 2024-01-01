import {
    SAVE_ALL_CATEGORIES,
    SAVE_SUB_CATEGORY_INDEX, SAVE_PRODUCT_LIST, SAVE_FRP_PRODUCT_LIST
} from '../Type'


const INITIAL_STATE = {
    allCategories: [],
    subCategoryIndex: 0,
    storeProductList: [],
    frpProductDetail: {}
}
export default function CategoryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SAVE_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: (action.payload)
            }
        case SAVE_SUB_CATEGORY_INDEX:
            return {
                ...state,
                subCategoryIndex: (action.payload)
            }
        case SAVE_PRODUCT_LIST:
            return {
                ...state,
                storeProductList: (action.payload)
            }
        case SAVE_FRP_PRODUCT_LIST:
            return {
                ...state,
                frpProductDetail: (action.payload)
            }

        default:
            return state
    }


}