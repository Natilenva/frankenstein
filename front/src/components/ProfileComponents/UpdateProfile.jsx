import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { updateProfileService } from '../../services/profileServices';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfile } from '../../hooks/profilehook/useProfile';
import PropTypes from 'prop-types';

export const UpdateProfile = ({ updateProfile }) => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();
    const { token } = useContext(AuthContext);

    const { id } = useParams();
    const { profile } = useProfile(id);

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            const data = new FormData(e.target);

            await updateProfileService({ data, token, id });
            updateProfile(updateProfile);
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
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="profile_name">Nombre</label>
                    <input
                        type="text"
                        id="profile_name"
                        name="profile_name"
                        defaultValue={profile.profile_name}
                        // value={profileName}
                        // onChange={handleChange}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_lastname">Apellidos</label>
                    <input
                        type="text"
                        id="profile_lastname"
                        name="profile_lastname"
                        defaultValue={profile.profile_lastname}
                        // value={profileLastName}
                        // onChange={(e) => setProfileLastName(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_username">Nickname</label>
                    <input
                        type="text"
                        id="profile_username"
                        name="profile_username"
                        defaultValue={profile.profile_username}
                        // value={profileUsername}
                        // onChange={(e) => setProfileUsername(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="birthdate">Fecha de nacimiento</label>
                    <input
                        type="text"
                        id="birthdate"
                        name="birthdate"
                        defaultValue={profile.birthdate}
                        // value={birthdate}
                        // onChange={(e) => setBirthdate(e.target.value)}
                    />
                </fieldset>
                {/* <fieldset>
                    <label htmlFor="profile_role">Rol</label>
                    <select
                        id="profile_role"
                        name="profile_role"
                        defaultValue={profile.profile_role}
                    >
                        <option value="Escoge un role">Escoge un rol</option>
                        <option value="company">Empresa</option>
                        <option value="expert">Experto</option>
                        <option value="student">Studiante</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="company">Empresa</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        defaultValue={profile.company}
                    />
                </fieldset> */}

                <div>
                    <img
                        loading="lazy"
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                            profile.avatar
                        }`}
                        alt={profile.avatar}
                    />
                </div>
                <fieldset>
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        defaultValue={profile.avatar}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image && (
                        <figure>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{ width: '100px' }}
                            />
                        </figure>
                    )}
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
                        defaultValue={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {validationErrors.email && (
                        <p className="h-4 text-sm text-rose-500">
                            {validationErrors.email}
                        </p>
                    )}
                </fieldset>
                <fieldset className="mb-4">
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
                </fieldset> */}

                <button className="text-white bg-lime-600 rounded p-1 m-4">
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
};
