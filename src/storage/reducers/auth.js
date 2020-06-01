import * as actionsTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    isSignUp: false,
    authStage: actionsTypes.authStages.EMAIL
};

const authStart = (state, action) => {
    return updateObject(state, { error:null, loading:true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading:false,
        authStage: actionsTypes.authStages.FINISH
    }); 
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading:false
    }); 
};

const authLogout = (state, action) => {
    return updateObject(state, {token: null,userId: null, isSignUp: false, authStage: actionsTypes.authStages.EMAIL});
}

const fetchEmailStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const fetchEmailSuccess = (state, action) => {
    return updateObject(state, {
        isSignUp:   !action.registered, 
        loading:    false, 
        authStage:  actionsTypes.authStages.PASSWORD
    });   
}

const fetchEmailFail = (state, action) => {
    return updateObject(state, {
        error:      action.error, 
        loading:    false});   
}

const fetchEmailReEnter = (state) => {
    return updateObject(state, {authStage: actionsTypes.authStages.EMAIL, isSignUp: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.FETCH_EMAIL_START: return fetchEmailStart(state, action);
        case actionsTypes.FETCH_EMAIL_SUCCESS: return fetchEmailSuccess(state, action);
        case actionsTypes.FETCH_EMAIL_FAIL: return fetchEmailFail(state, action);
        case actionsTypes.FETCH_EMAIL_RE_ENTER: return fetchEmailReEnter(state);
        case actionsTypes.AUTH_START: return authStart(state, action);
        case actionsTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionsTypes.AUTH_FAIL: return authFail(state, action);
        case actionsTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default reducer;