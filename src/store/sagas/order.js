import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions/order';

export function* purchaseBurgerSaga (action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post(
            `/orders.json?auth=${action.payload.token}`,
            action.payload.orderData
        );

        yield put(actions.purchaseBurgerSuccess(
            response.data.name,
            action.payload.orderData)
        );
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrderSaga (action) {
    yield put(actions.fetchOrdersStart());

    try {
        const response = yield axios.get('/orders.json', { 
            params: { 
                auth: action.payload.token,
                orderBy: '"userId"',
                equalTo: '"' + action.payload.userId + '"'
            }}
        );

        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }

        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}