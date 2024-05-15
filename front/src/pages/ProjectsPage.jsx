import { ErrorMessage } from '../components/ErrorMessage';
import { ProjectList } from '../components/ProjectList';
import useProjects from '../hooks/useProjects';

export const ProjectsPage = () => {
    //useProjects es un custom hook q gestiona los projects
    const { projects, loading, error, removeProject } = useProjects();
    //console.log('projects', projects);

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1 className="text-3xl font-bold ">Latest Projects </h1>
            <ProjectList projects={projects} removeProject={removeProject} />
        </section>
    );
};
