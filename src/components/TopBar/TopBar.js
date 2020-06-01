import React from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './TopBar.css';

const TopBar = (props) => {
    const homeLink      = props.isAuthenticated?<li><Link to='/'>Home</Link></li>:null;
    const logoutLink    = props.isAuthenticated?<li><Link to='/logout'>Log out</Link></li>:null;
    const orders        = props.isAuthenticated?<li><Link to='/orders'>Orders</Link></li>:null;
    
    return (
        <header className="TopBar">
            <nav >
                <ul>
                    {homeLink}
                    {orders}
                    {logoutLink}
                </ul>
            </nav>
          </header>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(TopBar);