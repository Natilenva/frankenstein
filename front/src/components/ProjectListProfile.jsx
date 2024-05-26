import PropTypes from 'prop-types';

import ErrorBoundary from './ErrorBoundaryWithClass';
import { ProjectProfile } from './ProjectProfile';

//recibe una prop, un array de objetos
export const ProjectListProfile = ({
    projectsProfile,
    removeProjectProfile,
}) => {
    return projectsProfile.length ? (
        <main>
            <h1>Mis proyectos</h1>
            <ul className="flex">
                {projectsProfile.map((projectProfile) => (
                    <li key={projectProfile.project_id}>
                        <ErrorBoundary
                            fallback={
                                <p>Something went wrong in Project.jsx</p>
                            }
                        >
                            <ProjectProfile
                                projectProfile={projectProfile}
                                removeProjectProfile={removeProjectProfile}
                            />
                        </ErrorBoundary>
                    </li>
                ))}
            </ul>
        </main>
    ) : (
        <p>There are no projects yet ... </p>
    );
};
ProjectListProfile.propTypes = {
    projectsProfile: PropTypes.array,
    removeProjectProfile: PropTypes.func,
};
