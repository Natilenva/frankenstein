// //import { useContext, useState } from 'react';
// //import { AuthContext } from '../../context/AuthContext';
// import PropTypes from 'prop-types';
// import { ErrorMessage } from '../ErrorMessage';
// import { useProfile } from '../../hooks/profilehook/useProfile';
// import { useParams } from 'react-router-dom';

// export const Profile = async () => {
//     const { id } = useParams();
//     const { profile, loading, error } = useProfile(id);
//     if (loading) return <p>Loading userdata...</p>;
//     if (error) return <ErrorMessage message={error} />;
//     //const { user, token } = useContext(AuthContext);
//     // const [error, setError] = useState('');

//     const {
//         profile_name,
//         profile_lastname,
//         profile_username,
//         birthdate,
//         avatar,
//     } = profile;
//     return (
//         <>
//             <h1>Mi perfil</h1>
//             <article>
//                 <h3>{profile_name}</h3>
//                 <h3>{profile_lastname}</h3>
//                 <h3>{profile_username}</h3>
//                 <h3>{birthdate}</h3>
//                 {avatar ? (
//                     <img
//                         src={`${
//                             import.meta.env.VITE_BASE_URL
//                         }/uploads/${avatar}`}
//                         alt={profile_username}
//                     />
//                 ) : (
//                     <p>no photo</p>
//                 )}
//             </article>
//         </>
//     );
// };
// Profile.propTypes = {
//     profile: PropTypes.any,
// };
