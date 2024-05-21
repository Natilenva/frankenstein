import { useProfile } from '../hooks/profilehook/useProfile';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { UpdateProfile } from '../components/ProfileComponents/UpdateProfile';

export const CuentaPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, error, updateProfile, profile } = useProfile(id);

    if (loading) return <p>cargando perfil...</p>;
    if (error) return navigate('/newprofile');
    return (
        <>
            <h1>Mi cuenta</h1>
            <h1>Mi perfil</h1>
            <UpdateProfile updateProfile={updateProfile} profile={profile} />
            <Link
                to={'/updatepassword'}
                // disabled={!isValid}
                className="text-white bg-lime-600 rounded p-1 m-4 flex"
            >
                Cambiar contraseña
            </Link>
        </>
    );
};
