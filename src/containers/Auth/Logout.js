import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../storage/actions/auth';
const Logout = (props) => {
    useEffect(() => {
        props.onLoad();
    });

    return (
        <Redirect to="/"/>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {dispatch(actions.logout())}
    }
};

export default connect(null, mapDispatchToProps)(Logout);