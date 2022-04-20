export const validateInput = (text, typeInput, setIsError, setTextError) => {

    const namesValidate = () => {
        let isFirstName = typeInput === "firstName";
        if (text.length < 2 && text) {
            setTextError(`Длина ${isFirstName ? "имени" : "фамилии"} должна быть не менее 2 символов`)
            setIsError(true)
        } else {
            setIsError(false)
        }
    }
    const emailValidate = () => {
        if ((/^.+@.+\..+$/.test(text) && text.length >= 6) || !text) {
            setIsError(false)
        } else {
            setIsError(true)
            setTextError("Поле должно быть определенного формата и иметь длину более 5 символов")
        }
    }
    const passwordValidate = () => {
        if ((/[^a-zA-Z\d]+|^[a-zA-Z]+$|^[a-z\d]+$|^[\dA-Z]+$/.test(text) || text.length < 6) && text) {
            setIsError(true)
            setTextError("Поле должно содержать символы типа (A-Z), (a-z), (0-9), длина не менее 6 символов")
        } else {
            setIsError(false)
        }
    }
    const loginValidate = () => {
        if(text.length < 6 && text){
            setIsError(true)
            setTextError("Длина логина должна быть не менее 6 символов")
        } else {
            setIsError(false)
        }
    }
    const validators = {
        email: emailValidate,
        firstName: namesValidate,
        secondName: namesValidate,
        login: loginValidate,
        password: passwordValidate
    }
    validators[typeInput]()
}