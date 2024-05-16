import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useProjects from "../hooks/useProjects";
import { NewProject2 } from "../components/NewProject2";

export const Crear = () => {

    //Solo puede crear un project si esta logeado
    //info del usu cuando se logea
    const { user } = useContext(AuthContext);
    

    //useProjects es un custom hook q gestiona los projects
    const { addProject } = useProjects();

    return (
        <div>
            <h1 className="text-3xl font-bold ">Crear: </h1> 
           
            {/* {user ? <NewProject2 addProject={addProject} /> : null} */} {/* //! si user no existe no puede crear project  */}
            {user ? <NewProject2 addProject={addProject} /> : <p>Debes estar registrado para crear un project</p>} 

        </div>
    );
}
