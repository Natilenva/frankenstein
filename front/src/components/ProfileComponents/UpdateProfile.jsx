import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { updateProfileService } from '../../services/profileServices';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileSchema from '../../../schemas/profileSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineEdit } from 'react-icons/ai';
import { format } from 'date-fns';

export const UpdateProfile = () => {
    const location = useLocation();
    const { profile, updateProfile } = location.state;
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();
    // const [isCompany, setIsCompany] = useState(false);
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(profileSchema),
    });
    useEffect(() => {
        if (profile) {
            setValue('profile_name', profile.profile_name);
            setValue('profile_lastname', profile.profile_lastname);
            setValue('profile_username', profile.profile_username);
            setValue(
                'birthdate',
                format(new Date(profile.birthdate), 'yyyy-MM-dd')
            );
            setValue('profile_role', profile.profile_role);
            setValue('company_name', profile.company_name);
        }
    }, [profile, setValue]);
    console.log(user);
    const handleForm = async (data) => {
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
            console.log(profile);
            const { profile: updatedProfile } = await updateProfileService({
                data: formData,
                token,
                id,
            });
            console.log(updatedProfile);
            updateProfile(updatedProfile);
            setImage(null);
            // navigate(`/profile/${user.register_id}`);
            toast.success('Perfil actualizado con éxito');
        } catch (error) {
            navigate(`/profile/${user.register_id}`);
            // setError(error.message);
            // toast.error('Ha habido un problema al actualizar el perfil');
        } finally {
            setSending(false);
        }
    };
    // const handleRoleChange = (event) => {
    //     const selectedRole = event.target.value;
    //     setIsCompany(selectedRole === 'company');
    // };
    // const handleProfile = () => {
    //     navigate(`/profile/${user.register_id}`, {
    //         state: { updateProfile },
    //     });
    // };
    return (
        <>
            <main className="flex-grow">
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="space-y-2 max-w-lg mx-auto p-6 bg-white "
                >
                    <div className="flex flex-col items-center mb-4">
                        {image ? (
                            <figure className="mb-2 relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover "
                                />
                                <label
                                    htmlFor="avatar"
                                    className="absolute bottom-0 right-0 flex items-center justify-center bg-frankgreen cursor-pointer"
                                >
                                    <AiOutlineEdit />
                                </label>
                            </figure>
                        ) : (
                            <label
                                htmlFor="avatar"
                                className="relative cursor-pointer"
                            >
                                <img
                                    loading="image"
                                    src={`${
                                        import.meta.env.VITE_BASE_URL
                                    }/uploads/${profile.avatar}`}
                                    alt={profile.avatar}
                                    className="w-40 h-40 object-cover rounded-full"
                                />
                                <div className="absolute bottom-0 right-0 flex items-center justify-center w-25 h-25 cursor-pointer">
                                    <AiOutlineEdit className="text-frankgreen" />
                                </div>
                            </label>
                        )}
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="hidden"
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.avatar?.message}
                        </p>
                    </div>
                    <fieldset className="flex flex-col">
                        <label
                            htmlFor="profile_name"
                            className="text-sm font-medium text-gray-700"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="profile_name"
                            name="profile_name"
                            {...register('profile_name')}
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:frankgreen"
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.profile_name?.message}
                        </p>
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label
                            htmlFor="profile_lastname"
                            className="text-sm font-medium text-gray-700"
                        >
                            Apellidos
                        </label>
                        <input
                            type="text"
                            id="profile_lastname"
                            name="profile_lastname"
                            {...register('profile_lastname')}
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:frankgreen"
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.profile_lastname?.message}
                        </p>
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label
                            htmlFor="profile_username"
                            className="text-sm font-medium text-gray-700"
                        >
                            Nickname
                        </label>
                        <input
                            type="text"
                            id="profile_username"
                            name="profile_username"
                            {...register('profile_username')}
                            className="p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.profile_username?.message}
                        </p>
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label
                            htmlFor="birthdate"
                            className="text-sm font-medium text-gray-700"
                        >
                            Fecha de nacimiento
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            {...register('birthdate')}
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:frankgreen"
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.birthdate?.message}
                        </p>
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label
                            htmlFor="profile_role"
                            className="text-sm font-medium text-gray-700"
                        >
                            Rol
                        </label>
                        <input
                            type="text"
                            id="profile_role"
                            name="profile_role"
                            value={profile.profile_role}
                            readOnly
                            className="p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                        <p className="text-xs text-gray-500 mb-2">
                            * Si quieres cambiar tu rol ponte en contacto con el
                            administrador.
                        </p>
                    </fieldset>

                    {profile.company_name && (
                        <fieldset className="flex flex-col">
                            <label
                                htmlFor="company_name"
                                className="text-sm font-medium text-gray-700"
                            >
                                Empresa
                            </label>
                            <input
                                type="text"
                                id="company_name"
                                name="company_name"
                                {...register('company_name')}
                                className="p-2 border border-gray-300 rounded-md shadow-sm focus:frankgreen"
                            />
                            <p className="h-4 text-sm text-rose-500">
                                {errors.company_name?.message}
                            </p>
                        </fieldset>
                    )}
                    <button
                        type="submit"
                        className="text-white bg-frankgreen rounded p-2 w-full mt-10"
                    >
                        Actualizar perfil
                    </button>

                    {sending && (
                        <p className="text-center text-gray-500 mt-4">
                            Enviando perfil...
                        </p>
                    )}
                    {error && (
                        <p className="text-center text-red-500 mt-4">{error}</p>
                    )}
                </form>
            </main>
        </>
    );
};

UpdateProfile.propTypes = {
    updateProfile: PropTypes.func,
    profile: PropTypes.object,
};
