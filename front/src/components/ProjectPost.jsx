import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
//import { deleteProjectService } from '../services';
//import { toast } from 'react-hot-toast';
export const ProjectPost = ({ project, removeProject }) => {

    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');

    /* const deleteProject = async (id) => {
        try {
            await deleteProjectService({ id, token });
            if (removeProject) {
                removeProject(id);
            }

            toast.success('Has eliminado el proyecto con éxito!');
        } catch (error) {
            setError(error.message);
            toast.error(error.messge);
        }
    }; */

    
    //const provocarError = provocarErrorBoundary;

    return (
        <article className="md:flex bg-neutral-950">

            {/* //^ Imagen del proyecto ------------------------------ */}
            <div className='md:shrink-0'>
                {project.project_photo ? (
                    <img
                        className="h-48 w-full object-cover md:h-full md:w-48" 
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                            project.project_photo
                        }`}
                        /* src="https://source.unsplash.com/random/art" */
                        alt={project.project_title}
                    >
                    </img>
                ) : (
                    <p>no photo</p>
                )}
            </div>
            
            {/* //! CARD? del proyecto ---------------------------------------- */}
            <div className="p-8 pb-4"> {/* //! mio pb-4 */}
                {/* //* Categoría del proyecto  */}
                {/* <div className="uppercase tracking-wide text-sm text-frankgreen font-semibold">
                    Lorem, ipsum.
                </div> */}

                {/* //^ Title del proyecto ------------------------------------ */}
                <a href="#" className="block mt-1 text-lg leading-tight font-medium text-white hover:underline">
                    <h3>{project.project_title}</h3>
                </a>
                
                
                {/* //^ Description del proyecto ------------------------------ */}
                <p className="mt-2 text-neutral-200 font-myFontFamily"  >
                    {project.project_description}
                </p>
                {/* //*+ */}


                {/* //^ Creador y fecha del proyecto --------------------------- */}
                <p className="mt-1 text-xs font-medium  text-neutral-500">
                    By
                    <Link to={`/user/${project.register_id}`}>
                        {' '}
                        {project.usernameOfRegister}{' '}
                    </Link>{' '}
                    on{' '}
                    <Link to={`/project/${project.project_id}`}>
                        {new Date(project.created_at).toLocaleString()}
                    </Link>
                </p>



            {/* //^ Botón de editar y borrar el proyecto? ------------------ */}

                {user && user.register_id === project.register_id ? (
                    <Link to={`/project/${project.project_id}`} 
                    className="mt-1 text-xs font-medium  text-neutral-700">
                        Editar
                    </Link>
                ) : 
                <Link to={`/project/${project.project_id}`} 
                    className="invisible mt-1 text-xs font-medium  text-stone-500">
                        Editar
                    </Link>}
                {error ? <p>{error}</p> : null}
            </div>

        </article>
    );
};
ProjectPost.propTypes = {
    project: PropTypes.any,
    removeProject: PropTypes.any,
    updateProject: PropTypes.any,
};