import { ProjectList } from "../components/ProjectList";
import useProjects from "../hooks/useProjects";

export const HomePage = () => {
    const { projects, loading, error } = useProjects();

    if (loading) return <p>Cargando projects...</p>;
    if (error) return <p>{error}</p>;

    console.log(projects);

    return (
        <section>
            <h1>Latest Projects </h1>
            <ProjectList projects={projects} />   
        </section>
    );
};