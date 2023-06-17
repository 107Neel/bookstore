import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { loadBookReducer, loadBookSingleReducer, registerAbookReducer } from './reducers/bookReducer';
import { createBookTypeReducer, loadBookTypeReducer } from './reducers/bookTypeReducer';
import {
    allUserReducer,
    userApplyBookReducer,
    userReducerLogout,
    userReducerProfile,
    userReducerSignIn,
    userReducerSignUp
} from './reducers/userReducer';
import { modeReducer } from './reducers/themeModeReducer';

//combine reducers
const reducer = combineReducers({
    loadBooks: loadBookReducer,
    bookTypeAll: loadBookTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    singleBook: loadBookSingleReducer,
    userBookApplication: userApplyBookReducer,
    allUsers: allUserReducer,
    signUp: userReducerSignUp,
    mode: modeReducer,
    registerBook: registerAbookReducer,
    createBookType: createBookTypeReducer

});


//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    mode: {
        mode: "light"
    }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;