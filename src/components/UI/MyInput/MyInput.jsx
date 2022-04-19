import React, {useState} from 'react';
import './MyInput.css'

const MyInput = ({className, ...props}) => {

    return (
        <input
            className={`input_filter ${className}` }
            {...props}
        />
    );
};

export default MyInput;