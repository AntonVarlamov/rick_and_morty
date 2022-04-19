import React, {useContext} from 'react';
import {AuthContext} from "../context/context";
import {Route, Routes, Navigate} from "react-router-dom";
import Main from "../pages/Main";
import About from "../pages/About";
import MainCharacters from "../pages/MainCharacters";
import Error404 from "../pages/Error404";
import MainLocations from "../pages/MainLocations";
import MainEpisodes from "../pages/MainEpisodes";
import MyModal from "./UI/Modal/MyModal";
import Login from "./UI/Login/Login";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/main'}/>} exact/>
            <Route path={'/main'} element={<Main/>} exact/>
            <Route path={'/about'} element={<About/>} exact/>
            <Route path={'/main/characters'} element={<MainCharacters/>} exact={false}/>
            <Route path={'/main/locations'} element={<MainLocations/>} exact={false}/>
            <Route path={'/main/episodes'} element={<MainEpisodes/>} exact={false}/>
            <Route path={'/error'} element={<Error404/>}/>
            <Route path="*" element={<Navigate to={'/error'}/>}/>
            <Route path={'/test'} element={<Login/>}/>

        </Routes>
    );
};

export default AppRouter;