import React from 'react';
import back from "../../../icons/arrow.svg";
import "./Heading.css"
const Heading = ({children, ...props}) => {
    return (
        <div className="heading container">
            <div className="back">
                <img src={back} alt="back"/>
                <p>Назад</p>
            </div>
            <h1>{children}</h1>
        </div>
    );
};

export default Heading;