// import getConnection from '../../db/getConnection.js';

// export const selectCompanyForProfile = async (req, res) => {
//     try {
//         const { profileId, companyId } = req.body;
//         //const { profileId } = req.user; // Suponiendo que el ID del perfil del usuario está disponible en req.user

//         const connection = await getConnection();

//         console.log('El ID de la empresa es:', companyId);
//         console.log('El ID del perfil del usuario es:', profileId);

//         // Actualizar el perfil del usuario experto con el ID de la empresa seleccionada
//         //Creamos una columna company_id en la tabla profile, para relacionar el perfil con la compañia.
//         await connection.query(
//             'UPDATE profile SET company_id = ? WHERE profile_id = ?',
//             [companyId, profileId]
//         );

//         res.status(200).json({
//             message:
//                 'Empresa seleccionada correctamente para el perfil del usuario experto.',
//         });
//     } catch (error) {
//         console.error(
//             'Error al seleccionar la empresa para el perfil del usuario experto:',
//             error
//         );
//         res.status(500).json({
//             error: 'Error al seleccionar la empresa para el perfil del usuario experto.',
//         });
//     }
// };
