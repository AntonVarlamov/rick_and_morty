import React, {useEffect, useState} from 'react';
import './MyInput.css'
import warning from "../../../assetes/icons/warning.svg"
import {validateInput} from "../../../utils/validator";

const MyInput = ({className, typeInput, password, setIsValidData, isValidData, incorrect, inputHandler, ...props}) => {
    const [isError, setIsError] = useState(false);
    const [currentText, setIsCurrentText] = useState("");
    const [textError, setTextError] = useState("");
    useEffect(() => {
        if (!typeInput) {
            setIsError(false)
        }
    }, [typeInput])
    useEffect(()=>{
        if (typeInput) {
            if (typeInput === "passwordRepeat") {
                if (password === currentText) {
                    setIsError(false)
                } else {
                    setIsError(true)
                    setTextError("Пароли должны совпадать")
                }
            } else {
                validateInput(currentText, typeInput, setIsError, setTextError)
            }
            let copy = isValidData;
            copy[typeInput] = !isError;
            setIsValidData({...copy})
        }
    }, [currentText])
    useEffect(()=>{
        if(incorrect){
            setIsError(true);
            if(props.id === "email"){
                setTextError("Данный email уже используется")
            } else if (props.id === "login") {
                setTextError("Данный логин уже используется")
            } else if (props.id === "password"){
                setTextError("Пароль не подходит")
            }else if (props.id === "logonOrEmail"){
                setTextError("Пользователь не найден")
            }
        } else {
            setIsError(false);
        }
    },[incorrect])
    const onChange = (e) => {
        if (typeInput) {
            if (typeInput === "passwordRepeat") {
                if (password === e.target.value) {
                    setIsError(false)
                } else {
                    setIsError(true)
                    setTextError("Пароли должны совпадать")
                }
            } else {
                validateInput(e.target.value, typeInput, setIsError, setTextError)
            }
            let copy = isValidData;
            copy[typeInput] = !isError;
            setIsValidData({...copy})
        }
    }
    return (
        <div>
            <input
                className={`input_filter ${className}` + (isError ? " input_error" : "")}
                onChange={(e) => {
                    if(props.name){
                        inputHandler(e, props.name)
                        setIsCurrentText(e.target.value)
                        onChange(e)
                    }
                }}
                {...props}
            />
            <div className={isError ? "error" : "none"}>
                <img src={warning} alt="" className="warning_icon"/>
                <p>{textError}</p>
            </div>
        </div>
    );
};

export default MyInput;