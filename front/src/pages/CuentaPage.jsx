import { useProfile } from '../hooks/profilehook/useProfile';

import { NewProfile } from '../components/ProfileComponents/NewProfile';
import { ErrorMessage } from '../components/ErrorMessage';
import { Link, useParams } from 'react-router-dom';

export const CuentaPage = () => {
    const { id } = useParams();

    const { profile, loading, error } = useProfile(id);

    if (loading) return <p>cargando perfil...</p>;
    if (error) return <ErrorMessage message={error} />;
    const {
        profile_name,
        profile_lastname,
        profile_username,
        birthdate,
        avatar,
    } = profile;
    return (
        <>
            <h1>Mi cuenta</h1>

            <h1>Mi perfil</h1>

            {!profile ? (
                <NewProfile />
            ) : (
                <article>
                    <h3>Nombre: {profile_name}</h3>
                    <h3>Apellidos: {profile_lastname}</h3>
                    <h3>Nick: {profile_username}</h3>
                    <h3>
                        Fecha de nacimiento:{' '}
                        {new Date(birthdate).toLocaleDateString('es-ES')}
                    </h3>
                    {avatar ? (
                        <img
                            src={`${
                                import.meta.env.VITE_BASE_URL
                            }/uploads/${avatar}`}
                            alt={profile_username}
                        />
                    ) : (
                        <p>no photo</p>
                    )}
                </article>
            )}
            <Link to={'/updateprofile'}>Actualizar perfil</Link>
        </>
    );
};
