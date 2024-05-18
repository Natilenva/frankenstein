import { useProfile } from '../hooks/profilehook/useProfile';

import { Link, useNavigate, useParams } from 'react-router-dom';

export const CuentaPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { profile, loading, error } = useProfile(id);

    if (loading) return <p>cargando perfil...</p>;
    if (error) return navigate('/newprofile');
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
                        className="m-4"
                        src={`${
                            import.meta.env.VITE_BASE_URL
                        }/uploads/${avatar}`}
                        alt={profile_username}
                    />
                ) : (
                    <img
                        className="m-4 w-40"
                        src="/avatar.png"
                        alt="no-photo"
                    />
                )}
            </article>
            <Link
                className="text-white bg-lime-600 rounded p-2 m-4"
                to={'/updateprofile'}
            >
                Modificar perfil
            </Link>
        </>
    );
};
