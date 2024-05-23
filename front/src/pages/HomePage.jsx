import { ErrorMessage } from '../components/ErrorMessage';
import { ProjectList } from '../components/ProjectList';
import useProjects from '../hooks/useProjects';
import useQuestions from '../hooks/QuestionsHook/useQuestions.js';
import QuestionListItem from "./../components/QuestionsComponents/QuestionListItem";
import Loading from "./../components/loading";
import { Link } from 'react-router-dom';

export const HomePage = () => {

    const { projects, loading, error, removeProject } = useProjects();

    const{
        questions,
    }= useQuestions();

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <main className='flex-grow min-h-screen'>
          
            <ProjectList projects={projects} removeProject={removeProject} />
            
        {/* <section className='bg-black'> */}
        
        {/* <div className="flex gap-3 self-center px-3 pt-3.5 mt-2 leading-[133%] bg-black">
        <div className="text-lg font-medium text-white">
            Pregunta a Papi Frankie
        </div>
        </div> */}

        <Link to="/questions">Ver más</Link>

        <ul className='bg-black'>
            {questions.length < 1 && loading ? (
                <Loading/>
            ): questions.length === 0 ?(
                <li>No se han encontrado preguntas</li>
            ):(                
                questions.map((question)=>{                   
                    return <QuestionListItem key={question.question_id} question={question}/>;                   
                })
            )}
         </ul>
         {/* <div className="flex flex-col justify-center mx-auto w-full max-w-[480px]">
         <div className="flex flex-col w-full">
         <div className="flex gap-3 self-center px-3 pt-3.5 mt-2 whitespace-nowrap leading-[133%]">
         <div className="flex gap-0.5 self-start py-1 pr-1 pl-2 text-xs text-white bg-lime-600 rounded">
         <Link to="/questions">Ver más</Link>
         </div>
         </div>
         </div>
         </div> */}
        {/* </section> */}
        
        </main>
    );
};
