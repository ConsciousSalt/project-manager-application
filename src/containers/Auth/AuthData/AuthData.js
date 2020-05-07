import React, {useState} from 'react';

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
const InputInitialValidationState = {error: false, errorMessage: ""};

const enteringDataStages = {
                                    EMAIL: 'EMAIL',
                                    PASSWORD: 'PASSWORD',
                                    FINISH: 'FINISH'
                                };



const AuthData = (props)=>{
    const [emailInputState          , setEmailInputState]           = useState(emailInitialState);
    const [passwordInputState       , setPasswordInputState]        = useState(passwordInitialState);
    const [InputValidationError     , setInputValidationError]      = useState(InputInitialValidationState);
    const [currentStage             , setCurrentStage]              = useState(enteringDataStages.EMAIL);
    const [nextStepEnable           , setNextStepEnable]            = useState(false);
    const [loading                  , setLoadingState]              = useState(false);
   
    const validateEmail = () => {
        setLoadingState(true);
        setTimeout(()=>{
            const test = "somemail@mail.com";
            if (emailInputState.value !== test){
                setInputValidationError(updateObject(InputInitialValidationState, {
                                                        error: true, 
                                                        errorMessage: "Entered incorrect email: check it and try again"
                                                    }));
                setCurrentStage(enteringDataStages.EMAIL);
            }else{
                setInputValidationError(updateObject(InputInitialValidationState, {
                                                        error: false, 
                                                        errorMessage: ""
                                                    }));
                setCurrentStage(enteringDataStages.PASSWORD);
            };
            setLoadingState(false);
        },2000);
    };
   
    const validatePassword = () => {
        setLoadingState(true);
        setTimeout(()=>{
            const test = "qwerty11";
            if (passwordInputState.value !== test){
                setInputValidationError(updateObject(InputInitialValidationState, {
                                                        error: true, 
                                                        errorMessage: "Entered incorrect password: check it and try again"
                                                    }));
                setCurrentStage(enteringDataStages.PASSWORD);
            }else{
                setInputValidationError(updateObject(InputInitialValidationState, {
                                                        error: false, 
                                                        errorMessage: ""
                                                    }));
                setCurrentStage(enteringDataStages.FINISH);
            };
            setLoadingState(false);
        },2000);
    };

    const CustomInputChangeHandler = (event) => {

        switch (currentStage) {
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
        switch (currentStage) {
            case enteringDataStages.EMAIL:
                validateEmail();
                break;
            case enteringDataStages.PASSWORD:
                validatePassword();
                break;
            case enteringDataStages.FINISH:
                console.log("redirected");
                break;            
            default:
                break;
        }
    };

    const InputElement = () => {
        const inputType = (currentStage === enteringDataStages.FINISH ? 'input' : currentStage.toLowerCase());
        let inputValue = "";
        if (currentStage === enteringDataStages.EMAIL){
            inputValue = emailInputState.value;
        }else if (currentStage === enteringDataStages.PASSWORD){
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
                    error = {InputValidationError.error}
                    value = {inputValue} 
                    onChange = {CustomInputChangeHandler}/> 
                <CustomButton 
                    variant="text" 
                    disabled={!nextStepEnable}
                    onClick={buttonOnClickHandler}>
                    {loading? "Loading..." : "OK" }    
                </CustomButton>   
            </React.Fragment>);
    };

    
    return (
        <div className='AuthData'>
            {InputElement()}
            {InputValidationError.error ? <FormHelperText id="component-error-text">{InputValidationError.errorMessage}</FormHelperText> : ''}
        </div>
    );
};

export default AuthData;