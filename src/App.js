import {useState} from "react";
import {AuthContext} from "./context/context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Login from "./components/UI/Login/Login";
import Registration from "./components/UI/Registration/Registration";

function App() {
    const lastUserName = localStorage.getItem("rickAndMortyLastUser") ?? false
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("rickAndMortyUsers"))[lastUserName]
    )
    const [isAuth, setIsAuth] = useState(!!lastUserName);
    const [loginVisibility, setLoginVisibility] = useState(false)
    const [registrationVisibility, setRegistrationVisibility] = useState(false)

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            setLoginVisibility,
            setRegistrationVisibility,
            lastUserName,
            currentUser,
            setCurrentUser
        }}>
            <BrowserRouter>
                <AppRouter/>
                <Login isVisible={loginVisibility} setIsVisible={setLoginVisibility}/>
                <Registration isVisible={registrationVisibility} setIsVisible={setRegistrationVisibility}/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
