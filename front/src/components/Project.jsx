import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
//import { deleteProjectService } from '../services';
//import { modifyProjectService } from '../services';

export const Project = ({ project, removeProject, updateProject }) => {
    console.log('project', project);

    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    /* const deleteProject = async (id) => {
        try {
            await deleteProjectService({ id, token });
            if (removeProject) {
                removeProject(id);
            } else {
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }; */

    /* const modifidyProject = async (id) => {
        try {
            await modifyProjectService({ id, token });
            if (updateProject) {
                updateProject(id);
            } else {
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }; */

    /* const {
        project_title,
        project_description,
        project_photo,
        register_id,
        created_at,
        project_id,
    } = project; */
    
    console.log('project.phot', project.photo);

    return (
        <article>
            <h3>{project.project_title}</h3>

            {/* // TODO tengo la imagen pero no la puedo mostrar: -------------- */}
            {/* <img src={project.project_photo} alt={project.project_title} /> */}
            {/* {project.project_photo ? (
                <img src={(`${import.meta.env.VITE_BASE_URL}`)} />
            ) : null } */}

            {project.project_photo
             ? 
                <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${project.project_photo}`}
                    alt={project.project_title}
                />
             : 
                <p>no photo</p> 
            }

            <p>{project.project_description}</p>

            {/* // TODO el campo modified_at no lo tenemos */}
            {/* <p>{project.modified_at}</p> */}

            {/* // TODO el campo created_at tendríamos q convertirlo a fecha */}
            {/* <p>{project.created_at}</p> */}

            {/* // TODO no tenemos al autor del proyecto */}

            <p>
                {/* <p>{project.email}</p> */}
                {/* By {project.userId} on{' '} */}
                By <Link  to={`/user/${project.email}`}> {project.email} </Link> on{" "}

                <Link to={`/project/${project.project_id}`}>
                    {new Date(project.created_at).toLocaleString()}
                </Link>
            </p>

            {/* <section>
                {user && user.id === project.register_id ? (
                    <button
                        onClick={() => {
                            if (
                                window.confirm('¿Quieres eliminar el proyecto?')
                            )
                                deleteProject(project.id);
                        }}
                    >
                        Eliminar proyecto
                    </button>
                ) : null}
                {error ? <p>{error}</p> : null}
            </section> */}

            {/* <section>
                {user && user.id === project.register_id ? (
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    '¿Quieres modificar el proyecto?'
                                )
                            )
                                modifidyProject(project.id);
                        }}
                    >
                        Modificar proyecto
                    </button>
                ) : null}
                {error ? <p>{error}</p> : null}
            </section> */}

        </article>
    );
};
Project.propTypes = {
    project: PropTypes.any,
    removeProject: PropTypes.any,
    updateProject: PropTypes.any,
};
