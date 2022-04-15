import React, {useState} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../Button/MyButton";
import logo from  "../../../logo/rick_and_morty.svg"
import "./NavBar.css"

const NavBar = () => {
    let [auth, setAuth] = useState(false);
    const authorization = () =>{
        setAuth(!auth);
    }
    return (
        <div className="container navbar">
            <img src={logo} alt="rick and morty logo" className="navbar_logo" height={112}/>
            <nav className="navbar_links">
                <a href="/main" className="navbar_link active">Главная</a>
                {auth &&
                    <a href="/main/favourites" className="navbar_link normal">Избранное</a>
                }
                <a href="/about" className="navbar_link normal">О проекте</a>
            </nav>
            {auth
                ? <div className="navbar_btns">
                    <p className="first_txt">chelibos</p>
                    <MyButton className="btn_white" onClick={authorization}>Выйти</MyButton>
                </div>
                : <div className="navbar_btns">
                    <MyButton className="btn_white first_btn">Регистрация</MyButton>
                    <MyButton className="btn_black" onClick={authorization}>Войти</MyButton>
                </div>
            }
        </div>
    );
};

export default NavBar;