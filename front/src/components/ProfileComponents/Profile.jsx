import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Profile = ({ profile, updateProfile }) => {
    const { user } = useContext(AuthContext);
    // const [error, setError] = useState('');

    const {
        profile_name,
        profile_lastname,
        profile_username,
        birthdate,
        avatar,
        profile_role,
        register_id,
    } = profile;
    return (
        <>
            <h1>Mi perfil</h1>
            <article>
                {avatar ? (
                    <img
                        loading="lazy"
                        src={`${
                            import.meta.env.VITE_BASE_URL
                        }/uploads/${avatar}`}
                        alt={profile_name}
                        className="aspect-[0.96] w-[158px]"
                    />
                ) : null}
                <h3>{profile_name}</h3>
                <h3>{profile_lastname}</h3>
                <h3>{profile_username}</h3>
                <h3>{new Date(birthdate).toLocaleDateString('es-ES')}</h3>
                <h3>{profile_role}</h3>
            </article>
            <section>
                {user && user.register_id === register_id ? (
                    <Link
                        to={`/profileupdate`}
                        state={{ profile, updateProfile }}
                    >
                        Modificar Perfil
                    </Link>
                ) : null}
                {/* {error ? <p>{error}</p> : null} */}
            </section>
        </>
    );
};
Profile.propTypes = {
    profile: PropTypes.any,
    updateProfile: PropTypes.any,
};
