import React from 'react';
import './MyInput.css'
const MyInput = ({className ,...props}) => {
    return (
        <input className={`input_filter ${className}`} type="text" {...props}/>
    );
};

export default MyInput;