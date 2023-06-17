import {
    BOOK_LOAD_FAIL,
    BOOK_LOAD_REQUEST,
    BOOK_LOAD_RESET,
    BOOK_LOAD_SINGLE_FAIL,
    BOOK_LOAD_SINGLE_REQUEST,
    BOOK_LOAD_SINGLE_RESET,
    BOOK_LOAD_SINGLE_SUCCESS,
    BOOK_LOAD_SUCCESS,
    REGISTER_BOOK_FAIL,
    REGISTER_BOOK_REQUEST,
    REGISTER_BOOK_RESET,
    REGISTER_BOOK_SUCCESS
} from "../constants/bookconstant"


export const loadBookReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case BOOK_LOAD_REQUEST:
            return { loading: true }
        case BOOK_LOAD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                setUniqueLocation: action.payload.setUniqueLocation,
                books: action.payload.books
            }
        case BOOK_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case BOOK_LOAD_RESET:
            return {}
        default:
            return state;
    }
}


export const loadBookSingleReducer = (state = { book: {} }, action) => {
    switch (action.type) {
        case BOOK_LOAD_SINGLE_REQUEST:
            return { loading: true }
        case BOOK_LOAD_SINGLE_SUCCESS:
            return {

                loading: false,
                success: action.payload.success,
                singleBook: action.payload.book,

            }
        case BOOK_LOAD_SINGLE_FAIL:
            return { loading: false, error: action.payload }
        case BOOK_LOAD_SINGLE_RESET:
            return {}
        default:
            return state;
    }

}


export const registerAbookReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_BOOK_REQUEST:
            return { loading: true }
        case REGISTER_BOOK_SUCCESS:
            return {
                loading: false,
                book: action.payload,
            }
        case REGISTER_BOOK_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_BOOK_RESET:
            return {}
        default:
            return state;
    }

}