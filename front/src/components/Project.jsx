import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Project = ({ project }) => {
    const {
        project_title,
        project_description,
        project_photo,
        register_id,
        created_at,
        project_id,
    } = project;
    return (
        <article>
            <h3>{project_title}</h3>

            {/* // TODO tengo la imagen pero no la puedo mostrar: -------------- */}
            {/* <img src={project.project_photo} alt={project.project_title} /> */}
            {/* {project.project_photo ? (
                <img src={(`${import.meta.env.VITE_BASE_URL}`)} />
            ) : null } */}

            {project_photo ? (
                <img
                    src={`${
                        import.meta.env.VITE_BASE_URL
                    }/uploads/${project_photo}`}
                    alt={project_title}
                />
            ) : (
                'no photo'
            )}

            <p>{project_description}</p>

            {/* // TODO el campo modified_at no lo tenemos */}
            {/* <p>{project.modified_at}</p> */}

            {/* // TODO el campo created_at tendríamos q convertirlo a fecha */}
            {/* <p>{project.created_at}</p> */}

            {/* // TODO no tenemos al autor del proyecto */}

            <p>
                By {register_id} on{' '}
                <Link to={`/project/${project_id}`}>{created_at}</Link>
            </p>
        </article>
    );
};
Project.propTypes = {
    project: PropTypes.any,
};
