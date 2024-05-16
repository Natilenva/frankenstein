import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { deleteProjectService } from '../services';

import { toast } from 'react-hot-toast';
export const Project = ({ project, removeProject }) => {
    //console.log('Project.jsx project', project);

    const { user, token } = useContext(AuthContext);
    //console.log('Project.jsx user', user);

    const [error, setError] = useState('');

    const deleteProject = async (id) => {
        try {
            await deleteProjectService({ id, token });
            if (removeProject) {removeProject(id);}
            toast.success('Has eliminado el proyecto con éxito!');
        } catch (error) {
            setError(error.message);
            toast.error(error.messge);
        }
    };

    //console.log('project.photo', project.photo);

    return (
        <article>
            {/* title  -------------------------------------------------- */}
            <h3 className="text-2xl font-normal ">{project.project_title}</h3>

            {/* photo --------------------------------------------------- */}
            {project.project_photo ? (
                <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                        project.project_photo
                    }`}
                    alt={project.project_title}
                />
            ) : ( <p>no photo</p>)}

            {/* description ----------------- */}
            <p>{project.project_description}</p>

            <p>{project.project_url}</p>

            {/* email and date ---------------------------------------------------- */}
            <p> By 
                <Link to={`/user/${project.email}`}> {' '} {project.email} {' '} </Link> 
                {' '} on {' '}
                <Link to={`/project/${project.project_id}`}>
                    {new Date(project.created_at).toLocaleString()}
                </Link>
            </p>

            {/* deleteProject ------------------------------------ */}
            {user && user.register_id === project.register_id ? 
            (<section>
                {/* {console.log(
                    'user.register_id: ', user.register_id, 'project.register_id: ', project.register_id
                )
                } */}
                    <button className='bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded'
                        onClick={() => {
                            deleteProject(project.project_id);
                        }}
                    >
                        Eliminar proyecto
                    </button>
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}

        </article>
    );
};
Project.propTypes = {
    project: PropTypes.object,
    removeProject: PropTypes.func,
    updateProject: PropTypes.any,
};
