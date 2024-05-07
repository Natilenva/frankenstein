import PropTypes from 'prop-types';
import { Project } from './Project';

//recibe una prop, un array de objetos
export const ProjectList = ({ projects, removeProject, updateProject }) => {
    return projects.length ? (
        <ul>
            {projects.map((project) => (
                <li key={project.project_id}>
                    <Project
                        project={project}
                        removeProject={removeProject}
                        updateProject={updateProject}
                    />
                </li>
            ))}
        </ul>
    ) : (
        <p>There are no projects yet ... </p>
    );
};
ProjectList.propTypes = {
    projects: PropTypes.any,
    removeProject: PropTypes.any,
    updateProject: PropTypes.any,
};
