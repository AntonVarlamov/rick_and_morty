import React, {useEffect, useMemo, useState} from 'react';
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
import {getNumberEpisodes} from "../utils/calculations";
import LongCharacterPanel from "../components/UI/InfoPanel/LongCharacterPanel";
import {debounce} from "../utils/debounce";

const MainCharacters = () => {
    const [isHamburger, setIsHamburger] = useState(true)
    const [search, setSearch] = useState({
        name: "",
        species: "",
        status: ""
    });
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    async function fetchCharacters() {
        const response = await PostService.getInfo(page, search, 'character');
        setTotalPages((response?.data.info.pages ?? 1))
        setCharacters([...(response?.data.results ?? [])])
        if(!response?.data.results.length){
            setPage(1)
        }
    }

    useEffect(() => {
        fetchCharacters()
    }, [search, page])

    function filterSearch(e, name) {
        if (e.target.value === search[name]) {
            return
        }
        let copy = {...search};
        copy[name] = e.target.value
        setSearch({...copy})
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
                        onChange={debounce((e) => filterSearch(e, 'name'), 500)}
                        type="text"
                    />
                </div>
                <div>
                    <p>Поиск по расе</p>
                    <MyInput
                        className="short_input"
                        placeholder="Введите расу персонажа"
                        onChange={debounce((e) => filterSearch(e, 'species'), 500)}
                        type="text"
                    />
                </div>
                <div>
                    <p>Поиск по статусу</p>
                    <MyInput
                        className="short_input"
                        placeholder="Выберете статус персонажа"
                        onChange={debounce((e) => filterSearch(e, 'status'), 500)}
                        type="text"
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
                {!characters.length
                    && <p className="not_found container">Таких персонажей пока не существует</p>
                }
                {characters.map((item, id) => {
                    return (
                        isHamburger
                            ? <LongCharacterPanel key={id} character={item} page={page}/>
                            : <ShortCharacterPanel key={id} character={item} page={page}/>

                    )
                })}
            </section>
            {!!characters.length
                && <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            }
        </div>
    );
};

export default MainCharacters;