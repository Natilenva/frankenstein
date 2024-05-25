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

    //const provocarError = provocarErrorBoundary;

    return (
        <article>
            <div>
                {project.project_photo ? (
                    <img
                        loading="lazy"
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                            project.project_photo
                        }`}
                        alt={project.project_title}
                        className="aspect-[0.96] w-[158px]"
                    />
                ) : (
                    <p>no photo</p>
                )}
            </div>
            <div className="flex flex-col p-2">
                <div className="text-sm font-semibold leading-4 text-lime-600">
                    <Link to={`/project/${project.project_id}`}>
                        {' '}
                        <h3>{project.project_title}</h3>
                    </Link>{' '}
                </div>

                <p className="mt-1 text-xs font-medium leading-6 text-stone-700">
                    {project.project_description}
                </p>

                <p className="mt-1 text-xs font-medium leading-6 text-stone-700">
                    By
                    <Link to={`/projects/${project.register_id}`}>
                        {' '}
                        {project.usernameOfRegister}{' '}
                    </Link>{' '}
                    on {new Date(project.created_at).toLocaleString()}
                </p>
            </div>

            <section>
                {user && user.register_id === project.register_id ? (
                    <>
                        {/* // Delete project en HomePage ---------------------------------- */}
                        <button
                            className="bg-[#829821] hover:bg-[#829821] text-white px-4 py-1 rounded"
                            onClick={() => {
                                deleteProject(project.project_id);
                            }}
                        >
                            Eliminar proyecto
                        </button>

                        {/* // Editar project en ProjectPage ---------------------------------- */}
                        <Link
                            to={`/project/${project.project_id}`}
                            className="text-black hover:text-[#829821]"
                        >
                            Editar
                        </Link>
                    </>
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
