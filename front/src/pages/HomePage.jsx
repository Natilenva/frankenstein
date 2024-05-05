import { ErrorMessage } from "../components/ErrorMessage";
import { ProjectList } from "../components/ProjectList";
import useProjects from "../hooks/useProjects";

export const HomePage = () => {
    const { projects, loading, error } = useProjects();

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;
    

    return (
        <section>
            <h1>Latest Projects </h1>
            <ProjectList projects={projects} />   
        </section>
    )
}