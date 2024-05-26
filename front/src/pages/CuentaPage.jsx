import { useProfile } from '../hooks/profilehook/useProfile';

import { useNavigate, useParams } from 'react-router-dom';

import { Profile } from '../components/ProfileComponents/Profile';
import { useProjectsByprofile } from '../hooks/useProjectByProfile';

import { ProjectListProfile } from '../components/ProjectListProfile';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useQuestionsProfile } from '../hooks/QuestionsHook/useQuestionsProfile';
import { QuestionsListProfile } from '../components/QuestionsComponents/QuestionsListProfile';

export const CuentaPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { loading, error, profile } = useProfile(user.register_id);
    const { projectsProfile, removeProjectProfile } = useProjectsByprofile(
        user.register_id
    );
    const { questionsProfile } = useQuestionsProfile(id);

    if (loading) return <p>cargando perfil...</p>;
    if (error) return navigate('/newprofile');
    return (
        <>
            <h1>Mi cuenta</h1>

            <Profile profile={profile} />
            <ProjectListProfile
                projectsProfile={projectsProfile}
                removeProjectProfile={removeProjectProfile}
            />
            <QuestionsListProfile questionsProfile={questionsProfile} />
        </>
    );
};
