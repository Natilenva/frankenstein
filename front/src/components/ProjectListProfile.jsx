import PropTypes from 'prop-types';

// import ErrorBoundary from './ErrorBoundaryWithClass';
// import { ProjectProfile } from './ProjectProfile';
import { ProjectPost } from './ProjectPost';
import { useProfile } from '../hooks/profilehook/useProfile';
import { useParams } from 'react-router-dom';

//recibe una prop, un array de objetos
export const ProjectListProfile = ({ projects, removeProject }) => {
    const { id } = useParams();
    const { profile } = useProfile(id);

    return projects.length ? (
        <main>
            <ul className=" bg-white">
                {projects
                    .filter(
                        (project) => project.register_id === profile.register_id
                    )
                    .map((project) => {
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
            </ul>
        </main>
    ) : (
        <p>There are no projects yet ... </p>
    );
};
ProjectListProfile.propTypes = {
    projects: PropTypes.array,
    removeProject: PropTypes.func,
};
