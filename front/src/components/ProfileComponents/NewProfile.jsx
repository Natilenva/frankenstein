import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { insertProfileService } from '../../services/profileServices';
import { useNavigate } from 'react-router-dom';
import { profileSchema } from '../../../schemas/profileSchema';

export const NewProfile = () => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);

    const [image, setImage] = useState();

    const [validationErrors, setValidationErrors] = useState({});
    const [profileName, setProfileName] = useState('');
    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext);

    const handleForm = async (e) => {
        e.preventDefault();
        setValidationErrors({});
        setError('');

        try {
            const validationResult = profileSchema.safeParse({ profileName });
            if (!validationResult.success) {
                const errors = {};
                validationResult.error.issues.forEach((err) => {
                    errors[err.path[0]] = err.message;
                });
                setValidationErrors(errors);
                // return;
            }
            setSending(true);
            const data = new FormData(e.target);

            await insertProfileService({ data, token });
            setImage(null);
            navigate(`/profile/${user.register_id}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };
    return (
        <>
            <h1>formulario Perfil</h1>
            <form noValidate onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="profile_name">Nombre</label>
                    <input
                        type="text"
                        id="profile_name"
                        name="profile_name"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                    />
                    {validationErrors.profile_name && (
                        <p className="h-4 text-sm text-rose-500">
                            {validationErrors.email}
                        </p>
                    )}
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_lastname">Apellidos</label>
                    <input
                        type="text"
                        id="profile_lastname"
                        name="profile_lastname"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_username">Nickname</label>
                    <input
                        type="text"
                        id="profile_username"
                        name="profile_username"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="birthdate">Fecha de naciemiento</label>
                    <input type="text" id="birthdate" name="birthdate" />
                </fieldset>
                {/* <fieldset>
                    <label htmlFor="profile_role">Rol</label>
                    <select id="profile_role" name="profile_role">
                        <option value="Escoge un role">Escoge un rol</option>
                        <option value="company">Empresa</option>
                        <option value="expert">Experto</option>
                        <option value="student">Studiante</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="company">Empresa</label>
                    <input type="text" id="company" name="company" />
                </fieldset> */}
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
                <button>Actualizar perfil</button>
                {sending ? <p>Sending project</p> : null}
                {error ? <p>{error}</p> : null}
            </form>
        </>
    );
};
// import { useContext, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { insertProfileService } from '../../services/profileServices';
// import { useNavigate } from 'react-router-dom';
// import { profileSchema } from '../../../schemas/profileSchema';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { toast } from 'react-hot-toast';

// export const NewProfile = () => {
//     const navigate = useNavigate(); //hook para redirigir
//     const { register, handleSubmit, formState } = useForm({
//         mode: 'onTouched',
//         resolver: zodResolver(profileSchema),
//     });

//     const [error, setError] = useState('');
//     const [image, setImage] = useState(null);

//     const { errors, isValid } = formState;

//     const { token, user } = useContext(AuthContext);

//     const onSubmit = async (data) => {
//         try {
//             const formData = new FormData();
//             for (const key in data) {
//                 formData.append(key, data[key]);
//             }
//             if (image) {
//                 formData.append('avatar', image);
//             }

//             await insertProfileService({ formData, token });

//             navigate(`/profile/${user.register_id}`);
//             toast.success('Ya tienes tu perfil!');
//             console.log(formData);
//         } catch (error) {
//             setError(error.message);
//             toast.error(error.response?.data?.error || error.message);
//         }
//     };

//     return (
//         <>
//             <h1>Formulario Perfil</h1>
//             <form noValidate onSubmit={handleSubmit(onSubmit)}>
//                 <fieldset>
//                     <label htmlFor="profile_name">Nombre</label>
//                     <input
//                         type="text"
//                         id="profile_name"
//                         name="profile_name"
//                         {...register('profile_name')}
//                     />
//                     <p className="h-4 text-sm text-rose-500">
//                         {errors.profile_name?.message}
//                     </p>
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="profile_lastname">Apellidos</label>
//                     <input
//                         type="text"
//                         id="profile_lastname"
//                         name="profile_lastname"
//                         {...register('profile_lastname')}
//                     />
//                     <p className="h-4 text-sm text-rose-500">
//                         {errors.profile_lastname?.message}
//                     </p>
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="profile_username">Nickname</label>
//                     <input
//                         type="text"
//                         id="profile_username"
//                         name="profile_username"
//                         {...register('profile_username')}
//                     />
//                     <p className="h-4 text-sm text-rose-500">
//                         {errors.profile_username?.message}
//                     </p>
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="birthdate">Fecha de nacimiento</label>
//                     <input
//                         type="date"
//                         id="birthdate"
//                         name="birthdate"
//                         {...register('birthdate')}
//                     />
//                     <p className="h-4 text-sm text-rose-500">
//                         {errors.birthdate?.message}
//                     </p>
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="profile_role">Rol</label>
//                     <select
//                         id="profile_role"
//                         name="profile_role"
//                         {...register('profile_role')}
//                     >
//                         <option value="">Escoge un rol</option>
//                         <option value="company">Empresa</option>
//                         <option value="expert">Experto</option>
//                         <option value="student">Estudiante</option>
//                     </select>
//                     <p className="h-4 text-sm text-rose-500">
//                         {errors.profile_role?.message}
//                     </p>
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="company">Empresa</label>
//                     <input
//                         type="text"
//                         id="company"
//                         name="company"
//                         {...register('company')}
//                     />
//                     <p className="h-4 text-sm text-rose-500">
//                         {errors.company?.message}
//                     </p>
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="avatar">Avatar</label>
//                     <input
//                         type="file"
//                         id="avatar"
//                         name="avatar"
//                         accept="image/*"
//                         onChange={(e) => setImage(e.target.files[0])}
//                     />
//                     {image ? (
//                         <figure>
//                             <img
//                                 src={URL.createObjectURL(image)}
//                                 alt="Preview"
//                                 style={{ width: '100px' }}
//                             />
//                         </figure>
//                     ) : null}
//                 </fieldset>
//                 <button disabled={!isValid}>Actualizar perfil</button>
//                 {error ? <p className="text-red-500">{error}</p> : null}
//             </form>
//         </>
//     );
// };
