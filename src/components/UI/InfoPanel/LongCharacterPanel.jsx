import React, {useContext, useEffect, useState} from 'react';
import alive from "../../../assetes/icons/alive.svg";
import dead from "../../../assetes/icons/dead.svg";
import unknown from "../../../assetes/icons/unknown.svg";
import plus from "../../../assetes/icons/plus.svg";
import done from "../../../assetes/icons/done.svg";
import {getNumberEpisodes} from "../../../utils/calculations";
import MyButton from "../Button/MyButton";
import {AuthContext} from "../../../context/context";

const LongCharacterPanel = ({character}) => {
    const [isAdded, setIsAdded] = useState(false)
    const status = {
        alive: [alive, "Живой"],
        dead: [dead, "Мертв"],
        unknown: [unknown, "Неизвестно"]
    }
    const {currentUser, setCurrentUser, isAuth, setLoginVisibility} = useContext(AuthContext);

    const addFavourite = () => {
        if (!isAuth) {
            setLoginVisibility(true)
            return false
        }
        if(isAdded){
            return false
        }
        const copy = {...currentUser}
        if (!copy.favouriteCharacters) {
            copy.favouriteCharacters = {}
        }
        const users = JSON.parse(localStorage.getItem("rickAndMortyUsers") ?? "{}");
        copy.favouriteCharacters[character.id] = true;
        users[copy.email] = {...copy};
        users[copy.login] = {...copy};
        localStorage.setItem("rickAndMortyUsers", JSON.stringify(users))
        setCurrentUser(copy)
        setIsAdded(true)
    }

    useEffect(() => {
        if (isAuth && (currentUser.favouriteCharacters ?? {})[+character.id] === true) {
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }
    }, [character, isAuth])

    return (
        <div className="long_panel panel">
            <img src={character.image} alt={character.name} className="character_img"/>
            <div className="right">
                <div className="episode_heading">
                    <p className="character_name">{character.name} </p>
                </div>
                <div className="character_fields">
                    <p className="field_name">Раса:</p>
                    <p className="field_value">{character.species}</p>
                    <p className="field_name">Пол:</p>
                    <p className="field_value">{character.gender}</p>
                    <p className="field_name">Место происхождения:</p>
                    <p className="field_value">{character?.origin.name}</p>
                    <p className="field_name">Эпизоды:</p>
                    <p className="field_value">{getNumberEpisodes(character.episode)}</p>
                    <p className="field_name">Последняя локация:</p>
                    <p className="field_value">{character?.location.name}</p>
                </div>
            </div>
            <div className="character_status" style={{float: "right"}}>
                <img src={status[character.status.toLowerCase()][0]} style={{display: "inline"}} alt="status"/>
                <p className="field_value" style={{display: "inline"}}>  {status[character.status.toLowerCase()][1]}</p>
            </div>
            {isAdded
                ? <div className="done"><img src={done} alt=""/><p>В избранном</p></div>
                : <MyButton className="btn_long" onClick={()=>{
                    addFavourite()
                }}
                ><img src={plus}/><span>  Добавить в избранное</span></MyButton>
            }
        </div>
    );
};

export default LongCharacterPanel;