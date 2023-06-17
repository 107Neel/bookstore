import axios from 'axios';
import { toast } from 'react-toastify'
import {
    BOOK_LOAD_FAIL,
    BOOK_LOAD_REQUEST,
    BOOK_LOAD_SINGLE_FAIL,
    BOOK_LOAD_SINGLE_REQUEST,
    BOOK_LOAD_SINGLE_SUCCESS,
    BOOK_LOAD_SUCCESS,
    REGISTER_BOOK_FAIL,
    REGISTER_BOOK_REQUEST,
    REGISTER_BOOK_SUCCESS
} from "../constants/bookconstant"


export const bookLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: BOOK_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/books/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: BOOK_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BOOK_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


export const bookLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: BOOK_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/book/${id}`);
        dispatch({
            type: BOOK_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BOOK_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}

export const registerAbookAction = (book) => async (dispatch) => {
    dispatch({ type: REGISTER_BOOK_REQUEST })

    try {
        const { data } = await axios.post("/api/book/create", book)
        dispatch({
            type: REGISTER_BOOK_SUCCESS,
            payload: data
        })
        toast.success("Book created successfully");


    } catch (error) {
        dispatch({
            type: REGISTER_BOOK_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}