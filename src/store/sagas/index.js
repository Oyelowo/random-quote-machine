import {
    all,
    takeEvery,
    takeLatest
} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    fetchQuoteSaga
} from './quoteText';



export function* watchQuoteTest() {
    yield takeEvery(actionTypes.FETCH_QUOTE_SUCCESS, fetchQuoteSaga);
}