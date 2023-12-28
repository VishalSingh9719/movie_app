import axios from 'axios';
import * as actionTypes from './authActionTypes';
import { SESSION_DURATION } from '../Setting';
import axiosInstance from '../config/intercepter';

// const SESSION_DURATION = settings.SESSION_DURATION

// ########################################################
// ########################################################
// Contains Auth Action Functions. These perform two kinds of things:
// 1) Return Action Objects
    // a) Simply Return an Action Object
    // b) Perform some action and then return an Action Objet
// 2) Return A Dispatch(Action) combination
    // a)Perform an action then return a Dispatch(Action) combination. 
        // This Dispatch(Action) could be used by some other function to dispatch action to the store      
// ########################################################
// ########################################################


// ########################################################
// ########################################################
// Auth Action Functions returning Action Objects
// ########################################################
// ########################################################

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    console.log("token", token)
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = async() => {
    const token = localStorage.getItem('token');
    if (token === undefined){
        localStorage.removeItem('expirationDate');
    } else {
        // axios.post(`${settings.API_SERVER}/api/auth/logout/`, {
        // }, {headers: {'Authorization': `Token ${token}`}} ).then(res => {console.log(res)}).catch(err => {console.log(err)});
        // localStorage.removeItem('token');
        // localStorage.removeItem('expirationDate');
       // const res = await axiosInstance.post('/api/v1/users/logout')
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
    }

    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

// // ########################################################
// // ########################################################
// // Auth Action Functions returning A Dispatch(Action) combination after performing some action
// // ########################################################
// // ########################################################

export const authLogin = (userData) => async (dispatch) => {
    try {
        dispatch(authStart());
      const response = await axiosInstance.post('/api/v1/users/login/', userData);
      console.log("res+++++", response) // Adjust the endpoint as needed
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: response.data, // Assuming the response contains user data or a token
      });
   /// const token = response.data.key || 'ghfhgfghg';
   // dispatch(authSuccess(token));
    } catch (error) {
        console.log("error", error)
      dispatch({
        type: actionTypes.AUTH_FAIL,
        payload: error.response.data.message, // Adjust the payload as needed
      });
    }
  };
export const authRegister = (userData) => async (dispatch) => {
        try{
        dispatch(authStart());
        const response =  await axios.get(`https://api.themoviedb.org/3/discover/movie/?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100`)
        // const response = await axios.post('http://localhost:8000/api/v1/users/register', {
        //         username:userData.username,
        //         email:userData.email,
        //         password: userData.password
            
        // });
        console.log("response+++", response)
        dispatch(authSuccess(response.data))
        }catch(error){
           dispatch(authFail(error))
        }
    }

export const authCheckState = () => {
    console.log("authCheckState11111111")
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
             dispatch(authLogout());
        } else {
            dispatch(authSuccess(token));
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate && expirationDate <= new Date() ) {
            //      dispatch(authLogout());
            //   //  dispatch(authSuccess(token));
            // } else {
            //     dispatch(authSuccess(token));
            //     dispatch(authCheckTimeout( expirationDate.getTime() - new Date().getTime()) );
            // }
        }
    }
}
