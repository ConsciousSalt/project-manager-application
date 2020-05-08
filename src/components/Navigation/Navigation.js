import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const navigation = (props) => {
    const loginLink = props.isAuthenticated?<Link to='/logout'>Log out</Link>:<Link to='/auth'>Log in</Link>;
    const ordersLink = props.isAuthenticated?<li><Link to='/orders'>Orders</Link></li>:null;
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                        {ordersLink}
                    <li>
                        {loginLink}
                    </li>
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

export default connect(mapStateToProps)(navigation);