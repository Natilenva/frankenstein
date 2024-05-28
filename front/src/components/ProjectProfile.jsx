import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { deleteProjectService } from '../services';

import { toast } from 'react-hot-toast';
export const ProjectProfile = ({ projectProfile, removeProjectProfile }) => {
    const { user, token } = useContext(AuthContext);
    console.log(projectProfile);
    console.log(user);
    const [error, setError] = useState('');

    const deleteProjectProfile = async (id) => {
        try {
            await deleteProjectService({ id, token });
            if (removeProjectProfile) {
                removeProjectProfile(id);
            }

            toast.success('Has eliminado el proyecto con éxito!');
        } catch (error) {
            setError(error.message);
            toast.error(error.messge);
        }
    };

    //const provocarError = provocarErrorBoundary;

    return (
        <>
            <article>
                <div>
                    {projectProfile.project_photo ? (
                        <img
                            loading="lazy"
                            src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                                projectProfile.project_photo
                            }`}
                            alt={projectProfile.project_title}
                            className="aspect-[0.96] w-[158px]"
                        />
                    ) : (
                        <p>no photo</p>
                    )}
                </div>
                <div className="flex flex-col p-2">
                    <div className="text-sm font-semibold leading-4 text-lime-600">
                        <Link to={`/project/${projectProfile.project_id}`}>
                            {' '}
                            <h3>{projectProfile.project_title}</h3>
                        </Link>{' '}
                    </div>

                    <p className="mt-1 text-xs font-medium leading-6 text-stone-700">
                        {projectProfile.project_description}
                    </p>

                    <p className="mt-1 text-xs font-medium leading-6 text-stone-700">
                        By{' '}
                        <Link
                            to={`/profilepublic/${projectProfile.register_id}`}
                        >
                            {' '}
                            {projectProfile.profile_username}{' '}
                        </Link>{' '}
                        on{' '}
                        {new Date(projectProfile.created_at).toLocaleString()}
                    </p>
                </div>

                <section>
                    {user && user.register_id === projectProfile.register_id ? (
                        <>
                            <button
                                className="bg-[#829821] hover:bg-[#829821] text-white px-4 py-1 rounded"
                                onClick={() => {
                                    deleteProjectProfile(
                                        projectProfile.project_id
                                    );
                                }}
                            >
                                Eliminar proyecto
                            </button>

                            <Link
                                to={`/project/${projectProfile.project_id}`}
                                className="text-black hover:text-[#829821]"
                            >
                                Editar
                            </Link>
                        </>
                    ) : null}
                    {error ? <p>{error}</p> : null}
                </section>
            </article>
        </>
    );
};
ProjectProfile.propTypes = {
    projectProfile: PropTypes.any,
    removeProjectProfile: PropTypes.any,
};
