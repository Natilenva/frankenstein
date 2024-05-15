import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { insertProfileService } from '../../services/profileServices';
export const NewProfile = () => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();

    const { token } = useContext(AuthContext);
    const handleForm = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            const data = new FormData(e.target);
            await insertProfileService({ data, token });
            setImage(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };
    return (
        <>
            <h1>formulario Perfil</h1>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="profile_name">Nombre</label>
                    <input type="text" id="profile_name" name="profile_name" />
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
