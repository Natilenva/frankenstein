import { useContext, useState } from 'react';
import { deleteProjectService, updateProjectService } from '../services';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

import { toast } from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import useProject from "../hooks/useProject";

export const UpdateProject = ({ updateProject, removeProject }) => {

    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();
    
    const { token } = useContext(AuthContext);

    const { id } = useParams();
    //console.log('UpdateProject, id', id);
    const { project } = useProject(id);
    //console.log('UpdateProject, project', project);
    //console.log('project.title: ', project.project_title);
    //console.log('project && project.title: ', project && project.title);

    const navigate = useNavigate();


    const deleteProject = async (id) => {
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
    };


    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setSending(true);

            const data = new FormData(e.target);
            //console.log('e.target', e.target);

            const updatedProject = await updateProjectService({ data, token, id });
            //console.log('project', project); // ! 

            updateProject(updatedProject);
            navigate('/');

            e.target.reset();
            setImage(null);
            toast.success('Actualizado proyecto con éxito');
        } catch (error) {
            setError(error.message);
            toast.error('Ha habido un problema al agregar el proyecto');
        } finally {
            setSending(false);
        }
    };
    return (
        <form onSubmit={handleForm}>
            <h1 className="text-2xl font-normal ">Tu proyecto {project.project_title}</h1>

            {/* Imagen del proyecto */}
            <div >
                {project.project_photo ? (
                    <img
                        loading="lazy"
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                            project.project_photo
                        }`}
                        alt={project.project_title}
                        className="aspect-[0.96] w-[158px]"
                    />
                ) : (
                    <p>no photo</p>
                )}
            </div>
            {/* FIN Imagen del proyecto -------------------------------- */}

            <fieldset>
                <label htmlFor="project_title">Title</label>
                <input type="text" id="project_title" name="project_title" 
                defaultValue={project.project_title}
                />
            </fieldset>

            <fieldset>
                <label htmlFor="project_description">Description</label>
                <input
                    type="text"
                    id="project_description"
                    name="project_description"
                    defaultValue={project.project_description}
                />
            </fieldset>

            <fieldset>
                <label htmlFor="project_url">URL</label>
                <input type="url" id="project_url" name="project_url"
                defaultValue={project.project_url} 
                />
            </fieldset>

            <fieldset>
                <h6>Image(optional)</h6>
                <input
                    type="file"
                    id="project_photo"
                    name="project_photo"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                ></input>
                {image ? (
                    <figure>
                        <img
                            src={URL.createObjectURL(image)}
                            alt='"Preview'
                            style={{ width: '100px' }}
                        />
                    </figure>
                ) : null}
            </fieldset>

            <button className=' bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded'>Update Project</button>
            {sending ? <p>Sending project</p> : null}

            <button
                className='bg-orange-500 hover:bg-red-700 text-white px-4 py-1 rounded'
                    onClick={() => {
                        deleteProject(project.project_id);
                    }}
                >
                    Eliminar proyecto
            </button>

            {error ? <p>{error}</p> : null}
        </form>
    );
};
UpdateProject.propTypes = {
    updateProject: PropTypes.func,
    removeProject: PropTypes.func,
};
