import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 

export default function EditarCategoria()
{
    const navigate = useNavigate();

    const { cat_id } = useParams();

    const [inputs, setInputs] = useState([]);
    //estado para traer la información
    useEffect(() => {
        console.log("Dato id ",cat_id);
        getCategoriaxId();
    }, []);

    function getCategoriaxId()
    {
        console.log("Datos para Editar");
        const json_get = JSON.stringify({ "cat_id" : Number(cat_id) });
        console.log(json_get);            
        try {
            axios.post('http://localhost/api_php/controller/Categoria_Controller.php?op=GetxId',json_get).then(function(response){
                
                console.log("Lectura de Datos");
                console.log(response.data);
                setInputs(response.data[0]);
            });
        }
        catch(err)
        {
            console.log("Error :", err);
        }
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
        axios.post('http://localhost/api_php/controller/Categoria_Controller.php?op=Update',inputs)
        .then(function(response){        
            console.log(response.data);
        });  
        console.log(inputs);    
    }
    return(
        <div>
            <h1>Editar Categorias</h1>
            <form>
             
                <table cellPadding="10">
                <tbody>
                <tr>
                     <th>
                        <label>Categoria ID: </label>
                     </th>
                     <td>
                        <input value={inputs.cat_id} type="text" name="cat_id" readOnly onChange={handleChange}  />
                     </td>
                </tr>     
                <tr>
                     <th>
                        <label>Categoria: </label>
                     </th>
                     <td>
                        <input value={inputs.cat_nom} type="text" name="cat_nom" onChange={handleChange}  />
                     </td>
                </tr>      
                <tr>
                  <th>
                    <label>Observacion:</label>
                  </th>
                <td>
                    <input value={inputs.cat_obs} type="text" name="cat_obs" onChange={handleChange}  />
                </td>
                </tr>  
                <tr>
                    
                        <td>
                            <button onClick={handleSubmit}>Actualizar</button>
                        </td>                    
                </tr>        
                </tbody>
                </table>
            </form>
        </div>
    )
}