package com.payubiz;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.payu.custombrowser.bean.CustomBrowserConfig;
import com.payu.custombrowser.bean.ReviewOrderBundle;
import com.payu.india.Model.PayuConfig;
import com.payu.india.Model.PayuHashes;
import com.payu.india.Payu.Payu;
import com.payu.india.Payu.PayuConstants;
import com.payu.paymentparamhelper.PaymentParams;
import com.payu.payuui.Activity.PayUBaseActivity;
import com.payu.payuui.SdkuiUtil.SdkUIConstants;


public class PayUBizSdkModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final ReactApplicationContext reactContext;
    private Promise promise;

    public PayUBizSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        Payu.setInstance(reactContext.getApplicationContext());
    }

    @Override
    public String getName() {
        return "PayUBizSdk";
    }


    @ReactMethod
    public void makePayment(ReadableMap payUHashes, ReadableMap paymentParams, Promise promise) {
        this.promise = promise;
        Intent intent = new Intent(reactContext, PayUBaseActivity.class);
        intent.putExtra(PayuConstants.PAYU_HASHES, parseHashes(payUHashes));
        intent.putExtra(PayuConstants.PAYMENT_PARAMS, parsePaymentParams(paymentParams));
        intent.putExtra(PayuConstants.PAYU_CONFIG, parsePayuConfig(paymentParams));
        intent.putExtra("cb_config", getCbConfig(paymentParams));
        intent.putExtra(SdkUIConstants.VERSION_KEY, BuildConfig.VERSION_NAME);
        intent.putExtra("review_order", getReviewOrderBundle(paymentParams).getReviewOrderDatas());
        reactContext.startActivityForResult(intent, 101, null);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

// Added this check in payu to avoid crash for activity result
        if(requestCode!=101 || data == null){
            return;
        }

        if (resultCode == Activity.RESULT_OK) {
            WritableMap map = new WritableNativeMap();
            map.putString("result", "success");
            map.putString("payu_response", data.getStringExtra("payu_response"));
            map.putString("merchant_response", data.getStringExtra("result"));
            promise.resolve(map);
        } else {
            if (null != data) {
                WritableMap map = new WritableNativeMap();
                map.putString("result", "failure");
                map.putString("payu_response", data.getStringExtra("payu_response"));
                map.putString("merchant_response", data.getStringExtra("result"));
                promise.resolve(map);
            } else {
                promise.reject("101", "Error in transaction");
            }

        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    private PayuConfig parsePayuConfig(ReadableMap map) {
        PayuConfig payuConfig = new PayuConfig();
        payuConfig.setEnvironment(Integer.parseInt(map.getString(PayuConstants.ENV)));
        return payuConfig;
    }

    private PaymentParams parsePaymentParams(ReadableMap readableMap) {
        PaymentParams params = new PaymentParams();
        params.setAmount(readableMap.getString(PayuConstants.AMOUNT));
        params.setTxnId(readableMap.getString(PayuConstants.TXNID));
        params.setKey(readableMap.getString(PayuConstants.KEY));
        params.setProductInfo(readableMap.getString(PayuConstants.PRODUCT_INFO));
        params.setSurl(readableMap.getString(PayuConstants.SURL));
        params.setFurl(readableMap.getString(PayuConstants.FURL));
        params.setHash(readableMap.getString(PayuConstants.HASH));
        params.setUdf1(readableMap.getString(PayuConstants.UDF1));
        params.setUdf2(readableMap.getString(PayuConstants.UDF2));
        params.setUdf3(readableMap.getString(PayuConstants.UDF3));
        params.setUdf4(readableMap.getString(PayuConstants.UDF4));
        params.setUdf5(readableMap.getString(PayuConstants.UDF5));
        params.setEmail(readableMap.getString(PayuConstants.EMAIL));
        params.setPhone(readableMap.getString(PayuConstants.PHONE));
        params.setFirstName(readableMap.getString(PayuConstants.FIRST_NAME));
        params.setUserCredentials(readableMap.getString(PayuConstants.USER_CREDENTIALS));
        params.setLastName(readableMap.getString(PayuConstants.LASTNAME));
        params.setAddress1(readableMap.getString(PayuConstants.ADDRESS1));
        params.setAddress2(readableMap.getString(PayuConstants.ADDRESS2));
        params.setCity(readableMap.getString(PayuConstants.CITY));
        params.setCustomNote(readableMap.getString(PayuConstants.CUSTOM_NOTE));
        if(readableMap.hasKey(PayuConstants.OFFER_KEY))
         params.setOfferKey(readableMap.getString(PayuConstants.OFFER_KEY));
        if(readableMap.hasKey(PayuConstants.ENFORCE_PAYMETHOD))
         params.setEnforcePayMethod(readableMap.getString(PayuConstants.ENFORCE_PAYMETHOD));
        return params;
    }

    private CustomBrowserConfig getCbConfig(ReadableMap map) {
        ReadableMap configMap = map.getMap("cb_config");
        CustomBrowserConfig config = new CustomBrowserConfig(map.getString(PayuConstants.KEY), map.getString(PayuConstants.TXNID));
        config.setDisableBackButtonDialog(configMap.getBoolean("disableBackButtonDialog"));
        config.setEnableReviewOrder(configMap.getInt("enableReviewOrder"));
        if (map.hasKey("review_order_data")) {
            config.setReviewOrderDefaultViewData(getReviewOrderBundle(map));
        }
        Log.v("PayU",config.getReviewOrderDefaultViewData().getReviewOrderDatas().toString());
        config.setEnableSurePay(configMap.getInt("enableSurePay"));
        config.setAutoApprove(configMap.getBoolean("autoApprove"));
        config.setAutoSelectOTP(configMap.getBoolean("autoSelectOTP"));
        config.setMerchantSMSPermission(configMap.getBoolean("merchantSMSPermission"));
        config.setViewPortWideEnable(configMap.getBoolean("viewPortWideEnable"));
        config.setMerchantResponseTimeout(configMap.getInt("merchantResponseTimeout"));
        if (map.hasKey("merchantCheckoutActivityPath"))
         config.setMerchantCheckoutActivityPath(configMap.getString("merchantCheckoutActivityPath"));
        return config;
//        Log.v("PayU",map.getString("cb_config"));
    }

    /**
     * Parse and create ReviewOrder data
     *
     * @param map To be passed by merchant via JS
     * @return ReviewOrderBundle
     */
    private ReviewOrderBundle getReviewOrderBundle(ReadableMap map) {
        ReviewOrderBundle bundle = new ReviewOrderBundle();
        ReadableMap reviewOrderMap = map.getMap("review_order_data");
        ReadableMapKeySetIterator keyIterator = reviewOrderMap.keySetIterator();
        while (keyIterator.hasNextKey()) {
            String key = keyIterator.nextKey();
            String value = reviewOrderMap.getString(key);
            Log.v("PayU ",key+" "+value);
            bundle.addOrderDetails(key, value);
        }
        return bundle;
    }

    private PayuHashes parseHashes(ReadableMap map) {
        PayuHashes payuHashes = new PayuHashes();
        payuHashes.setVasForMobileSdkHash(map.getString(PayuConstants.VAS_FOR_MOBILE_SDK));
        payuHashes.setPaymentHash(map.getString(PayuConstants.PAYMENT_SOURCE));
        payuHashes.setPaymentRelatedDetailsForMobileSdkHash(map.getString(PayuConstants.PAYMENT_RELATED_DETAILS_FOR_MOBILE_SDK));
        payuHashes.setDeleteCardHash(map.getString(PayuConstants.DELETE_USER_CARD));
        payuHashes.setCheckOfferStatusHash(map.getString(PayuConstants.CHECK_OFFER_STATUS));
        return payuHashes;
    }
}
