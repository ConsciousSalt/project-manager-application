import React from 'react';

import './Layout.css';

const layout = (props) => {
    return (
        <div className="Layout">
            {props.children}
        </div>
    );
};

export default layout;