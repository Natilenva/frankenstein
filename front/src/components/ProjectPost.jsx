import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
//import { toast } from 'react-hot-toast';
export const ProjectPost = ({ project, updateProject }) => {
    const { user } = useContext(AuthContext);
    const [error] = useState('');

    {
        /* NO USAR truncateTextPalabras pq puede hacer q la Card se vea más corta o más larga en comparación a otras Card */
    }

    // Función para limitar el número de palabras y añadir puntos suspensivos
    /* const truncateTextPalabras = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    }; */

    // Función para limitar el número de caracteres y añadir puntos suspensivos
    const truncateTextCaracteres = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + '...';
        }
        return text;
    };

    //const provocarError = provocarErrorBoundary;

    return (
        <article className="flex flex-col bg-white h-full">
            {/* //^ Imagen del proyecto ------------------------------ */}
            <div className="flex-grow relative h-64">
                {project.project_photo ? (
                    <img
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                            project.project_photo
                        }`}
                        alt={project.project_title}
                    ></img>
                ) : (
                    /* //! Imagen por defecto ? */
                    <img
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        src="/apple-touch-icon.png"
                        alt="Logo de frankenstein"
                    />
                )}
            </div>

            {/* Información del proyecto ----------------------------------------------------------*/}
            <div className="p-8 pb-4">
                <Link to={`/project/${project.project_id}`}>
                    {/* //^ Title del proyecto ------------------------------------ */}
                    <h1 className="block mt-1 leading-tight !text-lg !font-bold text-black hover:underline">
                        {project.project_title}
                    </h1>

                    {/* //^ Description del proyecto ------------------------------ */}
                    <p className="mt-1 !text-sm !font-medium text-neutral-900">
                        {truncateTextCaracteres(
                            project.project_description,
                            89
                        )}{' '}
                        {/* Limitar a 100 caracteres */}
                        {/* NO USAR el truncateTextPalabras pq puede hacer q la Card se estire o acorte*/}
                        {/* {truncateTextPalabras(project.project_description, 20)} {/* Limitar a 20 palabras */}
                    </p>
                </Link>

                {/* //^ Creador y fecha del proyecto --------------------------- */}
                <p className="mt-1 !text-xs !font-normal  text-neutral-700 ">
                    Autor
                    <Link
                        to={`/profilepublic/${project.register_id}`}
                        className="hover:text-frankgreen"
                    >
                        {' '}
                        {project.usernameOfRegister}{' '}
                    </Link>{' '}
                    el {new Date(project.created_at).toLocaleDateString()}
                </p>

                {/* //^ Botón de editar y borrar el proyecto? ------------------ */}

                {user && user.register_id === project.register_id ? (
                    <Link
                        to={`/updateproject/${project.project_id}`}
                        className="mt-1 !text-xs text-neutral-500 hover:text-frankgreen"
                    >
                        Editar
                    </Link>
                ) : (
                    <Link
                        to={`/updateproject/${project.project_id}}`}
                        // state={{ project, updateProject }}
                        className="invisible mt-1 !text-xs text-stone-500"
                    >
                        Editar
                    </Link>
                )}
                {error ? <p>{error}</p> : null}
            </div>
        </article>
    );
};
ProjectPost.propTypes = {
    project: PropTypes.any,
    removeProject: PropTypes.any,
    updateProject: PropTypes.any,
};
