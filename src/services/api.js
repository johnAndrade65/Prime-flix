//Base da URL: https://api.themoviedb.org/3/
//URL da API: movie/550?api_key=70bb445aa288b78018a03f5e827a8909&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

export default api;