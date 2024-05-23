import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { insertProfileService } from '../../services/profileServices';
import { useNavigate } from 'react-router-dom';
import { profileSchema } from '../../../schemas/profileSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
export const NewProfile = () => {
    const { token, user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
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
            //  setImage(null);
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
    return (
        <>
            <h1>formulario Perfil</h1>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="profile_name">Nombre</label>
                    <input
                        type="text"
                        id="profile_name"
                        name="profile_name"
                        {...register('profile_name')}
                    />
                    <p className="h-4 text-sm text-rose-500">
                        {errors.profile_name?.message}
                    </p>
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_lastname">Apellidos</label>
                    <input
                        type="text"
                        id="profile_lastname"
                        name="profile_lastname"
                        {...register('profile_lastname')}
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
                        {...register('profile_username')}
                    />
                    <p className="h-4 text-sm text-rose-500">
                        {errors.profile_username?.message}
                    </p>
                </fieldset>
                <fieldset>
                    <label htmlFor="birthdate">Fecha de naciemiento</label>
                    <input
                        type="text"
                        id="birthdate"
                        name="birthdate"
                        // min="1924-01-01"
                        // max="2021-01-01"
                        {...register('birthdate')}
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
                        {...register('profile_role')}
                        onChange={handleRoleChange}
                    >
                        <option value="Escoge un role">Escoge un rol</option>
                        <option value="company">Empresa</option>
                        <option value="expert">Experto</option>
                        <option value="student">Estudiante</option>
                    </select>
                </fieldset>
                <p className="h-4 text-sm text-rose-500">
                    {errors.profile_role?.message}
                </p>
                <fieldset>
                    <label htmlFor="company_name">Empresa</label>
                    <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        {...register('company_name')}
                        disabled={!isCompany}
                    />
                </fieldset>
                <p className="h-4 text-sm text-rose-500">
                    {errors.company?.message}
                </p>
                {/* <img src={'avatar.png'} alt="avatar" /> */}

                <fieldset>
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
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
                </fieldset>
                <button
                    className="text-white bg-lime-600 rounded p-1 m-4"
                    disabled={!isValid}
                >
                    Actualizar perfil
                </button>
                {sending ? <p>Sending profile</p> : null}
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </>
    );
};
