import React, {useState} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../../storage/actions/auth';
import * as actionTypes from '../../../storage/actions/actionTypes';

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

const AuthData = (props)=>{
    const [emailInputState          , setEmailInputState]           = useState(emailInitialState);
    const [passwordInputState       , setPasswordInputState]        = useState(passwordInitialState);
    const [nextStepEnable           , setNextStepEnable]            = useState(false);

    const CustomInputChangeHandler = (event) => {

        switch (props.currentStage) {
            case actionTypes.authStages.EMAIL:
                const newEmailState = updateObject(emailInputState, {value: event.target.value, touched: true});
                setEmailInputState(newEmailState);
                setNextStepEnable(checkValidity(event.target.value, emailInputState.rules));
                break;
            case actionTypes.authStages.PASSWORD:
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
            case actionTypes.authStages.EMAIL:
                props.onFetchingEmail(emailInputState.value);
                break;
            case actionTypes.authStages.PASSWORD:
                props.onAuth(emailInputState.value, passwordInputState.value, props.isSignUp);
                break;          
            default:
                break;
        }
    };

    const stepBackHandler = (event) => {
        console.log(event);
        props.onAuthStepBack();
        setPasswordInputState(passwordInitialState);
        setNextStepEnable(checkValidity(emailInputState.value, emailInputState.rules));
    }

    const InputElement = () => {
        const inputType = (props.currentStage === actionTypes.authStages.FINISH ? 'input' : props.currentStage.toLowerCase());
        let inputValue = "";
        if (props.currentStage === actionTypes.authStages.EMAIL){
            inputValue = emailInputState.value;
        }else if (props.currentStage === actionTypes.authStages.PASSWORD){
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

    const HelperText = () => {
        if (props.error){
            return (<FormHelperText error id="component-error-text">{props.error.message}</FormHelperText>);
        };

        let HelperMessage = '';
        if (props.isSignUp){
            switch (props.currentStage) {
                case actionTypes.authStages.EMAIL:
                    HelperMessage = 'such email not found. If you press "OK" - you will create new account';
                    break;
                case actionTypes.authStages.PASSWORD:
                    // eslint-disable-next-line
                    HelperMessage = <p>Creating new account. Enter password for your account or <a href="#" onClick={stepBackHandler}>go back and check your email</a></p>;
                    break;          
                default:
                    break;
            };
            return (<FormHelperText id="component-error-text">{HelperMessage}</FormHelperText>);
        }

    }
    
    return (
        <div className='AuthData'>
            {InputElement()}
            {HelperText()}
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
        onAuthStepBack: () => dispatch(actions.authStepBack()),
        onAuth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthData);