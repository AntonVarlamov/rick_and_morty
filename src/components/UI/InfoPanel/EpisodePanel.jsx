import React, {useEffect, useState} from 'react';
import {getNumberEpisodes, getIdFromUrl, parseCharacters} from "../../utils/calculations";
import MyButton from "../Button/MyButton";
import plus from "../../../assetes/icons/plus.svg";
import PostService from "../../../API/PostService";

const EpisodePanel = ({episode}) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const[characters, setCharacters] = useState("");
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
            <MyButton className="btn_long"><img src={plus}/><span> Добавить в избранное</span></MyButton>
        </div>
    );
};

export default EpisodePanel;