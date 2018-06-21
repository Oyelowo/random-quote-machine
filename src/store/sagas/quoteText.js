import {
    put
} from "redux-saga/effects";
import * as actions from '../actions/index';
import axios from 'axios';

// export function* purchaseBurgerSaga(action) {
//     yield put(actions.purchaseBurgerStart());
//     try {
//         const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
//         yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
//     } catch (error) {
//         yield put(actions.purchaseBurgerFail(error));
//     };
// }


export function* fetchQuoteSaga() {
    yield put(actions.fetchQuoteStart());
    try {
        const response = yield axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
        yield put(actions.fetchQuoteSuccess(response.data))

    } catch (error) {
        yield put(actions.fetchQuoteFail(error));
    }
}