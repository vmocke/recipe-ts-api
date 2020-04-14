import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export interface stateTS {
    token: null | string;
    userId: null | string;
    error: null | any;
    spinner: boolean;
    authRedirectPath: string;
}

const initialState: stateTS = {
    token: null,
    userId: null,
    error: null,
    spinner: false,
    authRedirectPath: '/home',
};

const authStart = (state: stateTS) => {
    return updateObject(state, { error: null, spinner: true });
};

const authSuccess = (state: stateTS, action: { idToken: any; userId: any }) => {
    return updateObject(state, { token: action.idToken, userId: action.userId, error: null, spinner: false });
};

const authFail = (state: stateTS, action: { error: any }) => {
    return updateObject(state, { error: action.error, spinner: false });
};

const authLogout = (state: stateTS) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state: stateTS, action: { path: any }) => {
    return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action: any): stateTS => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;
