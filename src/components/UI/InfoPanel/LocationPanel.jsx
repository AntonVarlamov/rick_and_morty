import React from 'react';
import plus from "../../../assetes/icons/plus.svg";

const LocationPanel = ({location}) => {
    return (
        <div className="short_panel_location panel">
            <div className="location_heading">
                <p className="location_name">{location.name} </p>
            </div>
            <div className="location_fields">
                <div className="left_side_location">
                    <p className="field_name">Тип:</p>
                    <p className="field_value">{location?.type}</p>
                    <p className="field_name">Измерение:</p>
                    <p className="field_value">{location?.dimension}</p>
                </div>
                <div className="right_side_location">
                    <p className="field_name">Количество персонажей, которые в последний раз были замечены здесь:</p>
                    <p className="field_big_number">{location?.residents.length}</p>
                </div>
            </div>
            <div className="add">
                <img src={plus}/>
            </div>
        </div>
    );
};

export default LocationPanel;