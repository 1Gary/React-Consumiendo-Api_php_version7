import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

export default function ListarCategoria()
{
    const [inputs, setInputs] = useState([]);
    const [categorias, setCategorias] = useState([]);
 
    //estado para traer la información
    useEffect(() =>{
        getCategorias();
    },[]);

    function getCategorias()
    {
        axios.get('http://localhost/api_php/controller/Categoria_Controller.php?op=GetAll')
        .then(function(response){
            console.log(response.data);
            setCategorias(response.data);
        });
        
    }
    const handleChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values =>({...values, [name]: value}));        
    }
    
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        
        axios.post('http://localhost/api_php/controller/Categoria_Controller.php?op=Insert',inputs)
        .then(function(response){        
            console.log(response.data);
            getCategorias();
        });  
        console.log(inputs);    
    }
    //ggaaaaaaa
    

    const EliminarCat = (cat_id) =>{
        console.log(cat_id);    
        const id = JSON.stringify({ cat_id: cat_id });
        axios.post('http://localhost/api_php/controller/Categoria_Controller.php?op=Delete',id)
        .then(function(response){        
            console.log(response.data);
        });  
    }

    


    return(
        <div>
            <h1>Listar Categorias</h1>
            <form>
             
                <table cellPadding="10">
                <tbody>
                <tr>
                     <th>
                        <label>Categoria ID: </label>
                     </th>
                     <td>
                        <input type="text" name="cat_id" readOnly onChange={handleChange} value={inputs.cat_id} />
                     </td>
                </tr>     
                <tr>
                     <th>
                        <label>Categoria: </label>
                     </th>
                     <td>
                        <input type="text" name="cat_nom" onChange={handleChange} value={inputs.cat_nom} />
                     </td>
                </tr>      
                <tr>
                  <th>
                    <label>Observacion:</label>
                  </th>
                <td>
                    <input type="text" name="cat_obs" onChange={handleChange} value={inputs.cat_obs} />
                </td>
                </tr>  
                <tr>
                    
                        <td>
                            <button onClick={handleSubmit}>Guardar</button>
                        </td>                    
                </tr>        
                </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Id Categoria</th>
                            <th>Categoria</th>
                            <th>Observacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        { categorias.map((cat,key) =>
                            <tr key={key}>
                                <td>{cat.cat_id}</td>
                                <td>{cat.cat_nom}</td>
                                <td>{cat.cat_obs}</td>
                                <td>       
                                    <Link to={ `categoria/${cat.cat_id}/editar` }>Editar</Link>                           
                                    <button onClick={()=> EliminarCat(cat.cat_id)}>Eliminar</button>
                                </td>
                            </tr>
                          ) 
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}