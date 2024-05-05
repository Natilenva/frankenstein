import { Link } from "react-router-dom";

export const Project = ({ project }) => {
    console.log('project_photo: ', project.project_photo);
    return (
        <article>
            <h3>{project.project_title}</h3>

            {/* // TODO tengo la imagen pero no la puedo mostrar: -------------- */}
            {/* <img src={project.project_photo} alt={project.project_title} /> */}
            {/* {project.project_photo ? (
                <img src={(`${import.meta.env.VITE_BASE_URL}`)} />
            ) : null } */}
         
            {project.project_photo ? ( 
                <img src={project.project_photo} alt={project.project_title} />
            ) : 'no photo' }


            <p>{project.project_description}</p>


            {/* // TODO el campo modified_at no lo tenemos */}
            {/* <p>{project.modified_at}</p> */} 
            
            {/* // TODO el campo created_at tendríamos q convertirlo a fecha */}
            {/* <p>{project.created_at}</p> */}

            {/* // TODO no tenemos al autor del proyecto */}

            <p>
                By {project.register_id} on{" "}
                <Link to={`/project/${project.project_id}`}> 
                    {project.created_at} 
                </Link>
            </p>
            
        </article>
    );
};