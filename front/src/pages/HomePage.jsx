
import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
//import { NewProject } from '../components/NewProject';
import { ProjectList } from '../components/ProjectList';
import useProjects from '../hooks/useProjects';
import { AuthContext } from '../context/AuthContext';
import { NewProject2 } from '../components/NewProject2';
import useQuestions from '../hooks/QuestionsHook/useQuestions.js';
import QuestionListItem from "./../components/QuestionsComponents/QuestionListItem";
import Loading from "./../components/loading";
import { Link } from 'react-router-dom';

export const HomePage = () => {
    //useProjects es un custom hook q gestiona los tweets
    const { projects, loading, error, addProject, removeProject } =
        useProjects();
    //console.log('projects', projects);
    const{
        questions,
    }= useQuestions();

    //info del usu cuando se logea
    const { user } = useContext(AuthContext);

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <main>
        <section>
            {user ? <NewProject2 addProject={addProject} /> : null}
            {/* //! si no hay un token previo no exite user */}

            {/* {user ? <NewProject2 /> : null} */}

            <h1>Latest Projects </h1>
            <ProjectList projects={projects} removeProject={removeProject} />
        </section>
        <section>
             <ul>
             {questions.length < 1 && loading ? (
                 <Loading/>
             ): questions.length === 0 ?(
                 <li>No se han encontrado preguntas</li>
             ):(
                 questions.map((question)=>{
                     console.log(question);
                     return <QuestionListItem key={question.question_id} question={question}/>;
                    
                 })
             )}
         </ul>
         <Link to="/questions">Ver más</Link>
        </section>
        </main>
    );
};
