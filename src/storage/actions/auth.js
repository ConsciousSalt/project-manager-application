import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

const apiKey        = 'AIzaSyDhaJaxxgw7UDKuz9wtluAHSDc6Pwm6G3E';
const signUpURL     = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+apiKey;
const logInURL      = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+apiKey;

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime)  => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        const url = isSignUp ? signUpURL : logInURL;
        axios.post(url, authData)
            .then(res=>{
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err=>{
                dispatch(authFail(err.response.data.error))
            });

    }
};



const startFetchingEmail = () => {
    return {type: actionTypes.FETCH_EMAIL_START}
}

const fetchAuthSuccess = (registered) => {
    return {type: actionTypes.FETCH_EMAIL_SUCCESS, registered};
}

const fetchAuthError = (error) => {
    return {type: actionTypes.FETCH_EMAIL_FAIL, error};
}

export const fetchAuthForEmail = (email) => {
    return (dispatch) => {
        dispatch(startFetchingEmail());

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key='+apiKey;
        const data = {identifier: email, continueUri: "http://localhost:3000/auth"};
        axios.post(url, data)
            .then(res=>{
                dispatch(fetchAuthSuccess(res.data.registered))
            }).catch(err=>{
                dispatch(fetchAuthError(err.response.data.error))
            });
    };
};

export const authStepBack = () =>{
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_EMAIL_RE_ENTER});
    };
};