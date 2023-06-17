import {
    CREATE_BOOK_TYPE_FAIL,
    CREATE_BOOK_TYPE_REQUEST,
    CREATE_BOOK_TYPE_RESET,
    CREATE_BOOK_TYPE_SUCCESS,
    BOOK_TYPE_LOAD_FAIL,
    BOOK_TYPE_LOAD_REQUEST,
    BOOK_TYPE_LOAD_RESET,
    BOOK_TYPE_LOAD_SUCCESS
} from "../constants/bookTypeConstant"


export const loadBookTypeReducer = (state = { bookType: [] }, action) => {
    switch (action.type) {
        case BOOK_TYPE_LOAD_REQUEST:
            return { loading: true }
        case BOOK_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                bookType: action.payload.bookT
            }
        case BOOK_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case BOOK_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}


export const createBookTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BOOK_TYPE_REQUEST:
            return { loading: true }
        case CREATE_BOOK_TYPE_SUCCESS:
            return {
                loading: false,
                bookType: action.payload,
            }
        case CREATE_BOOK_TYPE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_BOOK_TYPE_RESET:
            return {}
        default:
            return state;
    }

}