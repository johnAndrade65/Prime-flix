import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import api from "../../services/api";
import { toast } from "react-toastify";

//Componente filme-info
const Filme = () => {
     //Pega o id pelos parametros da url do site
     const { id } = useParams();
     //useState "filme" para armazenar os dados pegos na API
     const [filme, setFilme] = useState({});

     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     //dispara o useEffect para pegar os dados da API de acordo com o id do filme selecionado
     useEffect(() => {
          async function loadFilme() {
               await api
                    .get(`/movie/${id}`, {
                         params: {
                              api_key: process.env.REACT_APP_API_KEY,
                              language: "pt-BR",
                         },
                    })
                    .then((response) => {
                         setFilme(response.data);
                         setLoading(false);
                    })
                    .catch(() => {
                         console.log("Filme não encontrado!");
                         navigate("/",{ replace: true });
                    });
          }
          loadFilme();

          return () => {
               console.log("Componente foi desmontado");
          };
          //useEffect disparado sempre que houver alterações no "navigate" e no "id"
     }, [navigate, id]);

     //Function salvar filmes para adicionar os filmes salvos como favoritos no localstorage"@primeflix"
     function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        //Se o filme já estiver na lista será renderizado a mensagem "Esse filme já na lista!"
        if(hasFilme){
            toast.warning("Esse filme já na lista!");
            return;
        }

        //Salvar filme
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
     }

     //Enquanto "loading" for true será exibido "Carregando detalhes..."
     if (loading) {
          return (
               <div className="filme-info">
                    <h1>Carregando detalhes...</h1>
               </div>
          );
     }

     return (
          <div className="filme-info">
               <h1>{filme.title}</h1>
               <img
                    src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                    alt={filme.title}
               />
                <br/>
               
               <h3>Sinopse</h3>
               <span>{filme.overview}</span>

               <strong>Avaliação: {filme.vote_average} /10</strong>
               
               <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button><a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a></button>
               </div>
          </div>
     );
};

export default Filme;
