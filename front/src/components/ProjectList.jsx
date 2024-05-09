import PropTypes from 'prop-types';
import { Project } from './Project';

//recibe una prop, un array de objetos
export const ProjectList = ({ projects, removeProject }) => {
    //console.log('projects', projects);

    return projects.length ? (
        <ul>
            {projects.map((project) => (
                <li key={project.project_id}>
                    <Project project={project} removeProject={removeProject} />
                </li>
            ))}
        </ul>
    ) : (
        <p>There are no projects yet ... </p>
    );
};
ProjectList.propTypes = {
    projects: PropTypes.array,
    removeProject: PropTypes.func,
};
