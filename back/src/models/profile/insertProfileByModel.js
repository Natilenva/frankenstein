import getConnection from '../../db/getConnection.js';
import { sendEmail } from '../../helpers/sendEmail.js';
const { PORTFRONT, ADMIN_EMAIL } = process.env;
const insertProfileByModel = async (
    imageFileName,
    profile_name,
    profile_lastname,
    profile_username,
    birthdate,
    profile_role,
    company_name,
    userId
) => {
    let connection;
    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
            INSERT INTO profile (avatar, profile_name, profile_lastname, profile_username, birthdate, profile_role, register_id) VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                imageFileName,
                profile_name,
                profile_lastname,
                profile_username,
                birthdate,
                profile_role,
                userId,
            ]
        );
        if (profile_role === 'company') {
            await connection.query(
                `INSERT INTO companies (company_name,
                register_id)
                VALUES (?,?)
            `,
                [company_name, userId]
            );
        }

        console.log(result);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
};
const validateProfileRole = async (profile_role, company_name, userId) => {
    let connection;
    try {
        if (profile_role === 'company') {
            connection = await getConnection();
            const [result] = await connection.query(
                `SELECT email FROM register  WHERE register_id = ?`,
                [userId]
            );
            console.log(
                result.length > 0
                    ? 'Email Empresa: ' + result[0].email
                    : 'Sin resultados del perfil'
            );

            await envioMailNotificacionAgentes(
                result[0].email,
                company_name,
                userId
            );

            return result.length > 0
                ? 'Perfil creado: en breve uno de nuestros agentes se pondra en contacto con usted, para la verificación de datos de empresa'
                : 'No se ha podido validar su email, actualicelo antes de continuar';
        } else {
            return 'Perfil creado';
        }
    } catch (error) {
        console.error(error.message);
    }
};
const envioMailNotificacionAgentes = async (email, company_name, userId) => {
    const subject = 'Notificación de nueva empresa!';
    const content = `
         <h1>¡Notificación nuevo perfil empresa</h1>
         <p>Se ha registrado us usuario con codigo ${userId}, como representante de ${company_name}</p>
         <p>Su correo electronico es ${email}</p>
         <p>Para confirmar cuenta:
        <a href="${PORTFRONT}/admin/validate/${userId}">Validar</a></p>
        <p>Para rechazar cuenta:
        <a href="${PORTFRONT}/admin/reject/${userId}">rechazar</a></p>
        `;
    // enviamos el email para activar cuenta
    await sendEmail(ADMIN_EMAIL, subject, content);
};
// const acceptCompanyProfile = async (userId) => {
//     try {
//         updateRegister(userId);
//         console.log('Empresa validada, para el usuario: ' + userId);

//         // Se enviara correo de aceptacion al usuario
//         //await envioMailNotificacionUsuario(userId);

//         return true;
//     } catch (error) {
//         console.error(error.message);
//     }
// };
// const rejectCompanyProfile = async (userId) => {
//     try {
//         updateRegister(userId, false);
//         console.log('Empresa rechasada, para el usuario: ' + userId);

//         // Se enviara correo de aceptacion al usuario
//         //await envioMailNotificacionUsuario(userId);

//         return true;
//     } catch (error) {
//         console.error(error.message);
//     }
// };
// const updateRegister = async (userId) => {
//     let connection;
//     try {
//         connection = await getConnection();
//         await connection.query(
//             `UPDATE profile SET is_company_validated = true where register_id = ?`,
//             [userId]
//         );
//         console.log(
//             result.length > 0
//                 ? 'Empresa en estado: ' + is_company_validated
//                 : 'Sin resultados del perfil'
//         );

//         // Se enviara al usuario correo de aceptación
//         //await envioMailNotificacionUsuario();

//         return result.length > 0
//             ? 'Perfil creado: en breve uno de nuestros agentes se pondra en contacto con usted, para la verificación de datos de empresa'
//             : 'No se ha podido validar su email, actualicelo antes de continuar';
//     } catch (error) {
//         console.error(error.message);
//     }
// };

export {
    insertProfileByModel,
    validateProfileRole,
    // acceptCompanyProfile,
    // rejectCompanyProfile,
    // updateRegister,
    envioMailNotificacionAgentes,
};
