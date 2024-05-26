import { useParams } from 'react-router-dom';
import { useProjectsByprofile } from '../hooks/useProjectByProfile';
import { ProjectListProfile } from '../components/ProjectListProfile';
import { ErrorMessage } from '../components/ErrorMessage';
import { QuestionsListProfile } from '../components/QuestionsComponents/QuestionsListProfile';
import { useQuestionsProfile } from '../hooks/QuestionsHook/useQuestionsProfile';
import { useProfile } from '../hooks/profilehook/useProfile';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

export const ProfilePublic = () => {
    const { id } = useParams();
    // const { user } = useContext(AuthContext);
    const { projectsProfile, loading, error } = useProjectsByprofile(id);
    const { profile } = useProfile(id);
    const { questionsProfile } = useQuestionsProfile(id);
    if (loading) return <p>cargando perfil...</p>;
    if (error) return <ErrorMessage message={error} />;
    return (
        <>
            <h1>Nickname: {profile.profile_username}</h1>
            <h1>Rol: {profile.profile_role}</h1>
            <ProjectListProfile projectsProfile={projectsProfile} />
            <QuestionsListProfile questionsProfile={questionsProfile} />
        </>
    );
};
