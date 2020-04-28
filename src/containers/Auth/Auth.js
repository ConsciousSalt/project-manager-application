import React from 'react';

import AuthData from './AuthData/AuthData';
import './Auth.css';

const Auth = (props) => {

    return (
        <div className="Auth">
            <div className="AuthTitle">
                <p>Project manager application</p>
            </div>
            <div className="AuthInput">
                <AuthData/>
            </div>
        </div>
    );
};

export default Auth;