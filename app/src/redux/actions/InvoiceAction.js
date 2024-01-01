import ApiEndpoints, {
    GET_INVOICES_API, INVOICE_PAYMENT_API,
    INVOICE_REDEEM_COINS_API,
    INVOICE_REMOVE_COINS_API,
    CREATE_OUTSTANDING_RAZORPAY_PAYMENT_API, OUTSTANDING_RAZORPAY_PAYMENT_SUCCESS_API
} from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import AppUser from "../../utility/AppUser"
import { POST } from '../../apimanager/RequestMethods'



export const hitInvoiceListingApi = (page, limit) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                page: page,
                limit: limit,
            }
            const Url = ApiEndpoints(GET_INVOICES_API)
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
                label: GET_INVOICES_API,
                data: parameters
            }));



        });
    };

export const hitInvoicePayDueApi = (invoiceID, coinsApplied) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            let parameters = {
                applied_wallet_amount: coinsApplied,
                invoice_id: invoiceID
            }

            const Url = ApiEndpoints(INVOICE_PAYMENT_API)
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
                label: INVOICE_PAYMENT_API,
                data: parameters
            }));
        });
    };

export const hitRemoveInvoiceCoinsApi = (invoiceID) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            let parameters = {
                invoice_id: invoiceID
            }
            const Url = ApiEndpoints(INVOICE_REMOVE_COINS_API)
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
                label: INVOICE_REMOVE_COINS_API,
                data: parameters
            }));
        });
    };

export const hitRedeemInvoiceCoinsApi = (invoiceID, coins) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            let parameters = {
                applied_wallet_amount: coins,
                invoice_id: invoiceID
            }
            const Url = ApiEndpoints(INVOICE_REDEEM_COINS_API)
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
                label: INVOICE_REDEEM_COINS_API,
                data: parameters
            }));
        });
    };


export const hitOutStandingRazorpayPaymentApi = (invoiceID, coinsApplied, totalPayable) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            let parameters = {
                applied_wallet_amount: coinsApplied,
                invoice_id: invoiceID,
                totalpayable: totalPayable
            }

            const Url = ApiEndpoints(INVOICE_PAYMENT_API)
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
                label: INVOICE_PAYMENT_API,
                data: parameters
            }));
        });
    };

export const hitCreateOutStandingRazorpayPaymentApi = (firstName, email, mobileNumber, totalAmount) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                full_name: firstName,
                email: email,
                phone_no: mobileNumber,
                price: totalAmount
            }
            const Url = ApiEndpoints(CREATE_OUTSTANDING_RAZORPAY_PAYMENT_API)
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
                label: CREATE_OUTSTANDING_RAZORPAY_PAYMENT_API,
                data: parameters
            }));


        });
    };

export const hitOutStandingRazorpayPaymentSuccessApi = (razorpayPaymentId,  razorpayOrderID, razorpaySignature, authRazorpayOrderID, amountToBePaid, paymentType) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                transactionID: razorpayPaymentId,
                razpay_orderid: razorpayOrderID,
                amount: amountToBePaid,
                payment_source : paymentType == 'one_time' ? '' : 'sist',
                auth_raz_order_id: authRazorpayOrderID,
                signature: razorpaySignature
            }
            const Url = ApiEndpoints(OUTSTANDING_RAZORPAY_PAYMENT_SUCCESS_API)
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
                label: OUTSTANDING_RAZORPAY_PAYMENT_SUCCESS_API,
                data: parameters
            }));


        });
    };