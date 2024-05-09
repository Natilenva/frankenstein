import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { deleteProjectService } from '../services';

import { toast } from 'react-hot-toast';
export const Project = ({ project, removeProject }) => {
    //console.log('project', project);

    const { user, token } = useContext(AuthContext);
    //console.log(user);
    const [error, setError] = useState('');

    const deleteProject = async (id) => {
        try {
            await deleteProjectService({ id, token });
            if (removeProject) {
                removeProject(id);
            }

            toast.success('Has eliminado el proyecto con éxito!');
        } catch (error) {
            setError(error.message);
            toast.error(error.messge);
        }
    };

    //console.log('project.photo', project.photo);

    return (
        <article>
            <h3>{project.project_title}</h3>

            {project.project_photo ? (
                <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                        project.project_photo
                    }`}
                    alt={project.project_title}
                />
            ) : (
                <p>no photo</p>
            )}

            <p>{project.project_description}</p>

            {/* // TODO el campo modified_at no lo tenemos */}
            {/* <p>{project.modified_at}</p> */}

            {/* // TODO el campo created_at tendríamos q convertirlo a fecha */}
            {/* <p>{project.created_at}</p> */}

            {/* // TODO no tenemos al autor del proyecto */}

            <p>
                {/* <p>{project.email}</p> */}
                {/* By {project.userId} on{' '} */}
                By <Link to={`/user/${project.email}`}>
                    {' '}
                    {project.email}{' '}
                </Link>{' '}
                on{' '}
                <Link to={`/project/${project.project_id}`}>
                    {new Date(project.created_at).toLocaleString()}
                </Link>
            </p>

            <section>
                {user && user.register_id === project.register_id ? (
                    <button
                        onClick={() => {
                            deleteProject(project.project_id);
                        }}
                    >
                        Eliminar proyecto
                    </button>
                ) : null}
                {error ? <p>{error}</p> : null}
            </section>
        </article>
    );
};
Project.propTypes = {
    project: PropTypes.any,
    removeProject: PropTypes.any,
    updateProject: PropTypes.any,
};
