import RoutesApp from "./routes";
import { ToastContainer } from "react-toastify";

//Importação do react-toastify 
import 'react-toastify/dist/ReactToastify.css';

//Componente "App"
function App() {
     return (
          <div className="App">
               <ToastContainer autoClose={3000}/>
               <RoutesApp />
          </div>
     );
}

export default App;
