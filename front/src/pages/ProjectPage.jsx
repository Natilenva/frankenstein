import { ErrorMessage } from '../components/ErrorMessage';
import { useParams } from 'react-router-dom';
import useProject from "../hooks/useProject";
import { Project } from '../components/Project';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { UpdateProject } from '../components/UpdateProject';

export const ProjectPage = () => {
    const { id } = useParams();
    const { project, loading, error, updateProject} = useProject(id);

    const { user } = useContext(AuthContext);

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1 className="text-2xl font-bold ">ProjectPage</h1>
            {user && user.register_id === project.register_id ? (
                //<p> formulario update project </p>
                <UpdateProject updateProject={updateProject} />

            ) : (  
                <Project project={project} /> 
            )}
        </section>
      )
};
