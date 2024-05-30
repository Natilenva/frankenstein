import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Profile = ({ profile, updateProfile }) => {
    const { user } = useContext(AuthContext);
    // const [error, setError] = useState('');
    const navigate = useNavigate();
    const {
        profile_name,
        profile_lastname,
        profile_username,
        birthdate,
        avatar,
        profile_role,
        register_id,
        company_name,
        is_company_validated,
        //  projects = [], // Agregado para manejar los proyectos del perfil
        //  questions = [], // Agregado para manejar las preguntas del perfil
    } = profile;
    //    const formatDate = (date) => new Date(date).toLocaleDateString('es-ES'); // Función para formatear la fecha
    //const formatDate = new Date(); //.toLocaleDateString('es-ES'); // Función para formatear la fecha
    if (profile.profile_name == null) return navigate('/newprofile');
    return (
        <div className="flex flex-grow flex-col max-w-[395px] mx-auto">
            <div className="flex flex-col items-center self-center px-3 pt-2 pb-5 w-full text-lg font-medium leading-6 text-center text-black whitespace-nowrap max-w-[363px]">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    Mi perfil
                </h1>
                <article className="bg-white p-6 flex flex-col items-center space-y-4">
                    {avatar ? (
                        <img
                            loading="Image"
                            src={`${
                                import.meta.env.VITE_BASE_URL
                            }/uploads/${avatar}`}
                            alt={profile_name}
                            className="rounded-full w-40 h-40 object-cover"
                        />
                    ) : (
                        <div className="shrink-0 rounded-full bg-zinc-300 h-[189px] w-[189px]">
                            {profile_name?.[0]}
                        </div>
                    )}
                    <div className="mt-3.5">
                        <h3 className="text-xl font-semibold">
                            {profile_name}
                        </h3>
                        <h3 className="text-xl font-semibold">
                            {profile_lastname}
                        </h3>
                        <h3 className="text-md text-gray-500">
                            {profile_username}
                        </h3>
                        <h3 className="text-md text-gray-500">
                            {new Date(birthdate).toLocaleDateString('es-ES')}
                        </h3>
                        <h3 className="text-md text-gray-500">
                            {profile_role}
                        </h3>
                        <h3 className="text-md text-gray-500">
                            {company_name}
                        </h3>
                        {!is_company_validated &&
                            profile_role === 'company' && (
                                <h3 className="text-sm text-red-500">
                                    Su empresa aún no está validada
                                </h3>
                            )}
                    </div>
                </article>
                <section className="mt-6 flex justify-center">
                    {user && user.register_id === register_id ? (
                        <Link
                            to={`/profileupdate`}
                            state={{ profile, updateProfile }}
                            className="px-4 py-2 bg-frankgreen text-white rounded-md shadow-md hover:bg-frankgreen-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen"
                        >
                            Modificar Perfil
                        </Link>
                    ) : null}
                </section>
            </div>
        </div>
    );
};

Profile.propTypes = {
    profile: PropTypes.any,
    updateProfile: PropTypes.any,
};
