import {useState} from "react";
import {AuthContext} from "./context/context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
