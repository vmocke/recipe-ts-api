import * as actionTypes from './actionTypes';

export const authSuccess = (idToken_: string, localId_: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken_,
        userId: localId_,
    };
};

export const checkAuthTimeout = (expirationTime: number) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT_SAGA,
        expirationTime: expirationTime,
    };
};

export const authFail = (error_: string) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error_,
    };
};

export const auth = (email_: string, password_: string, isSignup_: boolean) => {
    return {
        type: actionTypes.AUTH_SAGA,
        email_: email_,
        password_: password_,
        isSignup_: isSignup_,
    };
};
/////////////////////////////////////
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE_SAGA,
    };
};
/////////////////////////////////////
export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_SUCCEED,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_SAGA,
    };
};
/////////////////////////////////////
export const setAuthRedirectPath = (path_: string) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path_,
    };
};
