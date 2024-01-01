import AppUser from '../utility/AppUser'
import AppToast from '../genriccomponents/appToast/AppToast'

const PRODUCT_INFO = "Cityfurnish"

class PaymentService {
    env = "0" // "2" for test Payu Payment Mode and "0" for Live Payu payment mode
    amount = null
    txnId = null
    hashKey = null
    address1 = ""
    address2 = ""
    email = ""
    phone = ""
    firstname = ""
    lastname = ""
    selectedCity = ""
    offerKey = ""
    merchantKey = ""
    userId = ""
    userCredentials = null

    constructor(data) {
        this.env = data.env ? data.env : this.env
        this.amount = data.amount
        this.txnId = data.txnId
        this.hashKey = data.hashKey
        this.address1 = data.address1
        this.address2 = data.address2
        this.selectedCity = data.city
        this.offerKey = data.offerKey
        this.merchantKey = data.merchantKey
        this.sUrl = data.surl
        this.fUrl = data.furl
        this.userCredentials = data.userCredentials
        if (data.fullname && data.email) {
            this.setUserEnteredDetails(data.fullname, data.email, data.userCredentials)
        } else {
            this.setUserDetails()
        }

    }


    //  // Environments
    //  String ENV = "env"
    //  String PAYU_CONFIG = "payuConfig"
    // int PRODUCTION_ENV = 0;
    // int MOBILE_STAGING_ENV = 1; // mobiletest.payu.in
    // int STAGING_ENV = 2; // test.payu.in
    // int MOBILE_DEV_ENV = 3; // mobiledev.payu.in
    // int BIZCHECKOUT_TEST_ENV = 4; // bizcheckouttest.payu.in

    getParamsForPayu() {
        if (!this.txnId || !this.hashKey || !this.merchantKey) {
            AppToast("Something went wrong")
            return
        }
        let params = {}
        params.env = this.env // Set Payment Environments
        params.amount = this.amount  //Transaction Amount
        params.key = this.merchantKey  // Key provided by PayU
        params.txnid = this.txnId  // Transaction Id from backend
        params.productinfo = PRODUCT_INFO  // Product Information
        params.surl = this.sUrl  // Success url for Android
        params.furl = this.fUrl // Failure url for Android 
        params.ios_surl = this.sUrl  // Success url for iOS
        params.ios_furl = this.fUrl  // Failure url for iOS
        params.udf1 = ""  // Any user defined fields , we can add more upto udf5
        params.udf2 = ""  // Any user defined fields , we can add more upto udf5
        params.udf3 = ""  // Any user defined fields , we can add more upto udf5
        params.udf4 = ""  // Any user defined fields , we can add more upto udf5
        params.udf5 = ""  // Any user defined fields , we can add more upto udf5
        params.email = this.email // Customer Email
        params.phone = this.phone // Customer Phone number
        params.firstname = this.firstname // Customer First name
        params.lastname = this.lastname // Customer Last name
        params.hash = this.hashKey // Payment Hash
        params.address1 = this.address1 // Customer address 1
        params.address2 = this.address2 // Customer address 2
        params.city = this.selectedCity  //  Customer city
        params.offer_key = this.offerKey // Valid offer key if wish to enable offer
        // params.enforce_paymethod = "" // PG code if wish to enforce particular PG
        params.cb_config = this.getCbConfig()
        params.review_order_data = {} //this.getReviewDataOrderParams()
        params.user_credentials = this.userCredentials ? this.userCredentials : `${this.merchantKey}:${this.userId}`
        params.custom_note = ""

        console.log("Payment params :", JSON.stringify(params))
        return params
    }

    setUserDetails() {
        let appUser = AppUser.getInstance()
        let details = appUser.userDetails
        this.email = details.email ? details.email : ""
        this.phone = details.mobile_number ? details.mobile_number : ""
        this.firstname = details.full_name ? details.full_name : ""
        this.userId = appUser.userId ? appUser.userId : ""
        this.lastname = ""
    }
    setUserEnteredDetails(full_name, email, userCredential) {
        this.firstname = full_name ? full_name : ""
        this.email = email ? email : ""
        this.lastname = ""
        this.phone = ""
        this.userCredentials = userCredential
    }
    getCbConfig() {
        let config = {}
        config.enableReviewOrder = 0 //   'true/false'
        config.enableSurePay = 0   // 0 - 3[For Surepay],
        config.autoSelectOTP = true  //'true/false' [To select OTP flow]
        config.autoApprove = false     //'true/false' [To Auto approve OTP after auto read]
        config.disableBackButtonDialog = true //'true/false'[To Disable back button Dialog]
        config.merchantSMSPermission = true   //'true/false'[To enable SMS permission for Android(OS version >= M)
        config.viewPortWideEnable = true    //'true/false'[View Port setting for Netbanking],
        config.merchantResponseTimeout = 20000   //[In milliseconds to set surl / furl loading timeout]
        return config
    }

    getReviewDataOrderParams() {
        let params = {}
        params.TransactionID = this.txnId
        params.Amount = this.amount
        params.Email = this.email // Customer Email
        params.Phone = this.phone // Customer Phone number
        params.Name = this.firstname // Customer First name
        params.Address = this.address1 // Customer address 1
        params.City = this.selectedCity

        // we can add more keys and values to review data order
        // 'Key Name':'Value1'
        return params
    }

    getAllHashesAsParam(hashes) {
        let param = {}
        param.vas_for_mobile_sdk = hashes.vas_for_mobile_sdk_hash    //vasHash
        param.payment_related_details_for_mobile_sdk = hashes.payment_related_details_for_mobile_sdk_hash   //paymentDetailsHash
        param.payment_source = hashes.payment_source    //paymentHash
        param.delete_user_card = hashes.delete_user_card_hash  //deleteCardHash,
        param.check_offer_status = hashes.check_offer_status_hash  //offerStatusHash

        console.log("Hashes params :", JSON.stringify(param))
        return param
    }
}

export default PaymentService

