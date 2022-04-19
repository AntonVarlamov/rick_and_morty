import React from 'react';
import toxicRick from "../../../assetes/png/toxic_rick.png"
import morty from "../../../assetes/png/morty.png"
import rickMechanic from "../../../assetes/png/rick_mechanic.png"
import "./MyModal.css"

const MyModal = ({children, isVisible, setIsVisible}) => {
    return (
        <div className={isVisible ? "modal" : "none"}
             onClick={() => setIsVisible(false)
        }>
            <div className="modal_dialog" onClick={e => e.stopPropagation()}>
                <img src={toxicRick} className="toxic_rick_png modal_png"/>
                <img src={morty} className="morty_png modal_png"/>
                <img src={rickMechanic} className="rick_mechanic_png modal_png"/>
                {children}
            </div>
        </div>
    );
};

export default MyModal;