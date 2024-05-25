import { useParams } from 'react-router-dom';
import { useProjectsByprofile } from '../hooks/useProjectByProfile';
import { ProjectListProfile } from '../components/ProjectListProfile';
import { ErrorMessage } from '../components/ErrorMessage';

export const ProjectsUser = () => {
    const { id } = useParams();
    const { projectsProfile, loading, error } = useProjectsByprofile(id);
    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;
    return (
        <>
            <ProjectListProfile projectsProfile={projectsProfile} />
        </>
    );
};
