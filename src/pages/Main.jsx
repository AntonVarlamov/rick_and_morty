import React from 'react';
import mainCharacters from "../assetes/jpg/main_characters.jpg"
import mainEpisodes from "../assetes/jpg/main_episodes.jpg"
import mainLocations from "../assetes/jpg/main_locations.jpg"
import NavBar from "../components/UI/NavBar/NavBar";
import Heading from "../components/UI/Heading/Heading";
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <div>
            <NavBar/>
            <section className="container main">
                <Link to={'/main/characters'} className="main_link">
                    <img src={mainCharacters} alt="Персонажи"/>
                    <p className="main_link_heading">Персонажи</p>
                    <p className="main_link_text">Зайди и познакомься со всеми персонажами вселенной</p>
                </Link>
                <Link to={'/main/locations'} className="main_link">
                    <img src={mainLocations} alt="Локации"/>
                    <p className="main_link_heading">Локации</p>
                    <p className="main_link_text">Исследуй все локации. Давай же, не будь занудой!</p>
                </Link>
                <Link to={'/main/episodes'} className="main_link">
                    <img src={mainEpisodes} alt="Эпизоды"/>
                    <p className="main_link_heading">Эпизоды</p>
                    <p className="main_link_text">Узнай чуть больше о карте приключений Рика и Морти</p>
                </Link>
            </section>
        </div>
    );
};

export default Main;