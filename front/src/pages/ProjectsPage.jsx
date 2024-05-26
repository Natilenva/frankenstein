import { ErrorMessage } from '../components/ErrorMessage';
import { ProjectList } from '../components/ProjectList';
import useProjects from '../hooks/useProjects';

export const ProjectsPage = () => {
    
    const { projects, loading, error, removeProject } = useProjects();

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section className=" m-auto flex flex-col min-h-screen">
            {/* <h1 className="text-3xl font-bold ">Latest Projects </h1> */}
            <ProjectList projects={projects} removeProject={removeProject} />
        </section>
    );
};
