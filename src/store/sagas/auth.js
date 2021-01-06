import { put } from 'redux-saga/effects';

import * as actions from '../actions/auth';

// generators
export function* logoutSaga (action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put (actions.authLogout());
}