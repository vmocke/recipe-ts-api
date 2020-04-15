import { put, delay } from 'redux-saga/effects';
import * as actionsAuth from '../actions/actionsAuth';
import axios from 'axios';

export function* logoutSaga() {
    /* if do testing generators better this way
    yield call([localStorage, "removeItem"], "token")
    */
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actionsAuth.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action: any) {
    yield delay(action.expirationTime * 1000);
    yield put(actionsAuth.logout());
}

export function* authSaga(action: { email_: string; password_: string; isSignup_: boolean }) {
    const API_KEY = 'AIzaSyAgAaO9K2YKYX-hSFMMdiCxQTvj7EMs130';
    const authData = {
        email: action.email_,
        password: action.password_,
        returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    if (!action.isSignup_) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate: any = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actionsAuth.authSuccess(response.data.idToken, response.data.localId));
        yield put(actionsAuth.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actionsAuth.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actionsAuth.logout());
    } else {
        const expirationDate_: any = yield localStorage.getItem('expirationDate');
        const expirationDate: any = yield new Date(expirationDate_);
        if (expirationDate <= new Date()) {
            yield put(actionsAuth.logout());
        } else {
            const userId: any = yield localStorage.getItem('userId');
            yield put(actionsAuth.authSuccess(token, userId));
            yield put(actionsAuth.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
