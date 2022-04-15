import NavBar from "./components/UI/NavBar/NavBar";
import Main from "./pages/Main";
import Heading from "./components/UI/Heading/Heading";
import About from "./pages/About";
import Error404 from "./pages/Error404";
import {useState} from "react";
import {AuthContext} from "./context/context";
import {BrowserRouter} from "react-router-dom";
import MainCharacters from "./pages/MainCharacters";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <MainCharacters/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
