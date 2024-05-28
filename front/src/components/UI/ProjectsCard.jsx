import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-4">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <a
                href={project.link}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver proyecto
            </a>
        </div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectCard;
