import React, {useEffect, useState} from 'react';
import NavBar from "../components/UI/NavBar/NavBar";
import Heading from "../components/UI/Heading/Heading";
import PostService from "../API/PostService";
import MyInput from "../components/UI/MyInput/MyInput";
import {debounce} from "../components/utils/debounce";
import Pagination from "../components/UI/Pagination/Pagination";
import EpisodePanel from "../components/UI/InfoPanel/EpisodePanel";


const MainEpisodes = () => {
    const [search, setSearch] = useState({
        name: "",
        species: "",
        status: ""
    });
    const [episodes, setEpisodes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    async function fetchEpisodes() {
        const response = await PostService.getInfo(page, search, 'episode');
        setTotalPages((response?.data.info.pages ?? []))
        setEpisodes([...(response?.data.results ?? [])])
    }

    useEffect(() => {
        fetchEpisodes()
    }, [search, page])

    function filterSearch(e, name) {
        if (e.target.value === search[name]) {
            return
        }
        let copy = {...search};
        copy[name] = e.target.value
        setSearch(copy)
    }

    return (
        <div>
            <NavBar/>
            <Heading>Эпизоды</Heading>
            <section className="container filter_main_characters">
                <div>
                    <p>Поиск по названию</p>
                    <MyInput
                        className="long_input"
                        placeholder="Введите название серии"
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
            </section>
            <section className="container main_episodes">
                {!episodes.length
                    && <p className="not_found container">Таких эпизодов' пока не существует</p>
                }
                {episodes.map((item, id) => {
                    return (
                        <EpisodePanel key={id} episode={item}/>
                    )
                })}
            </section>
            {!!episodes.length
                && <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            }
        </div>
    );
};

export default MainEpisodes;