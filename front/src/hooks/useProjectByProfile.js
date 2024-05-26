import { useEffect, useState } from 'react';
import { getProjectsByProfileService } from '../services/profileServices';

export const useProjectsByprofile = (id) => {
    const [projectsProfile, setProjectsProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);

                const data = await getProjectsByProfileService(id);
                //console.log('data', data);

                setProjectsProfile(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, [id]);

    // const addProject = (project) => {
    //     setProjects([project, ...projects]);
    // };
    const removeProjectProfile = (project_id) => {
        setProjectsProfile(
            projectsProfile.filter(
                (projectProfile) => projectProfile.project_id !== project_id
            )
        );
    };

    return { projectsProfile, loading, error, removeProjectProfile };
};
