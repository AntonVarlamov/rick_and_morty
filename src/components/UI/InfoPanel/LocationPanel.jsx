import React, {useContext, useEffect, useState} from 'react';
import plus from "../../../assetes/icons/plus.svg";
import {AuthContext} from "../../../context/context";
import added from "../../../assetes/icons/added.svg";

const LocationPanel = ({location, canDelete, favourites, setFavourites, index}) => {
    const {currentUser, setCurrentUser, isAuth, setLoginVisibility} = useContext(AuthContext);
    const [isAdded, setIsAdded] = useState(false)
    useEffect(() => {
        if (isAuth && (currentUser.favouriteLocations ?? {})[+location.id] === true) {
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }
    }, [location, isAuth])

    const deleteFavourite = () =>{
        const copy = {...currentUser}
        const users = JSON.parse(localStorage.getItem("rickAndMortyUsers") ?? "{}");
        delete copy.favouriteLocations[location.id]
        users[copy.email] = {...copy};
        users[copy.login] = {...copy};
        favourites.splice(index, 1)
        localStorage.setItem("rickAndMortyUsers", JSON.stringify(users))
        setFavourites(favourites)
        setCurrentUser(copy)
    }
    const addFavourite = () => {
        if (!isAuth) {
            setLoginVisibility(true)
            return false
        }
        if(isAdded){
            return false
        }
        const copy = {...currentUser}
        if (!copy.favouriteLocations) {
            copy.favouriteLocations = {}
        }
        const users = JSON.parse(localStorage.getItem("rickAndMortyUsers") ?? "{}");
        copy.favouriteLocations[location.id] = true;
        users[copy.email] = {...copy};
        users[copy.login] = {...copy};
        localStorage.setItem("rickAndMortyUsers", JSON.stringify(users))
        setCurrentUser(copy)
        setIsAdded(true)
    }
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
                    <p className="field_big_number">{location?.residents?.length}</p>
                </div>
            </div>
            {canDelete
                ?<div className="delete" onClick={() => {
                    deleteFavourite()
                }}>
                    <img src={plus} alt=""/>
                </div>
                :<div className={"add" + (isAdded ? " added" : "")} onClick={() => {
                    if (!isAdded) {
                        addFavourite()
                    }
                }}>
                    <img src={isAdded ? added : plus} alt=""/>
                </div>
            }
        </div>
    );
};

export default LocationPanel;