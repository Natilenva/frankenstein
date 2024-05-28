import { useProfile } from '../hooks/profilehook/useProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { Profile } from '../components/ProfileComponents/Profile';
import { useProjectsByprofile } from '../hooks/useProjectByProfile';
import { ProjectListProfile } from '../components/ProjectListProfile';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useQuestionsProfile } from '../hooks/QuestionsHook/useQuestionsProfile';
import { QuestionsListProfile } from '../components/QuestionsComponents/QuestionsListProfile';
import { ProjectPost } from '../components/ProjectPost';
import useProjects from '../hooks/useProjects';

export const CuentaPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { projects, loading, error, removeProject } = useProjects();
    const { /* loading, error, */ profile } = useProfile(user.register_id);
    /* const { projectsProfile, removeProjectProfile } = useProjectsByprofile(
        user.register_id
    ); */
    /* const { questionsProfile } = useQuestionsProfile(id); */

    /* if (loading) return <p>cargando perfil...</p>;
    if (error) return navigate('/newprofile'); */
    return (
        <>
            {/* <p>{user.register_id}</p> */}
            <Profile profile={profile} />
            {/* <ProjectListProfile projectsProfile={projectsProfile} />
            <QuestionsListProfile questionsProfile={questionsProfile} /> */}
            {/* <ProjectPost /> */}
            {/*  const userProjects = projects.filter(project => project.register_id === user.register_id); */}
            {projects
                .filter((project) => project.register_id === user.register_id)
                .map((project) => {
                    return (
                        <li
                            key={project.project_id}
                            className=" list-none max-w-md mx-auto  shadow-md overflow-hidden md:max-w-2xl"
                        >
                            <ProjectPost
                                project={project}
                                removeProject={removeProject}
                            />
                        </li>
                    );
                })}
        </>
    );
};
