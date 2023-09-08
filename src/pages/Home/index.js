import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom';

//Import do estilização(css3) do componente
import './home.css';

const Home = () => {
    //useStates "filmes" e "loading"
     const [filmes, setFilmes] = useState([]);
     const [loading, setLoading] = useState(true);
 
     //dispara o useEffect para acessar o dados capturados na API
     useEffect(() => {
        //Function para carregar os filmes
        async function loadFilmes(){

            const response = await api.get("movie/now_playing", {
                params:{
                  api_key: process.env.REACT_APP_API_KEY,
                  language: "pt-BR",
                  page: 1
                }
            })
            //O useState "Filmes" irá receber o valor de "response" que irá armazenar os dados da webapi, serão pegos apenas os primeiros 15 elementos
            setFilmes(response.data.results.slice(0, 15));
            //Quando os dados dá API forem pegos "loading" será definido com false para parar de exibir a mensagem "Carregando filmes.."
            setLoading(false);
        }
        loadFilmes();
     }, []);

     //Enquanto o useState "loading" for true irá renderizar a mensagem "carregando filmes.."
     if(loading){
        return(
            <div className="loading">
                <h2>carregando filmes...</h2>
            </div>
        )
     }

     //Renderização do componente "Home"
     return (
          <div>
               <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
               </div>
          </div>
     );
};

export default Home;
