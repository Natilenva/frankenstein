import { useEffect, useState } from 'react';
import { getAllProjectsService } from '../services';

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);

                const data = await getAllProjectsService();
                //console.log('data', data);

                setProjects(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const addProject = (project) => {
        setProjects([project, ...projects]);
    };
    const removeProject = (project_id) => {
        setProjects(
            projects.filter((project) => project.project_id !== project_id)
        );
    };

    return { projects, loading, error, addProject, removeProject };
};

export default useProjects;
