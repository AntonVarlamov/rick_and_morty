import axios from "axios";

export default class PostService {
    static async getInfo(page, search, name) {
        let filter = ""
        let response

        for (let key in search) {
            if (search[key]) {
                filter += key + "=" + search[key] + "&";
            }
        }
        let url = !filter
            ? `https://rickandmortyapi.com/api/${name}?page=` + page
            : `https://rickandmortyapi.com/api/${name}?` + filter + "page=" + page;

        await axios.get(url)
            .then((res) => {
                response =  res
            })
            .catch((e) => {
                console.log(e)
            });
        return response
    }
    static async getCharacters(arr){
        let response
        await axios.get("https://rickandmortyapi.com/api/character/" + JSON.stringify(arr))
            .then((res) => {
                response =  res
            })
            .catch((e) => {
                return null
            });
        return response
    }
}