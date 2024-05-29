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
        formState: { errors, isValid },
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
            navigate(`/project/${project.project_id}`);

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
        <main>
            <div className="flex flex-col items-center justify-center m-5 md:px-6 lg:px-8">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black font-semibold mb-4">
                    Añade tu proyecto
                </div>
                <form
                    noValidate
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                    onSubmit={handleSubmit(handleForm)}
                >
                    <section>
                        <fieldset>
                            <label
                                htmlFor="avatar"
                                className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8  cursor-pointer"
                            ></label>
                            <input
                                className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
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
                                        className="rounded-full object-cover h-full w-full"
                                    />
                                </figure>
                            ) : null}
                        </fieldset>
                        <fieldset className="mb-4">
                            <label
                                htmlFor="project_title"
                                className="block mb-1"
                            >
                                Título del proyecto
                            </label>
                            <input
                                className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                                type="text"
                                id="project_title"
                                name="project_title"
                                {...register('project_title')}
                            />
                            <p className="h-4 text-sm text-rose-500">
                                {errors.project_title?.message}
                            </p>
                        </fieldset>

                        <fieldset className="mb-2">
                            <label
                                htmlFor="project_description"
                                className="block mb-1"
                            >
                                Descripción
                            </label>
                            <textarea
                                className="w-full px-3 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                                type="text"
                                id="project_description"
                                name="project_description"
                                rows="4"
                                {...register('project_description')}
                            />
                            <p className="h-4 text-sm text-rose-500">
                                {errors.project_description?.message}
                            </p>
                        </fieldset>

                        <fieldset>
                            <label className="block mb-1" htmlFor="project_url">
                                URL
                            </label>
                            <input
                                className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                                type="url"
                                id="project_url"
                                name="project_url"
                                {...register('project_url')}
                            />
                            <p className="h-4 text-sm text-rose-500">
                                {errors.project_url?.message}
                            </p>
                        </fieldset>

                        {profile.is_company_validated === 0 &&
                        profile.profile_role === 'company' ? (
                            <p className="h-4 text-sm text-rose-500">
                                Tu empresa aun no está validada. Aun no puedes
                                publicar proyectos.
                            </p>
                        ) : (
                            <button
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4"
                                disabled={!isValid || sending}
                            >
                                {sending ? 'Enviando...' : 'Añadir proyecto'}
                            </button>
                        )}
                    </section>

                    {error ? <p>{error}</p> : null}
                </form>
            </div>
        </main>
    );
};
NewProject2.propTypes = {
    addProject: PropTypes.func,
};
