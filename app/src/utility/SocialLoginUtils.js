import React from 'react'
import { View } from 'react-native'
//import LinkedInModal from 'react-native-linkedin'
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'

const LINKEDIN_CLIENT_ID = "81zwloadixp2cm"
const LINKEDIN_CLIENT_SECRET = "ZQ6pvyaLivE9eY2g"
const LINKEDIN_REDIRECT_LINK = "https://cityfurnish.com/site/user/linkedin"

export const { FACEBOOK_LOGIN } = "facebook"
export const { LINKEDIN_LOGIN } = "linkedin"
export const { GOOGLE_LOGIN } = "google"

const LOGIN_TYPE = {
    FACEBOOK: 'facebook',
    LINKEDIN: 'linkedin',
    GOOGLE: 'google',
    APPLE: 'apple'
}

import { FACEBOOK_USER_API } from './../apimanager/ApiEndpoint'
import { GET } from '../apimanager/RequestMethods'



/**
 * Configure LinkedinLogin and return UI window.
 */
// function InitLinkedinLogin(props) {
//     const { onSuccess, refer } = props
//     return (
//         <View>
//             <LinkedInModal
//                 ref={refer}
//                 animationType={'slide'}
//                 clientID={LINKEDIN_CLIENT_ID}
//                 clientSecret={LINKEDIN_CLIENT_SECRET}
//                 redirectUri={LINKEDIN_REDIRECT_LINK}
//                 onSuccess={(token) => onSuccess(token)}
//                 onError={error => onSuccess(error)}
//                 renderButton={() => { }}
//             />
//         </View>
//     )

// }

/**
 * Configure GoogleSignin With default props.
 */
async function configureGoogleSignin() {
    try {
        GoogleSignin.configure()
    } catch (error) {
        console.log(`Error while configuring Google Signin`);
    }
}

/**
 * Initialize Google signin process.
 * @return {string} The google signin token.
 */
async function initializeGoogleLogin(callback) {
    try {
        await signOut();
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();
        const accessToken = await GoogleSignin.getTokens();
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log("currentUser => ", JSON.stringify(currentUser))
        callback(currentUser, accessToken)
    } catch (error) {
        console.log(`Login fail with error: ${JSON.stringify(error)}`);
    }
}


/*
* Gmail signout
*/
async function signOut() {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    } catch (error) {
        console.log(error);
    }
}


// public_profile 
// email
/**
 * Initialize Facebook signin process.
 * @return {string} The Facebook signin token.
 */
async function initializeFacebookLogin(callback) {
    LoginManager.logOut();
    LoginManager.logInWithPermissions(['email']).then(
        result => {
            if (result.isCancelled) {
                console.log(`User cancel the fb login`);
            } else {
                AccessToken.getCurrentAccessToken().then(accessToken => {
                    callback(accessToken);
                    // getFacebookUserData(accessToken, callback)
                });
            }
        },
        error => {
            console.log(`Login fail with error: ${JSON.stringify(error)}`);
        },
    );
}

async function getFacebookUserData(token, callback) {
    if (!token) {
        return
    }
    let url = `${FACEBOOK_USER_API}${token.accessToken}`
    fetch(url, { method: GET })
        .then(response => response.json())
        .then(data => {
            console.log("FACEBOOK USER  SUCCESS =>", data)
            callback(data);

        }).catch((error) => {
            console.log("FACEBOOK USER  FAILURE =>", error)
            callback(error);
        });
}

export {
    configureGoogleSignin, initializeGoogleLogin, initializeFacebookLogin, LOGIN_TYPE
}

