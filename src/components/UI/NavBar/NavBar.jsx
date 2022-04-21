import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../Button/MyButton";
import logo from "../../../assetes/icons/rick_and_morty.svg"
import "./NavBar.css"
import {AuthContext} from "../../../context/context";

const NavBar = () => {
    const {setLoginVisibility, setRegistrationVisibility, isAuth, setIsAuth, currentUser} = useContext(AuthContext);

    const login = () => {
        setLoginVisibility(true)
    }
    const logout = () => {
        localStorage.setItem("rickAndMortyLastUser", "")

        setIsAuth(!isAuth);
    }

    const registration = () => {
        setRegistrationVisibility(true)
    }

    const checkPath = (path) => {
        return document.location.pathname.search(path) !== -1
            ? "active"
            : "normal"
    }
    return (
        <header className="container navbar">
            <img src={logo} alt="rick and morty logo" className="navbar_logo" height={112}/>
            <nav className="navbar_links">
                <Link to="/main" className={`navbar_link ${checkPath("/main")}`}>Главная</Link>
                {isAuth &&
                    <Link to="/favourites"
                          className={`navbar_link ${checkPath("/favourites")}`}>Избранное</Link>
                }
                <Link to="/about" className={`navbar_link ${checkPath("/about")}`}>О проекте</Link>
            </nav>
            {isAuth
                ? <div className="navbar_btns">
                    <p className="first_txt">{currentUser.secondName + " " + currentUser.firstName[0] + "."}</p>
                    <MyButton className="btn_white" onClick={logout}>Выйти</MyButton>
                </div>
                : <div className="navbar_btns">
                    <MyButton className="btn_white first_btn" onClick={registration}>Регистрация</MyButton>
                    <MyButton className="btn_black" onClick={login}>Войти</MyButton>
                </div>
            }
        </header>
    );
};

export default NavBar;