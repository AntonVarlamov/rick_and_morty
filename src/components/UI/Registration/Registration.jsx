import React, {useEffect, useState} from 'react';
import MyModal from "../Modal/MyModal";
import MyInput from "../MyInput/MyInput";
import MyButton from "../Button/MyButton";
import closedEye from "../../../assetes/icons/closed_eye.svg";
import openedEye from "../../../assetes/icons/opened_eye.svg"
import md5 from "md5";

const Registration = ({isVisible, setIsVisible}) => {
    const [isPasswordText, setIsPasswordText] = useState(false);
    const [isEmailOccupied, setIsEmailOccupied] = useState(false);
    const [isLoginOccupied, setIsLoginOccupied] = useState(false);
    const [isPasswordRepeatText, setIsPasswordRepeatText] = useState(false);
    const [userData, setUserData] = useState({});
    const [isValidData, setIsValidData] = useState({});
    useEffect(()=>{
        setUserData({
            email: '',
            login: '',
            firstName: '',
            secondName: '',
            password: '',
            passwordRepeat: '',
        })
        setIsValidData({
            email: false,
            login: false,
            firstName: false,
            secondName: false,
            password: false,
            passwordRepeat: false,
        })
        setIsPasswordText(false);
        setIsPasswordRepeatText(false);
        setIsEmailOccupied(false);
        setIsLoginOccupied(false);
    },[isVisible])

    const inputHandler = (e, name) => {
        const copy = {...userData};
        copy[name] = e.target.value;
        setUserData({...copy})
    }
    const registrationHandler = (e) => {
        e.preventDefault()
        console.log(isValidData)
        if(!Object.values(isValidData).includes(false)){
            let users = JSON.parse(localStorage.getItem("rickAndMortyUsers") ?? "{}");
            if(users[userData.email]){
                setIsEmailOccupied(true)
                return false
            } else {
                setIsEmailOccupied(false)
            }
            if(users[userData.login]){
                setIsLoginOccupied(true)
                return false
            } else {
                setIsLoginOccupied(false)
            }
            const user = {...userData}
            user.password = md5(user.password);
            delete user.passwordRepeat
            users[userData.email.toLowerCase()] = {...user};
            users[userData.login.toLowerCase()] = {...user};
            localStorage.setItem("rickAndMortyUsers", JSON.stringify(users))
            setIsVisible(false)
        }
    }
    return (
        <MyModal isVisible={isVisible} setIsVisible={setIsVisible} >
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
                        incorrect={isEmailOccupied}
                        value={userData.email}
                        name="email"
                        inputHandler={inputHandler}
                        isValidData={isValidData}
                        setIsValidData={setIsValidData}
                        typeInput={userData.email ? "email" : ""}
                        maxLength={50}
                        required
                    />
                    <MyInput
                        className="login_input"
                        placeholder="Придумайте логин"
                        type="text"
                        id="login"
                        name="login"
                        inputHandler={inputHandler}
                        incorrect={isLoginOccupied}
                        value={userData.login}
                        isValidData={isValidData}
                        setIsValidData={setIsValidData}
                        typeInput={userData.login ? "login" : ""}
                        maxLength={20}
                        required
                    />
                    <MyInput
                        className="login_input"
                        placeholder="Введите имя"
                        type="text"
                        name="firstName"
                        inputHandler={inputHandler}
                        typeInput={userData.firstName ? "firstName" : ""}
                        isValidData={isValidData}
                        setIsValidData={setIsValidData}
                        value={userData.firstName}
                        id="first_name"
                        maxLength={50}
                        required
                    />
                    <MyInput
                        className="login_input"
                        placeholder="Введите фамилию"
                        id="second_name"
                        name="secondName"
                        value={userData.secondName}
                        inputHandler={inputHandler}
                        isValidData={isValidData}
                        setIsValidData={setIsValidData}
                        typeInput={userData.secondName ? "secondName" : ""}
                        type="text"
                        maxLength={50}
                        required
                    />
                    <div className="password">
                        <MyInput
                            className="login_input"
                            placeholder="Введите  пароль"
                            id="password_registration"
                            value={userData.password}
                            name="password"
                            isValidData={isValidData}
                            setIsValidData={setIsValidData}
                            inputHandler={inputHandler}
                            typeInput={userData.password ? "password" : ""}
                            type={isPasswordText ? "text" : "password"}
                            maxLength={50}
                            required
                        />
                        <img src={isPasswordText ? openedEye : closedEye}
                             className="eye"
                             onClick={() => {
                                 setIsPasswordText(!isPasswordText)
                             }}
                        />
                    </div>
                    <div className="password">
                        <MyInput
                            className="login_input"
                            placeholder="Повторите  пароль"
                            id="password_repeat"
                            name="passwordRepeat"
                            value={userData.passwordRepeat}
                            inputHandler={inputHandler}
                            typeInput={userData.passwordRepeat ? "passwordRepeat" : ""}

                            password={userData.password}
                            isValidData={isValidData}
                            setIsValidData={setIsValidData}
                            type={isPasswordRepeatText ? "text" : "password"}
                            maxLength={50}
                            required
                        />
                        <img src={isPasswordRepeatText ? openedEye : closedEye}
                             className="eye"
                             onClick={() => {
                                 setIsPasswordRepeatText(!isPasswordRepeatText)
                             }}
                        />
                    </div>
                </div>
                <MyButton type="submit" className="btn_black">
                    Зарегистрировать
                </MyButton>
            </form>
        </MyModal>
    );
};

export default Registration;