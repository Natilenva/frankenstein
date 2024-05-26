import { useEffect, useState } from 'react';
import { getQuestionsByProfileService } from '../../services/questionService';

export const useQuestionsProfile = (id) => {
    const [questionsProfile, setQuestionsProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                setLoading(true);

                const data = await getQuestionsByProfileService(id);
                console.log('data', data);

                setQuestionsProfile(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, [id]);

    // const addProject = (project) => {
    //     setProjects([project, ...projects]);
    // };
    // const removeProjectProfile = (project_id) => {
    //     setProjectsProfile(
    //         projectsProfile.filter(
    //             (projectProfile) => projectProfile.project_id !== project_id
    //         )
    //     );
    // };

    return { questionsProfile, loading, error };
};
