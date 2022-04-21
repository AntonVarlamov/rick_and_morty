import React from 'react';
import MyInput from "../MyInput/MyInput";
import {debounce} from "../../../utils/debounce";
import down from "../../../assetes/icons/down.svg"
import alive from "../../../assetes/icons/alive.svg";
import dead from "../../../assetes/icons/dead.svg";
import unknown from "../../../assetes/icons/unknown.svg";
const MySelect = () => {
    return (
        <div>
            <MyInput
                className="short_input"
                placeholder="Выберете статус персонажа"
                type="text"
                disabled={true}
            />
            <img src={down} className="select" alt=""/>
            <div className="options">
                <div className="options">
                    <img src={alive} alt=""/>
                    <span>Живой</span>
                </div>
                <div className="options">
                    <img src={dead} alt=""/>
                    <span>Мертв</span>
                </div>
                <div className="options">
                    <img src={unknown} alt=""/>
                    <span>Неизвестно</span>
                </div>
            </div>
        </div>
    );
};

export default MySelect;