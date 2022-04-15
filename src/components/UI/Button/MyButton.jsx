import React from 'react';
import "./MyButton.css"

const MyButton = ({children, ...props}) => {
    return (
        <button {...props}  className={props.className + " btn"}>
            {children}
        </button>
    );
};

export default MyButton;