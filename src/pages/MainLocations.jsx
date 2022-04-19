import React, {useEffect, useState} from 'react';
import NavBar from "../components/UI/NavBar/NavBar";
import Heading from "../components/UI/Heading/Heading";
import PostService from "../API/PostService";
import MyInput from "../components/UI/MyInput/MyInput";
import {debounce} from "../components/utils/debounce";
import Pagination from "../components/UI/Pagination/Pagination";
import LocationPanel from "../components/UI/InfoPanel/LocationPanel";


const MainLocations = () => {
    const [search, setSearch] = useState({
        name: "",
        species: "",
        status: ""
    });
    const [locations, setLocations] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    async function fetchLocations() {
        const response = await PostService.getInfo(page, search, "location");
        setTotalPages((response?.data.info.pages ?? []))
        setLocations([...(response?.data.results ?? [])])

    }

    useEffect(() => {
        fetchLocations()
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
            <Heading>Локации</Heading>
            <section className="container filter_main_locations">
                <div>
                    <p>Поиск по названию</p>
                    <MyInput
                        className="long_input"
                        placeholder="Введите название локации"
                        onChange={debounce((e) => filterSearch(e, 'name'), 500)}
                        type="text"
                    />
                </div>
                <div>
                    <p>Поиск по типу</p>
                    <MyInput
                        className="long_input"
                        placeholder="Введите тип локации"
                        onChange={debounce((e) => filterSearch(e, 'type'), 500)}
                        type="text"
                    />
                </div>
                <div>
                    <p>Поиск по измерению</p>
                    <MyInput
                        className="long_input"
                        placeholder="Введите измерение"
                        onChange={debounce((e) => filterSearch(e, 'dimension'), 500)}
                        type="text"
                    />
                </div>
            </section>
            <section className="container main_locations">
                {!locations.length
                    && <p className="not_found container">Таких локаций пока не существует</p>
                }
                {locations.map((item, id) => {
                    return (
                        <LocationPanel key={id} location={item}/>
                    )
                })}
            </section>
            {!!locations.length
                && <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            }
        </div>
    );
};

export default MainLocations;