import React from 'react';

import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import AuthData from './AuthData/AuthData';


import './Auth.css';

const Auth = (props) => {

    const redirect = props.isAuthenticated?<Redirect to="/"/>:null;

    return (
        <div className="Auth">
            {redirect}
            <div className="AuthTitle">
                <p>Project manager application</p>
            </div>
            <div className="AuthInput">
                <AuthData/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null   
    }
}

export default connect(mapStateToProps)(Auth);