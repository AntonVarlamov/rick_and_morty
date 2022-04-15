import React from 'react';
import logo from "../logo/rick_and_morty.svg"
import error from "../png/404.png"
import home from "../icons/home.svg"
import MyButton from "../components/UI/Button/MyButton";
const Error404 = () => {

    return (
        <div className="container error">
            <img src={logo} alt="rick and morty logo" className="error_logo"/>
            <img src={error} alt="error 404" className="error_png"/>
            <p className="error_heading">Усп. Кажется вы заблудились. Только без паники!</p>
            <p className="error_text">Страница, которую вы ищите не существует, либо была удалена</p>
            <MyButton className="home_btn"><img src={home} alt="home"/>  Домой </MyButton>
        </div>
    );
};

export default Error404;