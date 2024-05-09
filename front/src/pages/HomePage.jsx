import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
//import { NewProject } from '../components/NewProject';
import { ProjectList } from '../components/ProjectList';
import useProjects from '../hooks/useProjects';
import { AuthContext } from '../context/AuthContext';
import { NewProject2 } from '../components/NewProject2';

export const HomePage = () => {
    //useProjects es un custom hook q gestiona los tweets
    const { projects, loading, error, addProject, removeProject } =
        useProjects();
    //console.log('projects', projects);

    //info del usu cuando se logea
    const { user } = useContext(AuthContext);

    if (loading) return <p>cargando projects...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            {user ? <NewProject2 addProject={addProject} /> : null}
            {/* //! si no hay un token previo no exite user */}

            {/* {user ? <NewProject2 /> : null} */}

            <h1>Latest Projects </h1>
            <ProjectList projects={projects} removeProject={removeProject} />
        </section>
    );
};
