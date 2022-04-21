import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../components/UI/NavBar/NavBar";
import Heading from "../components/UI/Heading/Heading";
import PostService from "../API/PostService";
import {AuthContext} from "../context/context";
import {getTotalPages} from "../utils/calculations";
import Pagination from "../components/UI/Pagination/Pagination";
import ShortCharacterPanel from "../components/UI/InfoPanel/ShortCharacterPanel";
import LocationPanel from "../components/UI/InfoPanel/LocationPanel";
import EpisodePanel from "../components/UI/InfoPanel/EpisodePanel";
import {nanoid} from "nanoid";

const Favourites = () => {
    const {currentUser} = useContext(AuthContext)
    const [chosen, setChosen] = useState("Characters")
    const favourite = {
        Characters: "персонажей",
        Locations: "локаций",
        Episodes: "эпизодов",
    }
    const [favourites, setFavourites] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    async function fetchFavourites() {
        const arrFavourites = Object.keys(currentUser[`favourite${chosen}`] ?? {}).map(item => +item)
        const response = await PostService.getFavourites(arrFavourites, chosen, setIsLoading);
        console.log(response)
        setTotalPages(getTotalPages(response?.data ?? []))
        setFavourites([...(response?.data ?? [])])
    }

    useEffect(() => {
        fetchFavourites()
        setIsLoading(false)
    }, [chosen])

    return (
        <div>
            <NavBar/>
            <Heading>Избранное</Heading>
            <section className="container favourites_img">
                <div onClick={() => {
                    setIsLoading(true)
                    setChosen("Locations")
                }}
                     className={"favourite_location " + (chosen === "Locations" ? "chosen_favourite" : "normal_favourite")}
                ><p>Локации</p></div>
                <div
                    onClick={() => {
                        setIsLoading(true)
                        setChosen("Characters")
                    }}
                    className={"favourite_character " + (chosen === "Characters" ? "chosen_favourite" : "normal_favourite")}
                ><p>Персонажи</p></div>
                <div
                    onClick={() => {
                        setIsLoading(true)
                        setChosen("Episodes")
                    }}
                    className={"favourite_episode " + (chosen === "Episodes" ? "chosen_favourite" : "normal_favourite")}
                ><p>Эпизоды</p></div>
            </section>
            <section className={"container " + (chosen === "Episodes" ? "long_favourite" : "short_favourite")}>
                {!isLoading &&
                    favourites.slice((page - 1) * 20, page * 20).map((item, index) => {
                        if (chosen === "Characters") {
                            return (<ShortCharacterPanel key={nanoid() + Math.random()}
                                                         character={item}
                                                         canDelete={true}
                                                         favourites={favourites}
                                                         setFavourites={setFavourites}
                                                         index={index}
                            />)
                        }
                        if (chosen === "Locations") {
                            return (<LocationPanel key={nanoid() + Math.random()}
                                                   location={item}
                                                   canDelete={true}
                                                   favourites={favourites}
                                                   setFavourites={setFavourites}
                                                   index={index}
                            />)
                        }
                        if (chosen === "Episodes") {
                            return (<EpisodePanel key={nanoid() + Math.random()}
                                                  episode={item}
                                                  canDelete={true}
                                                  favourites={favourites}
                                                  setFavourites={setFavourites}
                                                  index={index}
                            />)
                        }
                        return <div>Ошибка</div>
                    })
                }
                {!favourites.length
                    && <p className="not_found container">{`У вас пока нет избранных ${favourite[chosen]}`}</p>
                }
            </section>
            {!!favourites.length && totalPages > 1
                && <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            }
        </div>
    );
};

export default Favourites;