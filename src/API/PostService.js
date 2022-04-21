import axios from "axios";

export default class PostService {
    static async getInfo(page, search, type) {
        let filter = ""
        let response

        for (let key in search) {
            if (search[key]) {
                filter += key + "=" + search[key] + "&";
            }
        }
        let url = !filter
            ? `https://rickandmortyapi.com/api/${type}?page=` + page
            : `https://rickandmortyapi.com/api/${type}?` + filter + "page=" + page;

        await axios.get(url)
            .then((res) => {
                response = res
            })
            .catch((e) => {
                console.log(e)
            });
        return response
    }

    static async getCharacters(arr) {
        let response
        await axios.get("https://rickandmortyapi.com/api/character/" + JSON.stringify(arr))
            .then((res) => {
                response = res
            })
            .catch((e) => {
                return null
            });
        return response
    }

    static async getFavourites(arrFavourites, type) {
        type = type[0].toLowerCase() + type.slice(1, -1);
        let response
        await axios.get(`https://rickandmortyapi.com/api/${type}/` + JSON.stringify(arrFavourites))
            .then((res) => {
                response = res
            })
            .catch((e) => {
                console.log(e)
            });
        return response
    }
}