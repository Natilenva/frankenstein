import { useEffect, useState } from 'react';
import { getSingleProjectService } from '../services';

const useProject = (id) => {
    //const [project, setProject] = useState([]);
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const loadProject = async () => {
            try {
                setLoading(true);

                const data = await getSingleProjectService(id);

                setProject(data);
                console.log('datos proyecto', data);
            } catch (error) {
                //! error.message: para acceder al error del Service ?
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [id]);

    const updateProject = (project) => {
        setProject(project);
    };

    const removeProject = (id) => {
        setProjects(projects.filter((project) => project.id !== id));
    };

    return { project, loading, error, updateProject, removeProject };
};

export default useProject;
