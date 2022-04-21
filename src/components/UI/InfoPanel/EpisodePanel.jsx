import React, {useContext, useEffect, useState} from 'react';
import {getNumberEpisodes, getIdFromUrl, parseCharacters} from "../../../utils/calculations";
import MyButton from "../Button/MyButton";
import plus from "../../../assetes/icons/plus.svg";
import PostService from "../../../API/PostService";
import {AuthContext} from "../../../context/context";
import done from "../../../assetes/icons/done.svg";

const EpisodePanel = ({episode, canDelete, favourites, setFavourites, index}) => {
    const {currentUser, setCurrentUser, isAuth, setLoginVisibility} = useContext(AuthContext);
    const [isAdded, setIsAdded] = useState(false)
    useEffect(() => {
        if (isAuth && (currentUser.favouriteEpisodes ?? {})[+episode.id] === true) {
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }
    }, [episode, isAuth])

    const deleteFavourite = () =>{
        const copy = {...currentUser}
        const users = JSON.parse(localStorage.getItem("rickAndMortyUsers") ?? "{}");
        delete copy.favouriteEpisodes[episode.id]
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
        if (isAdded) {
            return false
        }
        const copy = {...currentUser}
        if (!copy.favouriteEpisodes) {
            copy.favouriteEpisodes = {}
        }
        const users = JSON.parse(localStorage.getItem("rickAndMortyUsers") ?? "{}");
        copy.favouriteEpisodes[episode.id] = true;
        users[copy.email] = {...copy};
        users[copy.login] = {...copy};
        localStorage.setItem("rickAndMortyUsers", JSON.stringify(users))
        setCurrentUser(copy)
        setIsAdded(true)
    }
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [characters, setCharacters] = useState("");
    const date = new Date(episode.created)

    async function fetchCharacters() {
        const response = await PostService.getCharacters(getIdFromUrl(episode.characters));
        setCharacters(parseCharacters((response?.data ?? [])))
    }

    useEffect(() => {
        fetchCharacters()
    }, [])
    return (
        <div className="long_panel panel episode_panel">
            <div className="right">
                <div className="character_heading">
                    <p className="episode_name">{episode.name} </p>
                </div>
                <div className="episode_fields">
                    <div className="left_field">
                        <p className="field_name">Эпизод:</p>
                        <p className="field_value">{episode.episode}</p>
                        <p className="field_name">Дата выхода:</p>
                        <p className="field_value">{`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</p>
                    </div>
                    <div className="right_field">
                        <p className="field_name">Персонажи, участвующие в эпизоде:</p>
                        <p className="field_value">{characters}</p>
                    </div>
                </div>
            </div>
            {canDelete
                ?<MyButton className="btn_long btn_delete_favourite" onClick={() => {
                    deleteFavourite()
                }}
                ><img src={plus} style={{transform:"rotate(45deg)"}}/><span>  Удалить из избранного</span></MyButton>
                : isAdded
                    ? <div className="done"><img src={done} alt=""/><p>В избранном</p></div>
                    : <MyButton className="btn_long" onClick={() => {
                        addFavourite()
                    }}
                    ><img src={plus}/><span>  Добавить в избранное</span></MyButton>
            }
        </div>
    );
};

export default EpisodePanel;