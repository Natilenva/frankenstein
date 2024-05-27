import PropTypes from 'prop-types';
import { Project } from './Project';
import ErrorBoundary from './ErrorBoundaryWithClass';

//recibe una prop, un array de objetos
export const ProjectList = ({ projects, removeProject }) => {
    
    return projects.length ? (
    <main> 
        <ul className=" bg-white">                      
            {projects.map((project) => (
            
                <li key={project.project_id}  className=" list-none max-w-md mx-auto  shadow-md overflow-hidden md:max-w-2xl">
                    <ErrorBoundary fallback={<p>Something went wrong in Project.jsx</p>}>
                        <Project project={project} removeProject={removeProject} />
                    </ErrorBoundary>
                </li>                               
            ))}
        </ul>         
   </main>
    ) : (
        <p>There are no projects yet ... </p>
    );
};
ProjectList.propTypes = {
    projects: PropTypes.array,
    removeProject: PropTypes.func,
};
