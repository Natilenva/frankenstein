import { ErrorMessage } from '../components/ErrorMessage';
import { useParams } from 'react-router-dom';
import useProject from "../hooks/useProject";
import { Project } from '../components/Project';

export const ProjectPage = () => {
    const { id } = useParams();
    const { project, loading, error} = useProject(id);

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1>ProjectPage</h1>
            {/* <p>aquí iría un project</p>  */}
            <Project project={project} />
        </section>
      )
};
