// import bcrypt from 'bcrypt';
// import getConnection from '../../db/getConnection.js';
// import { acceptCompanyProfile } from '../profile/profileGetController.js';
// import { rejectCompanyProfile } from '../../models/profile/insertProfileByModel.js';
// const createAdmin = async (req, res, next) => {
//     try {
//         // Obtener datos de la solicitud
//         const {
//             email,
//             password,
//             registerCode,
//             adminName,
//             adminLastName,
//             adminUserName,
//         } = req.body;

//         // Validar los datos (puedes agregar más validaciones según sea necesario)

//         // Crear hash de la contraseña
//         const register_password = await bcrypt.hash(password, 10);

//         // Crear conexión a la base de datos
//         const connection = await getConnection();

//         // Insertar el nuevo administrador en la base de datos
//         await connection.query(
//             'INSERT INTO user_admin (email, register_password, register_code, admin_name, admin_lastname, admin_username) VALUES (?, ?, ?, ?, ?, ?)',
//             [
//                 email,
//                 register_password,
//                 'TEST',
//                 adminName,
//                 adminLastName,
//                 adminUserName,
//             ]
//         );

//         // Responder con éxito
//         res.status(201).json({ message: 'Administrador creado exitosamente' });
//     } catch (error) {
//         console.error('Error al crear administrador:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// };

// const acceptCompany = async (req, res, next) => {
//     try {
//         const { profile_id } = req.params;
//         console.log('acceptCompany: ' + profile_id.id);

//         const profileStatus = await acceptCompanyProfile(profile_id.id);

//         res.status(200).send({
//             status: 'ok',
//             message: 'Profile aceptado correctamente',
//             skills: profileStatus,
//         });
//     } catch (err) {
//         next(err);
//     }
// };
// const rejectCompany = async (req, res, next) => {
//     try {
//         const { profile_id } = req.params;
//         console.log('rejectCompanyProfile: ' + profile_id.id);

//         const profileStatus = await rejectCompanyProfile(profile_id.id);

//         res.status(200).send({
//             status: 'ok',
//             message: 'Profile rechazado correctamente',
//             skills: profileStatus,
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// export { createAdmin, rejectCompany, acceptCompany };
