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

            toast.success('Has eliminado el proyecto con éxito!');
        } catch (error) {
            setError(error.message);
            toast.error(error.messge);
        }
    };

    //const provocarError = provocarErrorBoundary;

    return (
        <article>
            {/* //^ Imagen del proyecto ------------------------------ */}
            <div className="md:shrink-0 ">
                {project.project_photo ? (
                    <img
                        loading="image"
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                            project.project_photo
                        }`}
                        alt={project.project_title}
                        className="h-48 w-full object-cover md:h-full md:w-48"
                    />
                ) : (
                    <img
                        src="/apple-touch-icon.png"
                        alt="Logo de frankenstein"
                    />
                )}
            </div>

            {/* //! CARD? del proyecto ---------------------------------------- */}
            <div className="p-8 pb-4">
                {/* //^ Title del proyecto ------------------------------------ */}
                <div className="block mt-1 leading-tight text-lg font-bold text-black hover:underline">
                    <Link to={`/project/${project.project_id}`}>
                        <h3>{project.project_title}</h3>
                    </Link>
                </div>

                {/* //^ Description del proyecto ------------------------------ */}
                <p className="mt-2 text-sm font-medium text-neutral-900 ">
                    {project.project_description}
                </p>

                {/* //^ Creador y fecha del proyecto --------------------------- */}
                <p className="mt-1 text-xs font-normal  text-neutral-700">
                    By
                    <Link to={`/profilepublic/${project.register_id}`}>
                        {' '}
                        {project.usernameOfRegister}{' '}
                    </Link>{' '}
                    on
                    {new Date(project.created_at).toLocaleString()}
                </p>
            </div>

            {/* //^ Botón de editar y borrar el proyecto ------------------ */}
            <section>
                {user && user.register_id === project.register_id ? (
                    <>
                        {/* // Delete project en HomePage ---------------------------------- */}
                        <button
                            className="bg-frankgreen hover:bg-[#829821] font-myFontFamily text-white px-4 py-1 rounded"
                            onClick={() => {
                                deleteProject(project.project_id);
                            }}
                        >
                            Eliminar proyecto
                        </button>

                        {/* // Editar project en ProjectPage ---------------------------------- */}
                        <Link
                            to={`/updateproject/${project.project_id}`}
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
