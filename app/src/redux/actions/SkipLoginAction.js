import {
    ROUTE_TO_REDIRECT_AFTER_SKIP_SIGNIN
} from '../Type'



export const updateRouteNameForSkipSignin = (screenName) => {
    return {
        type: ROUTE_TO_REDIRECT_AFTER_SKIP_SIGNIN,
        payload: screenName
    }
}

