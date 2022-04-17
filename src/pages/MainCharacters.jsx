import React, {useEffect, useMemo, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import ShortCharacterPanel from "../components/UI/InfoPanel/ShortCharacterPanel";
import NavBar from "../components/UI/NavBar/NavBar";
import Heading from "../components/UI/Heading/Heading";
import MyInput from "../components/UI/MyInput/MyInput";
import tiles from "../assetes/icons/tiles.svg";
import redTiles from "../assetes/icons/red_tiles.svg";
import hamburger from "../assetes/icons/hamburger.svg";
import redHamburger from "../assetes/icons/red_hamburger.svg";
import Pagination from "../components/UI/Pagination/Pagination";
import {getEpisodes} from "../components/utils/calculations";
import LongCharacterPanel from "../components/UI/InfoPanel/LongCharacterPanel";
import {debounce} from "../components/utils/debounce";

const MainCharacters = () => {
    const [isHamburger, setIsHamburger] = useState(true)
    const [search, setSearch] = useState({
        name: "",
        race: "",
        status: ""
    });
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [fetchCharacters, error] = useFetching(async () => {
        const response = await PostService.getCharacters(page, search);
        setTotalPages(response?.data.info.pages)
        setCharacters([...response.data.results])
    });

    useEffect(() => {
        fetchCharacters()
    }, [page, totalPages, search])

    function filterSearch(e, name) {
        let copy = {...search};
        copy[name] = e.target.value
        setSearch(copy)
        //const func = debounce(fetchFilterCharacters, 1000);
    }

    return (
        <div>
            <NavBar/>
            <Heading>Персонажи</Heading>
            <section className="container filter_main_characters">
                <div>
                    <p>Поиск по имени</p>
                    <MyInput
                        className="long_input"
                        placeholder="Введите имя персонажа"
                        onChange={(e) => filterSearch(e, 'name')}
                    />
                </div>
                <div>
                    <p>Поиск по расе</p>
                    <MyInput
                        className="short_input"
                        placeholder="Введите расу персонажа"
                        onChange={(e) => filterSearch(e, 'race')}
                    />
                </div>
                <div>
                    <p>Поиск по статусу</p>
                    <MyInput
                        className="short_input"
                        placeholder="Выберете статус персонажа"
                        onChange={(e) => filterSearch(e, 'status')}
                    />
                </div>
                <div className="filter_types">
                    <p>Вид:</p>
                    <div>
                        <img src={isHamburger
                            ? redHamburger
                            : hamburger}
                             className="hamburger"
                             onClick={() => setIsHamburger(true)
                             }/>
                        <img src={isHamburger
                            ? tiles
                            : redTiles}
                             className="tiles"
                             onClick={() => setIsHamburger(false)}
                        />
                    </div>

                </div>
            </section>
            <section className="container main_characters">
                {characters.map((item, id) => {
                    return (
                        isHamburger
                            ? <LongCharacterPanel key={id} character={item}/>
                            : <ShortCharacterPanel key={id} character={item}/>

                    )
                })}
            </section>
            <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
        </div>
    );
};

export default MainCharacters;