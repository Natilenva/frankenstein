import { useEffect, useState } from "react";
import { getAllProjectsService } from "../services";

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
        }

        loadProjects();

    }, []);

    const addProject = (project) => {
        setProjects([project, ...projects]);
    };

    return { projects, loading, error, addProject };
};

export default useProjects;