import { combineReducers } from 'redux';
import AppThemeReducer from '../reducers/AppThemeReducer'
import ApiReducer from '../reducers/ApiReducer'
import OtpReducer from '../reducers/OtpReducer'
import CategoryReducer from '../reducers/CategoryReducer'
import SkipLoginReducer from '../reducers/SkipLoginReducer'
import FrpReducer from '../reducers/FrpReducer';
import KycReducer from '../reducers/KycReducer';
import AddressReducer from '../reducers/AddressReducer';
import CartReducer from '../reducers/CartReducer'
import WishlistReducer from '../reducers/WishlistReducer';
import CityNameReducer from './CityNameReducer';

const appReducer = combineReducers({
    appThemeReducer: AppThemeReducer,
    api_reducer: ApiReducer,
    otpReducer: OtpReducer,
    categoryReducer: CategoryReducer,
    skipLoginReducer: SkipLoginReducer,
    frpReducer: FrpReducer,
    kycReducer:KycReducer,
    addressReducer:AddressReducer,
    cartReducer:CartReducer,
    wishlistReducer:WishlistReducer,CityNameReducer
});

let rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;