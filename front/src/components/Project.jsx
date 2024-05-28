import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { deleteProjectService } from '../services';
import { toast } from 'react-hot-toast';

export const Project = ({ project, removeProject }) => {
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');

    const deleteProject = async (id) => {
        try {
            await deleteProjectService({ id, token });
            if (removeProject) {
                removeProject(id);
            }

            toast.success('¡Has eliminado el proyecto con éxito!');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <article className="flex flex-col md:flex-row items-start p-4 bg-white rounded-lg shadow-md">
            {/* Imagen del proyecto */}
            <div className="md:w-48 md:h-48 overflow-hidden md:mr-4">
                {project.project_photo ? (
                    <img
                        loading="lazy"
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${project.project_photo}`}
                        alt={project.project_title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img src="/apple-touch-icon.png" alt="Logo de Frankenstein" />
                )}
            </div>

            {/* CARD del proyecto */}
            <div className="flex-1">
                {/* Título del proyecto */}
                <div className="mt-1 leading-tight text-lg font-bold text-black hover:underline">
                    <Link to={`/project/${project.project_id}`}>{project.project_title}</Link>
                </div>

                {/* Descripción del proyecto */}
                <p className="mt-2 text-sm font-medium text-neutral-900">{project.project_description}</p>

                {/* Creador y fecha del proyecto */}
                <p className="mt-1 text-xs font-normal text-neutral-700">
                    Por{' '}
                    <Link to={`/profilepublic/${project.register_id}`}>
                        {project.usernameOfRegister}
                    </Link>{' '}
                    el {new Date(project.created_at).toLocaleString()}
                </p>
            </div>

            {/* Botones de editar y borrar el proyecto */}
            <div className="flex flex-col md:flex-row md:items-center md:mt-0 md:ml-auto">
                {user && user.register_id === project.register_id && (
                    <>
                        {/* Botón de eliminar proyecto */}
                        <button
                            className="bg-frankgreen hover:bg-[#829821] text-white font-myFontFamily px-4 py-1 rounded mt-4 md:mt-0 md:mr-2"
                            onClick={() => {
                                deleteProject(project.project_id);
                            }}
                        >
                            Eliminar proyecto
                        </button>

                        {/* Enlace de editar proyecto */}
                        <Link
                            to={`/project/${project.project_id}`}
                            className="text-black hover:text-[#829821] mt-2 md:mt-0 md:mr-2"
                        >
                            Editar
                        </Link>
                    </>
                )}
                {error && <p className="text-red-500 mt-2 md:mt-0">{error}</p>}
            </div>
        </article>
    );
};

Project.propTypes = {
    project: PropTypes.object.isRequired,
    removeProject: PropTypes.func,
};

export default Project;
