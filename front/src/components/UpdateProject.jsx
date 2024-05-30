import { useContext, useEffect, useState } from 'react';
import { deleteProjectService, updateProjectService } from '../services';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

import { toast } from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import useProject from '../hooks/useProject';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '../../schemas/projectShema';
export const UpdateProject = ({ updateProject, removeProject }) => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();

    const { token } = useContext(AuthContext);

    const { id } = useParams();

    const { project } = useProject(id);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(projectSchema),
    });
    useEffect(() => {
        if (project) {
            setValue('project_title', project.project_title);
            setValue('project_description', project.project_description);
            setValue('project_url', project.project_url);
        }
    }, [project, setValue]);
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

            const { project: updatedProject } = await updateProjectService({
                data: formData,
                token,
                id,
            });
            //console.log('project', project); // !

            updateProject(updatedProject);
            // navigate(`/project/${project.project_id}`);

            setImage(null);
            toast.success('Actualizado proyecto con éxito');
        } catch (error) {
            navigate(`/project/${project.project_id.id}`);
            // setError(error.message);
            // toast.error('Ha habido un problema al agregar el proyecto');
        } finally {
            setSending(false);
        }
    };
    return (
        <main className="flex-grow">
            <div className="flex flex-col items-center justify-center m-auto md:px-6 lg:px-8">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black font-semibold m-8">
                    Tu proyecto {project.project_title}
                </div>
                <form
                    noValidate
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                    onSubmit={handleSubmit(handleForm)}
                >
                    {/* Imagen del proyecto */}
                    <div>
                        {project.project_photo ? (
                            <img
                                loading="lazy"
                                src={`${
                                    import.meta.env.VITE_BASE_URL
                                }/uploads/${project.project_photo}`}
                                alt={project.project_title}
                                className="aspect-[0.96] w-[158px]"
                            />
                        ) : (
                            <img
                                className="h-48 w-full object-cover md:h-full md:w-48"
                                src="/apple-touch-icon.png"
                                alt="Logo de frankenstein"
                            />
                        )}
                    </div>
                    {/* FIN Imagen del proyecto -------------------------------- */}

                    <fieldset className="mb-4">
                        <label htmlFor="project_title" className="block mb-1">
                            Título del proyecto
                        </label>
                        <input
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            id="project_title"
                            name="project_title"
                            // defaultValue={project.project_title}
                            {...register('project_title')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.project_title?.message}
                        </p>
                    </fieldset>

                    <fieldset className="mb-4">
                        <label
                            htmlFor="project_description"
                            className="block mb-1"
                        >
                            Descripción
                        </label>
                        <textarea
                            className="w-full px-3 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            rows="4"
                            id="project_description"
                            name="project_description"
                            // defaultValue={project.project_description}
                            {...register('project_description')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.project_description?.message}
                        </p>
                    </fieldset>

                    <fieldset className="mb-4">
                        <label htmlFor="project_url" className="block mb-1">
                            URL
                        </label>
                        <input
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="url"
                            id="project_url"
                            name="project_url"
                            // defaultValue={project.project_url}
                            {...register('project_url')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.project_url?.message}
                        </p>
                    </fieldset>

                    <fieldset>
                        <h6>Imagen</h6>
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
                    <div className=" flex space-x-4 mt-4 place-content-around">
                        <button
                            className="w-[50%] px-4 py-2 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4"
                            // disabled={!isValid || sending}
                        >
                            {sending ? 'Enviando...' : 'Modificar proyecto'}
                        </button>

                        <button
                            className=" w-[50%] px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4 text-center m-auto "
                            // disabled={!isValid || sending}
                            onClick={() => {
                                deleteProject(project.project_id);
                            }}
                        >
                            {sending ? 'Enviando...' : 'Eliminar proyecto'}
                        </button>

                        {error ? <p>{error}</p> : null}
                    </div>
                </form>
            </div>
        </main>
    );
};
UpdateProject.propTypes = {
    updateProject: PropTypes.func,
    removeProject: PropTypes.func,
};
