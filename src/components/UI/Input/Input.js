import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];

    switch (props.elementType){
        case ('input'):
            inputElement = <input
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}/>            
            break;
        default:
            inputElement = <input
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}/>
    }

    return (
        <div className={props.valid ? 'Valid':  'Invalid'}>
            {inputElement}
        </div>
    );
};

export default input;