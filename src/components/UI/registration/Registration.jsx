import React, {useState} from 'react';
import MyModal from "../Modal/MyModal";
import MyInput from "../MyInput/MyInput";
import MyButton from "../Button/MyButton";

const Registration = ({isVisible, setIsVisible}) => {
    const [userData, setUserData] = useState({
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        password: '',
        passwordRepeat: '',
    });
    const inputHandler = (e, name) => {
        const copy = {...userData};
        copy[name] = e.target.value;
        setUserData(copy)
    }
    const registrationHandler = (e) => {
        e.preventDefault()

    }
    return (
        <MyModal isVisible={isVisible} setIsVisible={setIsVisible}>
            <p className="modal_heading_registration_text">Регистрация</p>
            <form
                className="registration_form"
                onSubmit={registrationHandler}
            >
                <div className="margin34">
                    <MyInput
                        className="login_input"
                        placeholder="Введите E-mail"
                        type="text"
                        id="email"
                        onChange={(e) => {
                            inputHandler(e, 'email')
                        }}
                        maxLength={50}
                        required
                    />
                    <MyInput
                        className="login_input"
                        placeholder="Придумайте логин"
                        type="text"
                        id="login"
                        onChange={(e) => {
                            inputHandler(e, 'login')
                        }}
                        maxLength={20}
                        required
                    />
                    <MyInput
                        className="login_input"
                        placeholder="Введите имя"
                        type="text"
                        onChange={(e) => {
                            inputHandler(e, 'firstName')
                        }}
                        id="first_name"
                        maxLength={50}
                        required
                    />
                    <MyInput
                        className="login_input"
                        placeholder="Введите фамилию"
                        id="second_name"
                        onChange={(e) => {
                            inputHandler(e, 'secondName')
                        }}
                        type="text"
                        maxLength={50}
                        required
                    />
                    <MyInput
                        className="login_input"
                        placeholder="Введите  пароль"
                        id="password_registration"
                        onChange={(e) => {
                            inputHandler(e, 'password')
                        }}
                        type="password"
                        maxLength={50}
                        required
                    />
                    <MyInput
                        className="login_input"
                        placeholder="Повторите  пароль"
                        id="password_repeat"
                        onChange={(e) => {
                            inputHandler(e, 'passwordRepeat')
                        }}
                        type="password"
                        maxLength={50}
                        required
                    />
                </div>
                <MyButton type="submit" className="btn_black">
                    Зарегистрировать
                </MyButton>
            </form>
        </MyModal>
    );
};

export default Registration;