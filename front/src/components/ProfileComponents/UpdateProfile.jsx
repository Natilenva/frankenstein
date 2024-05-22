import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { updateProfileService } from '../../services/profileServices';
import { useNavigate, useParams } from 'react-router-dom';
// import { useProfile } from '../../hooks/profilehook/useProfile';
import PropTypes from 'prop-types';
import { updateProfileSchema } from '../../../schemas/updateProfileSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const UpdateProfile = ({ updateProfile, profile }) => {
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();

    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(updateProfileSchema),
    });
    useEffect(() => {
        if (profile) {
            setValue('profile_name', profile.profile_name);
            setValue('profile_lastname', profile.profile_lastname);
            setValue('profile_username', profile.profile_username);
            setValue('birthdate', profile.birthdate);
            setValue('profile_role', profile.profile_role);
            setValue('company_name', profile.company_name);
            // setValue('email', user.email);
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
            navigate(`/profile/${id}`);
            toast.success('Perfil actualizado con éxito');
        } catch (error) {
            setError(error.message);
            toast.error('Ha habido un problema al actualizar el perfil');
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleForm)}>
                <fieldset>
                    <label htmlFor="profile_name">Nombre</label>
                    <input
                        type="text"
                        id="profile_name"
                        name="profile_name"
                        // defaultValue={profile.profile_name}
                        {...register('profile_name')}
                        // value={profileName}
                        // onChange={handleChange}
                    />
                </fieldset>
                <p className="h-4 text-sm text-rose-500">
                    {errors.profile_name?.message}
                </p>
                <fieldset>
                    <label htmlFor="profile_lastname">Apellidos</label>
                    <input
                        type="text"
                        id="profile_lastname"
                        name="profile_lastname"
                        // defaultValue={profile.profile_lastname}
                        {...register('profile_lastname')}
                        // value={profileLastName}
                        // onChange={(e) => setProfileLastName(e.target.value)}
                    />
                    <p className="h-4 text-sm text-rose-500">
                        {errors.profile_lastname?.message}
                    </p>
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_username">Nickname</label>
                    <input
                        type="text"
                        id="profile_username"
                        name="profile_username"
                        // defaultValue={profile.profile_username}
                        {...register('profile_username')}
                        // value={profileUsername}
                        // onChange={(e) => setProfileUsername(e.target.value)}
                    />
                    <p className="h-4 text-sm text-rose-500">
                        {errors.profile_username?.message}
                    </p>
                </fieldset>
                <fieldset>
                    <label htmlFor="birthdate">Fecha de nacimiento</label>
                    <input
                        type="text"
                        id="birthdate"
                        name="birthdate"
                        // defaultValue={profile.birthdate}
                        {...register('birthdate')}
                        // value={birthdate}
                        // onChange={(e) => setBirthdate(e.target.value)}
                    />
                </fieldset>
                <p className="h-4 text-sm text-rose-500">
                    {errors.birthdate?.message}
                </p>
                <fieldset>
                    <label htmlFor="profile_role">Rol</label>
                    <select
                        id="profile_role"
                        name="profile_role"
                        // defaultValue={profile.profile_role}
                        {...register('profile_role')}
                    >
                        <option value="Escoge un role">Escoge un rol</option>
                        <option value="company">Empresa</option>
                        <option value="expert">Experto</option>
                        <option value="student">Studiante</option>
                    </select>
                </fieldset>
                <p className="h-4 text-sm text-rose-500">
                    {errors.profile_role?.message}
                </p>
                <fieldset>
                    <label htmlFor="company">Empresa</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        // defaultValue={profile.company}
                        {...register('company')}
                    />
                </fieldset>
                <p className="h-4 text-sm text-rose-500">
                    {errors.company?.message}
                </p>
                <fieldset>
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        // defaultValue={profile.avatar}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image ? (
                        <figure>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{ width: '100px' }}
                            />
                        </figure>
                    ) : null}
                    <div>
                        <img
                            loading="lazy"
                            src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                                profile.avatar
                            }`}
                            alt={profile.avatar}
                        />
                    </div>
                    <p className="h-4 text-sm text-rose-500">
                        {errors.avatar?.message}
                    </p>
                </fieldset>
                {/* <fieldset className="mb-4">
                    <label htmlFor="email" className="block mb-1">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border rounded-md px-3 py-2"
                        {...register('email')}
                        // onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <p className="h-4 text-sm text-rose-500">
                        {errors.email?.message}
                    </p>
                </fieldset> */}
                {/* <fieldset className="mb-4">
                    <label htmlFor="pass1" className="block mb-1">
                        Contraseña Nueva
                    </label>
                    <input
                        type="password"
                        id="pass1"
                        name="pass1"
                        className="w-full border rounded-md px-3 py-2"
                        value={pass1}
                        required
                        // onChange={(e) => setPass1(e.target.value)}
                    />
                    {validationErrors.email && (
                        <p className="h-4 text-sm text-rose-500">
                            {validationErrors.email}
                        </p>
                    )}
                </fieldset>{' '}
                */}
                <button
                    // disabled={!isValid}
                    className="text-white bg-lime-600 rounded p-1 m-4"
                >
                    Actualizar perfil
                </button>

                {sending && <p>Sending profile</p>}
                {error && <p>{error}</p>}
            </form>
        </>
    );
};
UpdateProfile.propTypes = {
    updateProfile: PropTypes.func,
    profile: PropTypes.object,
};
