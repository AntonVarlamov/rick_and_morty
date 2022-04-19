import React, {useEffect} from 'react';
import alive from "../../../assetes/icons/alive.svg";
import dead from "../../../assetes/icons/dead.svg";
import unknown from "../../../assetes/icons/unknown.svg";
import plus from "../../../assetes/icons/plus.svg"

const ShortCharacterPanel = ({character}) => {
    const status = {
        alive: [alive, "Живой"],
        dead: [dead, "Мертв"],
        unknown: [unknown, "Неизвестно"]
    }
    return (
        <div className="short_panel panel">
            <img src={character.image} alt={character.name} className="character_img"/>
            <div className="right">
                <div className="character_heading">
                    <p className="character_name">{character.name} </p>
                </div>
                <div className="character_fields">
                    <p className="field_name">Раса:</p>
                    <p className="field_value">{character.species}</p>
                    <p className="field_name">Место происхождения:</p>
                    <p className="field_value">{character?.origin.name}</p>
                    <p className="field_name">Последняя локация:</p>
                    <p className="field_value">{character?.location.name}</p>
                </div>
            </div>
            <div className="character_status" style={{float:"right"}}>
                <img src={status[character.status.toLowerCase()][0]} style={{display:"inline"}} alt="status"/>
                <p className="field_value" style={{display:"inline"}}> {status[character.status.toLowerCase()][1]}</p>
            </div>
            <div className="add">
                <img src={plus} alt="" />
            </div>
        </div>
    );
};

export default ShortCharacterPanel;