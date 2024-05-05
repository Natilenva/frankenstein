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

                setProjects(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();

    }, []);

    return { projects, loading, error };
};

export default useProjects;