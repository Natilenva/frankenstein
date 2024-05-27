import { ErrorMessage } from '../components/ErrorMessage';
import { useParams } from 'react-router-dom';
import useProject from '../hooks/useProject';
import { Project } from '../components/Project';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { UpdateProject } from '../components/UpdateProject';

export const ProjectPage = () => {
    const { id } = useParams();
    const { project, loading, error, updateProject, removeProject } =
        useProject(id);

    const { user } = useContext(AuthContext);

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section className=" m-auto flex flex-col min-h-screen">
            {user && user.register_id === project.register_id ? (
                //<p> formulario update project </p>
                <UpdateProject
                    updateProject={updateProject}
                    removeProject={removeProject}
                />
            ) : (
                <Project project={project} />
            )}
        </section>
    );
};
