import { ErrorMessage } from '../components/ErrorMessage';
import { Link, useParams } from 'react-router-dom';
import useProject from '../hooks/useProject';
// import { Project } from '../components/Project';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// import { UpdateProject } from '../components/UpdateProject';
// import { ProjectPost } from '../components/ProjectPost';

export const ProjectPage = () => {
    const { id } = useParams();
    const { project, loading, error, updateProject, removeProject } =
        useProject(id);

    const { user } = useContext(AuthContext);

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section className="flex-grow md:h-full">
            {/* {user && user.register_id === project.register_id ? (
                //<p> formulario update project </p>
                <UpdateProject
                    updateProject={updateProject}
                    removeProject={removeProject}
                />
            ) : (
                <Project project={project} />
            )} */}
            {/* <ProjectPost project={project} /> */}
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
                    {/*    <Link to={`/project/${project.project_id}`}> */}
                    {/* //^ Title del proyecto ------------------------------------ */}
                    <h1 className="block mt-1 leading-tight !text-lg !font-bold text-black">
                        {project.project_title}
                    </h1>

                    {/* //^ Description del proyecto ------------------------------ */}
                    <p className="mt-1 !text-sm !font-medium text-neutral-900">
                        {project.project_description}{' '}
                        {/* Limitar a 100 caracteres */}
                        {/* NO USAR el truncateTextPalabras pq puede hacer q la Card se estire o acorte*/}
                        {/* {truncateTextPalabras(project.project_description, 20)} {/* Limitar a 20 palabras */}
                    </p>
                    {/*    </Link> */}

                    {/* //^ Creador y fecha del proyecto --------------------------- */}
                    <p className="mt-1 !text-xs !font-normal  text-neutral-700">
                        Autor
                        <Link to={`/profilepublic/${project.register_id}`}>
                            {' '}
                            {project.usernameOfRegister}{' '}
                        </Link>{' '}
                        el {new Date(project.created_at).toLocaleDateString()}
                    </p>

                    {/* //^ Botón de editar y borrar el proyecto? ------------------ */}
                    {console.log(project.project_id)}
                    {user && user.register_id === project.register_id ? (
                        <Link
                            to={`/updateproject/${project.project_id.id}`}
                            // state={{ project, updateProject }}
                            className="mt-1 !text-xs text-neutral-500"
                        >
                            Editar
                        </Link>
                    ) : (
                        <Link
                            to={`/updateproject/${project.project_id.id}`}
                            // state={{ project, updateProject }}
                            className="invisible mt-1 !text-xs text-stone-500"
                        >
                            Editar
                        </Link>
                    )}
                    {error ? <p>{error}</p> : null}
                </div>
            </article>
        </section>
    );
};
