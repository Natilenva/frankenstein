import { useContext, useState } from 'react';
import { sendProjectService } from '../services';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const NewProject2 = ({ addProject }) => {
    /* export const NewProject2 = () => { */
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();
    const { token } = useContext(AuthContext);

    //redireccionar
    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setSending(true);

            const data = new FormData(e.target);
            //console.log('e.target', e.target);

            const project = await sendProjectService({ data, token });
            //console.log('project', project); // ! 

            addProject(project);
            navigate('/');

            e.target.reset();
            setImage(null);
            toast.success('Agregado proyecto con éxito');
        } catch (error) {
            setError(error.message);
            toast.error('Ha habido un problema al agregar el proyecto');
        } finally {
            setSending(false);
        }
    };
    return (
        <form onSubmit={handleForm}>
            <h1 className="text-2xl font-normal ">Add new Project</h1>

            <fieldset>
                <label htmlFor="project_title">Title</label>
                <input type="text" id="project_title" name="project_title" />
            </fieldset>

            <fieldset>
                <label htmlFor="project_description">Description</label>
                <input
                    type="text"
                    id="project_description"
                    name="project_description"
                />
            </fieldset>

            <fieldset>
                <label htmlFor="project_url">URL</label>
                <input type="url" id="project_url" name="project_url" />
            </fieldset>

            <fieldset>
                <label>Image(optional)</label>
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

            <button className=' bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded'>Send Project</button>
            {sending ? <p>Sending project</p> : null}
            {error ? <p>{error}</p> : null}
        </form>
    );
};
NewProject2.propTypes = {
    addProject: PropTypes.func,
};
