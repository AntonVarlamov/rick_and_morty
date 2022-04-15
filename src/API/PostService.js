import axios from "axios";

export default class PostService {
    static async getAll(){
        const response = await axios.get("https://rickandmortyapi.com/api/character?page=1");
        return response
    }
}