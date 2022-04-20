import React, {useContext, useEffect, useState} from 'react';
import MyInput from "../MyInput/MyInput";
import {debounce} from "../../../utils/debounce";
import MyButton from "../Button/MyButton";
import MyModal from "../Modal/MyModal";
import openedEye from "../../../assetes/icons/opened_eye.svg";
import closedEye from "../../../assetes/icons/closed_eye.svg";
import md5 from "md5";
import {AuthContext} from "../../../context/context";

const Login = ({isVisible, setIsVisible}) => {
    const {setIsAuth, setCurrentUser} = useContext(AuthContext)
    const [isPasswordText, setIsPasswordText] = useState(false);
    const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
    const [isIncorrectLoginEmail, setIsIncorrectLoginEmail] = useState(false);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        setUserData({
            emailLogin: '',
            password: '',
        })
        setIsIncorrectPassword(false)
        setIsIncorrectLoginEmail(false)
    }, [isVisible])

    const loginHandler = e => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("rickAndMortyUsers") ?? "{}");
        if (!users[userData.emailLogin.toLowerCase()]) {
            setIsIncorrectLoginEmail(true)
            return false
        } else {
            setIsIncorrectLoginEmail(false)
        }

        if (users[userData.emailLogin].password !== md5(userData.password)) {
            setIsIncorrectPassword(true)
            return false
        } else {
            setIsIncorrectPassword(false)
        }
        localStorage.setItem("rickAndMortyLastUser", users[userData.emailLogin].login)
        setCurrentUser({...users[userData.emailLogin]})
        setIsAuth(true)
        setIsVisible(false)
    }

    const inputHandler = (e, name) => {
        const copy = {...userData}
        copy[name] = e.target.value;
        setUserData({...copy})
    }

    return (
        <MyModal isVisible={isVisible} setIsVisible={setIsVisible}>
            <p className="modal_heading_login_text">Вход</p>
            <form className="login_form" onSubmit={loginHandler}>
                <div className="margin34">
                    <MyInput
                        id="logonOrEmail"
                        className="login_input"
                        value={userData.emailLogin}
                        placeholder="Введите логин или E-mail"
                        type="text"
                        incorrect={isIncorrectLoginEmail}
                        onChange={(e) => {
                            inputHandler(e, "emailLogin")
                        }}
                    />
                    <div className="password">
                        <MyInput
                            id="password"
                            className="login_input"
                            placeholder="Введите  пароль"
                            type={isPasswordText ? "text" : "password"}
                            value={userData.password}
                            incorrect={isIncorrectPassword}
                            onChange={(e) => {
                                inputHandler(e, "password")
                            }}
                        />
                        <img src={isPasswordText ? openedEye : closedEye}
                             className="eye"
                             onClick={() => {
                                 setIsPasswordText(!isPasswordText)
                             }}
                        />
                    </div>
                    <div>
                        <input type="checkbox" name="remember" id="remember"/>
                        <label htmlFor="remember">Запомнить</label>
                    </div>
                </div>
                <MyButton type="submit" className="btn_black">
                    Войти
                </MyButton>
            </form>
        </MyModal>
    );
};

export default Login;