import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './MainMenu.css';

const MainMenu = (props) => {
    //const ordersLink    = props.isAuthenticated?<li><Link to='/orders'>Orders</Link></li>:null;
    const ordersLink    = <li><Link to='/orders'>Orders</Link></li>;

    return (
        <div className="MainMenu">
            <ul>
                {ordersLink}
            </ul>
        </div>
    )
};

// const mapStateToProps = (state) => {
//     return {
//         isAuthenticated: state.auth.token !== null
//     };
// };

export default /* connect(mapStateToProps) */(MainMenu);