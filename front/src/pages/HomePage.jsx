import { ErrorMessage } from '../components/ErrorMessage';
import useProjects from '../hooks/useProjects';
import useQuestions from '../hooks/QuestionsHook/useQuestions.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from '@ant-design/react-slick';
import { ProjectPost } from '../components/ProjectPost.jsx';
import { QuestionCard } from '../components/QuestionsComponents/QuestionCard.jsx';

export const HomePage = () => {
    const { projects, loading, error, removeProject } = useProjects();
    const { questions } = useQuestions();

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    {/* Slider config test ok */}
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <main className="flex-grow flex flex-col bg-neutral-950">
            <Slider {...settings}  className='flex flex-col flex-grow'>
                {projects.map((project) => {
                    return (
                        <li
                            key={project.project_id}
                            className="flex-grow !flex flex-col list-none max-w-md mx-auto shadow-md overflow-hidden md:max-w-2xl"
                        >
                            <ProjectPost project={project} removeProject={removeProject}
                            />
                        </li>
                    );
                })}
            </Slider>

            {/* //! Card QuestionCard -----------------------------------------------------------------------------------  */}
            <section className="w-full">
                <ul className="flex flex-wrap justify-evenly">
                    {questions.slice(0, 2).map((question) => {
                        return (
                            <li
                                key={question.question_id}
                                className="flex-grow  px-8 py-4 bg-neutral-950" 
                                style={{ flexBasis: '30%' }}
                            >
                                <QuestionCard question={question} />
                            </li>
                        );
                    })}
                </ul>
            </section>

        </main>
    );
};
