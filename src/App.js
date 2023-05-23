import { BrowserRouter, Routes,Route,Link } from 'react-router-dom';
import ListarCategoria from './components/ListarCategoria';
import EditarCategoria from './components/EditarCategoria';
import './App.css';

function App() {
  return (
    <div className="App">
      <h5>
        React CRUD Listar desde API PHP 
      </h5>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
               <Link to="/" >Listar Categorias </Link> 
            </li>          
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListarCategoria />} />
          <Route path="categoria/:cat_id/editar" element={<EditarCategoria />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

