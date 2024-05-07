import { useContext, useState } from 'react';
import { sendProjectService } from '../services';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';
export const NewProject = ({ addProject }) => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();
    const { token } = useContext(AuthContext);
    const handleForm = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            const data = new FormData(e.target);
            const project = await sendProjectService({ data, token });
            addProject(project);
            e.target.reset();
            setImage(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };
    return (
        <form onSubmit={handleForm}>
            <h1>Add new Project</h1>
            <fieldset>
                <label htmlFor="title">Title</label>
                <input type="title" id="title" name="title" required></input>
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description</label>
                <input
                    type="description"
                    id="description"
                    name="description"
                ></input>
            </fieldset>
            <fieldset>
                <label>Image(optional)</label>
                <input
                    type="file"
                    id="image"
                    name="image"
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
            <button>Send Project</button>
            {sending ? <p>Sending project</p> : null}
            {error ? <p>{error}</p> : null}
        </form>
    );
};
NewProject.propTypes = {
    addProject: PropTypes.node,
};
