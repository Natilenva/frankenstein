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
            <div className="flex flex-col flex-1 rounded-md border border-solid border-black border-opacity-10">
                <div className="flex justify-center items-center bg-black bg-opacity-10 h-[162px] w-[162px]">
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
                        <h3>{project.project_title}</h3>
                    </div>

                    <p className="mt-1 text-xs font-medium leading-6 text-stone-700">
                        {project.project_description}
                    </p>

                    {/* // TODO el campo modified_at no lo tenemos */}
                    {/* <p>{project.modified_at}</p> */}

                    {/* // TODO el campo created_at tendríamos q convertirlo a fecha */}
                    {/* <p>{project.created_at}</p> */}

                    {/* // TODO no tenemos al autor del proyecto */}

                    <p className="mt-1 text-xs font-medium leading-6 text-stone-700">
                        {/* <p>{project.email}</p> */}
                        {/* By {project.userId} on{' '} */}
                        By
                        <Link to={`/user/${project.email}`}>
                            {' '}
                            {project.email}{' '}
                        </Link>{' '}
                        on{' '}
                        <Link to={`/project/${project.project_id}`}>
                            {new Date(project.created_at).toLocaleString()}
                        </Link>
                    </p>
                </div>

                <section>
                    {user && user.register_id === project.register_id ? (
                        <button
                        className='bg-orange-500 hover:bg-red-700 text-white px-4 py-1 rounded'
                            onClick={() => {
                                deleteProject(project.project_id);
                            }}
                        >
                            Eliminar proyecto
                        </button>
                    ) : null}
                    {error ? <p>{error}</p> : null}
                </section>
            </div>
        </article>
    );
};
Project.propTypes = {
    project: PropTypes.any,
    removeProject: PropTypes.any,
    updateProject: PropTypes.any,
};
