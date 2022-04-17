import React from 'react';
import back from "../../../assetes/icons/arrow.svg";
import "./Heading.css"

const Heading = ({children, ...props}) => {
    const goBack = () => {
        window.history.back()
    }
    return (
        <section className="heading container">
            <div onClick={() => goBack()} className="back">
                <img src={back} alt="back"/>
                <p>Назад</p>
            </div>
            <h1>{children}</h1>
        </section>
    );
};

export default Heading;