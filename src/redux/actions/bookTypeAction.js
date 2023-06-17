import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CREATE_BOOK_TYPE_FAIL,
    CREATE_BOOK_TYPE_REQUEST,
    CREATE_BOOK_TYPE_SUCCESS,
    BOOK_TYPE_LOAD_FAIL,
    BOOK_TYPE_LOAD_REQUEST,
    BOOK_TYPE_LOAD_SUCCESS
} from '../constants/bookTypeConstant';



export const bookTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: BOOK_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get('/api/type/books');
        dispatch({
            type: BOOK_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BOOK_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}



export const createBookTypeAction = (booktype) => async (dispatch) => {
    dispatch({ type: CREATE_BOOK_TYPE_REQUEST })

    try {
        const { data } = await axios.post("/api/type/create", booktype)
        dispatch({
            type: CREATE_BOOK_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Book type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_BOOK_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}