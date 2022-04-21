import React from 'react';
import logo from "../assetes/icons/rick_and_morty.svg"
import error from "../assetes/png/404.png"
import home from "../assetes/icons/home.svg"
import MyButton from "../components/UI/Button/MyButton";
import {Link} from "react-router-dom";

const Error404 = () => {

    return (
        <section className="container">
            <img src={logo} alt="rick and morty logo" className="error_logo"/>
            <img src={error} alt="error 404" className="error_png"/>
            <p className="error_heading">Усп. Кажется вы заблудились. Только без паники!</p>
            <p className="error_text">Страница, которую вы ищите не существует, либо была удалена</p>
            <Link to={'/main'}><MyButton className="home_btn"><img src={home} alt="home"/> <p>  Домой</p></MyButton></Link>
        </section>
    );
};

export default Error404;