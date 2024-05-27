import { ErrorMessage } from '../components/ErrorMessage';
//import { ProjectList } from '../components/ProjectList';
import useProjects from '../hooks/useProjects';
import useQuestions from '../hooks/QuestionsHook/useQuestions.js';
import QuestionListItem from './../components/QuestionsComponents/QuestionListItem';
import Loading from './../components/loading';
//import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from '@ant-design/react-slick';

import { ProjectPost } from '../components/ProjectPost.jsx';

export const HomePage = () => {
    const { projects, loading, error, removeProject } = useProjects();
    const { questions } = useQuestions();

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    {
        /* Slider config test ok */
    }
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <main className="flex-grow flex flex-col bg-white">
            <Slider {...settings}>
                {projects.map((project) => {
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
            </Slider>

            {/* //! QUESTIONS ok?------------------------------------------------------------------------- */}
            <section className="flex flex-1 place-content-around items-center ">
                {questions.length < 1 && loading ? (
                    <Loading />
                ) : questions.length === 0 ? (
                    <li>No se han encontrado preguntas</li>
                ) : (
                    questions.map((question) => {
                        return (
                            <QuestionListItem
                                key={question.question_id}
                                question={question}
                            />
                        );
                    })
                )}
            </section>
        </main>
    );
};
