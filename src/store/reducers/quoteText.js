import * as actionTypes from '../actions/actionTypes';
import {
    updateObject
} from '../../shared/utility';


const initialState = {
    quoteData: '',
    loading: false
}

const fetchQuoteStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchQuoteSuccess = (state, action) => {
    return updateObject(state, {
        quoteData: action.quoteData,
        loading: false
    })
}

const fetchQuoteFail = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_QUOTE_START:
            return fetchQuoteStart(state, action);
        case actionTypes.FETCH_QUOTE_SUCCESS:
            return fetchQuoteSuccess(state, action);
        case actionTypes.FETCH_QUOTE_FAIL:
            return fetchQuoteFail(state, action)
        default:
            return state
    }
}

export default reducer;