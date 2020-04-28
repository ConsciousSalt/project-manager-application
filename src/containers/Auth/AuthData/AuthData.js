import React, {useState} from 'react';

import {styled} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import './AuthData.css';

const emailInitialState = { valid: false,
                            validationErros: ''
                            };

const CustomInput = styled(TextField)({
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(173.72deg, rgba(196, 196, 196, 0.75) 5.83%, rgba(196, 196, 196, 0.589844) 83.56%, rgba(196, 196, 196, 0) 122.42%)',
    width: '80%'
});

const CustomButton = styled(Button)({
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(173.72deg, rgba(196, 196, 196, 0.75) 5.83%, rgba(196, 196, 196, 0.589844) 83.56%, rgba(196, 196, 196, 0) 122.42%)',
    height: '100%',
    borderRadius: '0',
    padding: '3%'  
});


const AuthData = (props)=>{
    const [emailInputState, setEmailInputState] = useState(emailInitialState);
    const [emailValidationError, setEmailValidationError] = useState({error: false, errorText:''});
    const [passwordValidationError, setPasswordValidationError] = useState({error: false, errorText:''});
    const [currentStep, setCurrentStep] = useState('email');

    const validateField = (fieldName, value) =>{
        switch (fieldName) {
            case ('email'):
                console.log(value);
                const fieldIsValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
                const validationErros = fieldIsValid ? '': 'not valid email'; 
                const updatedState = {
                    valid: fieldIsValid,
                    validationErros: validationErros                    
                };
                setEmailInputState(updatedState);    
                break;
            case ('password'):
                fieldIsValid = false;
                break;
            default:
                break;    
        };
    };

    const CustomInputChangeHandler = (event) => {
        validateField(event.target.name, event.target.value);
    };
   
    const InputElement = () => {
        let input = null;
        switch (currentStep){
            case 'email': 
                input = (<CustomInput
                            variant='standard'
                            name = 'email'
                            label="email"
                            autoFocus
                            fullWidth
                            disableUnderline
                            type = "email"
                            inputProps={{ 'aria-label': 'description' }}
                            error = {emailValidationError.error} 
                            onChange = {CustomInputChangeHandler}
                            aria-describedby="component-error-text"/>);
                break;
            case 'password':
                input =  (<CustomInput
                            variant='standard'
                            name = 'password'
                            label="password"
                            autoFocus
                            fullWidth
                            disableUnderline
                            type = "password"
                            inputProps={{ 'aria-label': 'description' }}
                            error = {passwordValidationError.error} 
                            onChange = {CustomInputChangeHandler}
                            aria-describedby="component-error-text"/>);
                break;
            default:
                break;
        };

        

    };

    
    return (
        <div className='AuthData'>
            {emailValidationError.error ? 
                <FormHelperText id="component-error-text">{emailValidationError.errorText}</FormHelperText>
                : ''}
            
            <CustomButton variant="text">OK</CustomButton>
        </div>
    );
};

export default AuthData;