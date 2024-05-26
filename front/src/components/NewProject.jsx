import { useContext, useState } from 'react';
import { sendProjectService } from '../services';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '../../schemas/projectShema';
import { useProfile } from '../hooks/profilehook/useProfile';
export const NewProject2 = ({ addProject }) => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();
    const { token, user } = useContext(AuthContext);
    const { profile } = useProfile(user.register_id);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(projectSchema),
    });

    //redireccionar
    const navigate = useNavigate();

    const handleForm = async (data) => {
        try {
            setSending(true);

            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            if (image) {
                formData.append('project_photo', image);
            }

            const project = await sendProjectService({ data: formData, token });
            //console.log('project', project); // !

            addProject(project);
            navigate('/');

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
        <>
            <form onSubmit={handleSubmit(handleForm)}>
                <section>
                    <h1 className="text-2xl font-normal ">Add new Project</h1>

                    <fieldset>
                        <label htmlFor="project_title">Title</label>
                        <input
                            type="text"
                            id="project_title"
                            name="project_title"
                            {...register('project_title')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.project_title?.message}
                        </p>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="project_description">Description</label>
                        <input
                            type="text"
                            id="project_description"
                            name="project_description"
                            {...register('project_description')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.project_description?.message}
                        </p>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="project_url">URL</label>
                        <input
                            type="url"
                            id="project_url"
                            name="project_url"
                            {...register('project_url')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.project_url?.message}
                        </p>
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
                    {profile.is_company_validated === 0 &&
                    profile.profile_role === 'company' ? (
                        <p className="h-4 text-sm text-rose-500">
                            Tu empresa aun no está validada. Aun no puedes
                            publicar proyectos.
                        </p>
                    ) : (
                        <button className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded">
                            Send Project
                        </button>
                    )}
                </section>

                {sending ? <p>Sending project</p> : null}
                {error ? <p>{error}</p> : null}
            </form>
        </>
    );
};
NewProject2.propTypes = {
    addProject: PropTypes.func,
};
