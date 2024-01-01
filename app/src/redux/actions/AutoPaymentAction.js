import ApiEndpoints, {
    GET_ALL_ORDER_API, GET_ALL_SCHEDULED_ORDER_API,
    EAZY_PAYMENT_API_EMANDATE_RECURRING, EAZY_PAYMENT_API_UPI_RECURRING, EAZY_PAYMENT_API_RECURRING,
    EAZY_PAYMENT_SUCCESS_API, EAZY_PAYMENT_NACH_SUCCESS_API
} from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST, GET } from '../../apimanager/RequestMethods'
import AppUser from "../../utility/AppUser"


export const hitAllOrderApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId

            const Url = ApiEndpoints(GET_ALL_ORDER_API)

            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid
                },
                onSuccess: async (data) => {

                    resolve((data));
                },
                onFailure: (error) => {

                    reject(error)
                },
                label: GET_ALL_ORDER_API,

            }));
        });
    };


    
export const hitAutoPaymentRazorpayApi = (orderId, paymentType) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                dealCodeNumber: orderId
            }

            let Url = "";
            let label = ""
            if(paymentType == 'emandate') {
                Url = ApiEndpoints(EAZY_PAYMENT_API_EMANDATE_RECURRING);
                label = EAZY_PAYMENT_API_EMANDATE_RECURRING;
            } else if(paymentType == 'upi') {
                Url = ApiEndpoints(EAZY_PAYMENT_API_UPI_RECURRING);
                label = EAZY_PAYMENT_API_UPI_RECURRING;
            } else {
                Url = ApiEndpoints(EAZY_PAYMENT_API_RECURRING);
                label = EAZY_PAYMENT_API_RECURRING;
            }
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: label,
                data: parameters
            }));


        });
    };

export const hitAutoPaymentRazorpaySuccessApi = (razorpayPaymentId, razorpayOrderID, razorpaySignature, authRazorpayOrderID, customerId, paymentType) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                transactionID: razorpayPaymentId,
                razpay_orderid: razorpayOrderID,
                customer_id: customerId,
                mode : paymentType,
                signature: razorpaySignature,
                server_orderid: authRazorpayOrderID
            }
            const Url = ApiEndpoints(EAZY_PAYMENT_SUCCESS_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: EAZY_PAYMENT_SUCCESS_API,
                data: parameters
            }));


        });
    };

export const hitAutoPaymentNACHRazorpayApi = (orderID, accountNumber, ifscCode, beneficiaryName) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                dealCodeNumber: orderID,
                account_number: accountNumber,
                ifsc_code: ifscCode,
                beneficiary_name : beneficiaryName
            }
            const Url = ApiEndpoints(EAZY_PAYMENT_NACH_SUCCESS_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: EAZY_PAYMENT_NACH_SUCCESS_API,
                data: parameters
            }));


        });
    };

export const getScheduledOrder = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                user_id: Userid
            }
            const Url = ApiEndpoints(GET_ALL_SCHEDULED_ORDER_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: GET_ALL_SCHEDULED_ORDER_API,
                data: parameters
            }));


        });
    };