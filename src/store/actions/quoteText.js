import * as actionTypes from './actionTypes';


export const fetchQuoteStart = () => {
    return {
        type: actionTypes.FETCH_QUOTE_START
    }
}

export const fetchQuoteSuccess = (quote) => {
    return {
        type: actionTypes.FETCH_QUOTE_SUCCESS,
        quoteData: quote,
    }
}

export const fetchQuoteFail = (error) => {
    return {
        type: actionTypes.FETCH_QUOTE_FAIL,
        error: error
    }
}