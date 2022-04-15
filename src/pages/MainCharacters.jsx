import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import ShortCharacterPanel from "../components/UI/InfoPanel/ShortCharacterPanel";
import NavBar from "../components/UI/NavBar/NavBar";
import Heading from "../components/UI/Heading/Heading";

const MainCharacters = () => {
    const [characters, setCharacters] = useState([])
    const [fetchPost, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll();
        setCharacters([...characters, ...response.data.results])
    });
    useEffect(()=>{
        fetchPost()
    }, [])
    return (
        <div>
            <NavBar/>
            <Heading>Персонажи</Heading>
            <div className="container main_characters">
                {characters.map((item, id) => {
                    return (
                        <ShortCharacterPanel key={id} character={item}/>
                    )
                })}
            </div>
        </div>

    );
};

export default MainCharacters;