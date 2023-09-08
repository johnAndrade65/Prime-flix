//Importação recursos necessarios do ract-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importação das páginas
import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Erro from "./pages/Erro";
import Favoritos from "./pages/Favoritos";

//Imporação dos componentes
import Header from "./components/Header";

function RoutesApp() {
     return (
          <BrowserRouter>
                <Header/>
               <Routes>
                    <Route path="/" element={ <Home/> }/>
                    <Route path="/filme/:id" element={ <Filme/> }/>
                    <Route path="/favoritos" element={ <Favoritos/> }/>
                    
                    <Route path="*" element={ <Erro/> }/>
               </Routes>
          </BrowserRouter>
     );
}

export default RoutesApp;