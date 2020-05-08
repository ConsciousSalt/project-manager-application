import React, {useState} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../../storage/actions/auth';

import {CustomTextField, CustomButton} from '../../../components/UI/CustomStyledUI/customStyledUI';
import FormHelperText from '@material-ui/core/FormHelperText';

import {checkValidity, updateObject} from '../../../shared/utility';
import './AuthData.css';

const emailInitialState = { rules: {required: true, isEmail: true} ,
                                value: "",
                                touched: false};

const passwordInitialState = { rules: {required: true, minLength: 5},
                                value: "",
                                touched: false};                       
const enteringDataStages = {
                                    EMAIL: 'EMAIL',
                                    PASSWORD: 'PASSWORD',
                                    FINISH: 'FINISH'
                                };



const AuthData = (props)=>{
    const [emailInputState          , setEmailInputState]           = useState(emailInitialState);
    const [passwordInputState       , setPasswordInputState]        = useState(passwordInitialState);
    const [nextStepEnable           , setNextStepEnable]            = useState(false);

    const CustomInputChangeHandler = (event) => {

        switch (props.currentStage) {
            case enteringDataStages.EMAIL:
                const newEmailState = updateObject(emailInputState, {value: event.target.value, touched: true});
                setEmailInputState(newEmailState);
                setNextStepEnable(checkValidity(event.target.value, emailInputState.rules));
                break;
            case enteringDataStages.PASSWORD:
                const newPasswordState = updateObject(passwordInputState, {value: event.target.value, touched: true});
                setPasswordInputState(newPasswordState);
                setNextStepEnable(checkValidity(event.target.value, passwordInputState.rules));
                break;
            default:
                break;
        };
    };

    const buttonOnClickHandler = () => {
        switch (props.currentStage) {
            case enteringDataStages.EMAIL:
                props.onFetchingEmail(emailInputState.value);
                break;
            case enteringDataStages.PASSWORD:
                props.onAuth(emailInputState.value, passwordInputState.value, props.isSignUp);
                break;          
            default:
                break;
        }
    };

    const InputElement = () => {
        const inputType = (props.currentStage === enteringDataStages.FINISH ? 'input' : props.currentStage.toLowerCase());
        let inputValue = "";
        if (props.currentStage === enteringDataStages.EMAIL){
            inputValue = emailInputState.value;
        }else if (props.currentStage === enteringDataStages.PASSWORD){
            inputValue = passwordInputState.value;
        }else{
            return (<div><h1>Congratulations</h1></div>);
        };

        return (
            <React.Fragment>
                <CustomTextField
                    variant='standard'
                    autoFocus
                    fullWidth
                    inputProps={{ 'aria-label': 'description' }}
                    aria-describedby="component-error-text"
                    type  = {inputType}
                    name  = {inputType}
                    label = {inputType}
                    error = {props.error}
                    value = {inputValue} 
                    onChange = {CustomInputChangeHandler}/> 
                <CustomButton 
                    variant="text" 
                    disabled={!nextStepEnable}
                    onClick={buttonOnClickHandler}>
                    {props.loading? "Loading..." : "OK" }    
                </CustomButton>   
            </React.Fragment>);
    };

    
    return (
        <div className='AuthData'>
            {InputElement()}
            {props.error ? <FormHelperText id="component-error-text">{props.error.message}</FormHelperText> : null}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isSignUp: state.auth.isSignUp,
        isAuthenticated: state.auth.token !== null,
        authToken: state.auth.token,
        currentStage: state.auth.authStage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchingEmail: (email) => dispatch(actions.fetchAuthForEmail(email)),
        onAuth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthData);