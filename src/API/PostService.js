import axios from "axios";

export default class PostService {
    static async getCharacters(page, search){
        let filter = ""
        let response

        for(let key in search){
            if(search[key]){
                filter += key + "=" + search[key] + "&";
            }
        }
        if(!filter){
            response = await axios.get("https://rickandmortyapi.com/api/character?page=" + page);
        } else {
            response = await axios.get("https://rickandmortyapi.com/api/character?" + filter + "page=" + page);

        }
        return response
    }

}