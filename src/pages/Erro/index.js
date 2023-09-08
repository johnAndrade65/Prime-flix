import React from 'react';
import './erro.css';
//Link do react-router-dom
import { Link } from 'react-router-dom';

//Página error 404(Página não encontrada)
const index = () => {
  return (
    <div className='not-found'>
        <h1>404</h1>
        <h3>Página não encontrada!.</h3>
        <Link to="/">Veja todos os filmes</Link>
    </div>
  )
}

//Export do componente
export default index;