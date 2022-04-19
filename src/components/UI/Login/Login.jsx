import React from 'react';
import MyInput from "../MyInput/MyInput";
import {debounce} from "../../utils/debounce";
import MyButton from "../Button/MyButton";
import MyModal from "../Modal/MyModal";

const Login = ({isVisible, setIsVisible}) => {
    return (
        <MyModal isVisible={isVisible} setIsVisible={setIsVisible}>
            <p className="modal_heading_login_text">Вход</p>
            <form className="login_form">
                <div className="margin34">
                    <MyInput
                        id="logonOrEmail"
                        className="login_input"
                        placeholder="Введите логин или E-mail"
                        type="text"
                    />
                    <div>
                        <MyInput
                            id="password"
                            className="login_input"
                            placeholder="Введите  пароль"
                            type="password"
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