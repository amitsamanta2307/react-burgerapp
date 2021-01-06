import axios from 'axios';
import { delay, put } from 'redux-saga/effects';

import * as actions from '../actions/auth';

// generators
export function* logoutSaga (action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put (actions.authLogout());
}

export function* checkAuthTimeoutSaga (action) {
    yield delay(action.payload * 1000);
    yield put(actions.logout());
}

export function* authUserSaga (action) {
    yield put(actions.authStart());
    
    const authData = {
        email: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true
    };

    const url = !action.payload.isSignup
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDINiJOEHg4U_VJxZoeRyiNuLNSjeZ_Ibc'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDINiJOEHg4U_VJxZoeRyiNuLNSjeZ_Ibc';
    
    try {
        const response = yield axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch(error) {
        console.log(error);
        yield put(actions.authFail(error.response.data.error));
    }
}