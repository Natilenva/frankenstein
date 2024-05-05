import { useEffect, useState } from "react";
import { getSingleProjectService } from "../services";

const useProject = (id) => {
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProject = async () => {
            try {
                setLoading(true);

                const data = await getSingleProjectService(id);

                setProject(data);

            } catch (error) {
                //! error.message: para acceder al error del Service ? 
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProject();

    }, [id]);

    return { project, loading, error };
};

export default useProject;