import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { NewProject } from '../components/NewProject';
import { ProjectList } from '../components/ProjectList';
import useProjects from '../hooks/useProjects';
import { AuthContext } from '../context/AuthContext';

export const HomePage = () => {
    const { projects, loading, error, addProject } = useProjects();
    const { user } = useContext(AuthContext);
    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            {user ? <NewProject addProject={addProject} /> : null}

            <h1>Latest Projects </h1>
            <ProjectList projects={projects} />
        </section>
    );
};
