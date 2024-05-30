import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { insertProfileService } from '../../services/profileServices';
import { useNavigate } from 'react-router-dom';
import profileSchema from '../../../schemas/profileSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineEdit } from 'react-icons/ai';
//import Buttons from '../UI/Buttons/Buttons';

export const NewProfile = () => {
    const { token, user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [isCompany, setIsCompany] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);

            // Limpia el objeto URL cuando el componente se desmonta o la imagen cambia
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [image]);

    const onSubmit = async (data) => {
        setError('');

        try {
            setSending(true);
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            if (image) {
                formData.append('avatar', image);
            }
            const { profile_id } = await insertProfileService({
                formData,
                token,
            });
            setUser({ ...user, profile_id });
            navigate(`/profile/${user.register_id}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setIsCompany(selectedRole === 'company');
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center m-auto px-4 py-8">
                {/* Foto ------------------------------------------------------*/}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative h-40 w-40 rounded-full bg-zinc-300">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Avatar Preview"
                                className="rounded-full object-cover h-full w-full"
                            />
                        ) : user && user.avatar ? (
                            <img
                                src={`${
                                    import.meta.env.VITE_BASE_URL
                                }/uploads/${user.avatar}`}
                                alt="Avatar"
                                className="rounded-full object-cover h-full w-full"
                            />
                        ) : (
                            <p className="grow text-3xl font-bold text-center text-white"></p>
                        )}
                        <label
                            htmlFor="avatar"
                            className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 cursor-pointer"
                        >
                            <AiOutlineEdit className="text-frankgreen" />
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                    <div className="mt-4 text-lg font-semibold">
                        {user.profile_username}
                    </div>
                </div>

                {/* Form ------------------------------------------------------*/}

                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md space-y-4"
                >
                    <fieldset className="w-full">
                        <label
                            htmlFor="profile_name"
                            className="block text-sm font-medium text-black"
                        >
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="profile_name"
                            name="profile_name"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-frankgreen"
                            {...register('profile_name')}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.profile_name?.message}
                        </p>
                    </fieldset>

                    <div className="w-full">
                        <label
                            htmlFor="profile_lastname"
                            className="block text-sm font-medium text-black"
                        >
                            Apellidos:
                        </label>
                        <input
                            type="text"
                            id="profile_lastname"
                            name="profile_lastname"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-frankgreen sm:text-sm"
                            {...register('profile_lastname')}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.profile_lastname?.message}
                        </p>
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="profile_username"
                            className="block text-sm font-medium text-black"
                        >
                            Nickname:
                        </label>
                        <input
                            type="text"
                            id="profile_username"
                            name="profile_username"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-frankgreen sm:text-sm"
                            {...register('profile_username')}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.profile_username?.message}
                        </p>
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="birthdate"
                            className="block text-sm font-medium text-black"
                        >
                            Fecha de nacimiento:
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            min="1924-01-01"
                            max="2021-01-01"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-frankgreen sm:text-sm"
                            {...register('birthdate')}
                        />
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="profile_role"
                            className="block text-sm font-medium text-black"
                        >
                            Tipo de Usuario:
                        </label>
                        <select
                            id="profile_role"
                            name="profile_role"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-frankgreen sm:text-sm"
                            {...register('profile_role')}
                            onChange={handleRoleChange}
                        >
                            <option value=""></option>
                            <option value="company">Empresa</option>
                            <option value="expert">Experto</option>
                            <option value="student">Estudiante</option>
                        </select>
                        <p className="text-red-500 text-sm">
                            {errors.profile_role?.message}
                        </p>
                    </div>

                    {isCompany && (
                        <div className="w-full">
                            <label
                                htmlFor="company_name"
                                className="block text-sm font-medium text-black"
                            >
                                Empresa:
                            </label>
                            <input
                                type="text"
                                id="company_name"
                                name="company_name"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-frankgreen sm:text-sm"
                                {...register('company_name')}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.company_name?.message}
                            </p>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full mx-auto px-4 py-2 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mt-6"
                        disabled={!isValid || sending}
                    >
                        {sending ? 'Enviando...' : 'Actualizar perfil'}
                    </button>
                    {error && (
                        <p className="text-red-500 text-center mt-4">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};
