import React, {useContext, useEffect, useState} from 'react';
import alive from "../../../assetes/icons/alive.svg";
import dead from "../../../assetes/icons/dead.svg";
import unknown from "../../../assetes/icons/unknown.svg";
import plus from "../../../assetes/icons/plus.svg";
import added from "../../../assetes/icons/added.svg";
import {AuthContext} from "../../../context/context";

const ShortCharacterPanel = ({character, page}) => {
    const {currentUser, setCurrentUser, isAuth, setLoginVisibility} = useContext(AuthContext);
    const [isAdded, setIsAdded] = useState(false)
    const status = {
        alive: [alive, "Живой"],
        dead: [dead, "Мертв"],
        unknown: [unknown, "Неизвестно"]
    }
    useEffect(() => {
        if (isAuth && (currentUser.favouriteCharacters ?? {})[+character.id] === true) {
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }
    }, [character])
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
            <div className="character_status" style={{float: "right"}}>
                <img src={status[character.status.toLowerCase()][0]} style={{display: "inline"}} alt="status"/>
                <p className="field_value" style={{display: "inline"}}> {status[character.status.toLowerCase()][1]}</p>
            </div>
            <div className={"add" + (isAdded ? " added" : "")} onClick={() => {
                if (!isAdded) {
                    addFavourite()
                }
            }}>
                <img src={isAdded ? added : plus} alt=""/>
            </div>
        </div>
    );
};

export default ShortCharacterPanel;