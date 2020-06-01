import React from 'react';

import Auth from '../Auth/Auth';
import MainMenu from '../../components/MainMenu/MainMenu';

const Main = (props) => {
    console.log('main.js', props);
    return(
        <div>
            {props.isAuthenticated ? null: <Auth/>}
            {props.isAuthenticated ? <MainMenu/> : null}
        </div>
    );
};

export default Main //connect(mapStateToProps)(Main);