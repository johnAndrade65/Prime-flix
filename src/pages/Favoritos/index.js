import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./favoritos.css";
import { toast } from "react-toastify";

//Página favoritos
function Favoritos() {
     //useState para armazenar os filmes adicionados aos favoritos
     const [filmes, setFilmes] = useState([]);

     //useEffect para pegar os itens salvos no localStorage como favoritos
     useEffect(() => {
          const minhaLista = localStorage.getItem("@primeflix");
          setFilmes(JSON.parse(minhaLista) || []);
     }, []);

     //Function para remover/excluir algum filme especifico
     function excluirFilmes(id){
        let filtroFilmes = filmes.filter((item) => {
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso!")
     }

     //Renderização do componente
     return (
          <div className="meus-filmes">
               <h1>Meus filmes</h1>

                {filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}
               <ul>
                    {filmes.map((item) => {
                         return (
                              <li key={item.id}>
                                   <span>{item.title}</span>
                                   <div>
                                        <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                        <button onClick={() => excluirFilmes(item.id)}>Excluir</button>
                                   </div>
                              </li>
                         );
                    })}
               </ul>
          </div>
     );
}

export default Favoritos;
