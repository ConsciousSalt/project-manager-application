import {combineReducers} from 'redux';

import * as actions from './actions';
import {updateObject} from '../../../shared/utility';

const {EMAIL} = actions.enteringDataStages;
const defaultInputState = {valid:false, touched:false, value:""};

function currentStage(state=EMAIL, action){
    switch (action.type) {
        case actions.ENTER_DATA_END:
            if (action.error) {return state};

            switch (action.stage) {
                case actions.enteringDataStages.EMAIL:
                    return actions.enteringDataStages.PASSWORD; 
                case actions.enteringDataStages.PASSWORD:
                    return actions.enteringDataStages.FINISH;
                default:
                    return state;
            };
        default:
            return state;
    };
};

function updateTextFieldState(state, action){
    switch (action.type) {
        case actions.ENTERING_DATA:
            return updateObject(
                state, 
                {
                    value: action.data,
                    touched: true
                });
        case actions.ENTER_DATA_END:
            return updateObject(
                state, 
                {
                    valid: !action.error
                });
        default:
            return state;
    } ;
}

function email(state=defaultInputState, action){
    switch (action.stage) {
        case actions.enteringDataStages.EMAIL:
            return updateTextFieldState(state, action);
        default:
            return state;
    };
};

function password(state=defaultInputState, action){
    switch (action.stage) {
        case actions.enteringDataStages.PASSWORD:
            return updateTextFieldState(state, action);
        default:
            return state;
    };
};

function errorMessage(state="", action){
    switch (action.type) {
        case actions.ENTER_DATA_END:
            return action.errorMessage;    
        default:
            return state;
    };
}

function loading (state = false, action){
    switch (action.type) {
        case actions.ENTER_DATA_BEGIN:
            return true
        case actions.ENTER_DATA_END:
            return false
        default:
            return state
    };
};

const authData = combineReducers({
    currentStage,
    email,
    password,
    errorMessage,
    loading
});

export default authData;