import React, {useContext} from 'react';
import {AuthContext} from "../context/context";
import {Route, Routes, Navigate} from "react-router-dom";
import Main from "../pages/Main";
import About from "../pages/About";
import MainCharacters from "../pages/MainCharacters";
import Error404 from "../pages/Error404";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/main'}/>} exact/>
            <Route path={'/main'} element={<Main/>} exact/>
            <Route path={'/about'} element={<About/>} exact/>
            <Route path={'/main/characters'} element={<MainCharacters/>} exact/>
            <Route path={'/error'} element={<Error404/>}/>
            <Route path="*" element={<Navigate to={'/error'}/>}/>
        </Routes>
    );
};

export default AppRouter;