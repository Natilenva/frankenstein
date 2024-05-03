// import { selectRegisterCodeModel } from '../../models/users/selectRegisterCodeModel.js';
// import { updateRegistrationCodeActiveModel } from '../../models/users/updateRegistrationCodeActiveModel.js';
// const validateUserController = async (req, res, next) => {
//     const { registrationCode } = req.params;
//     try {
//         const [user] = await selectRegisterCodeModel(registrationCode);
//         await updateRegistrationCodeActiveModel(user);
//         return res.send('<h1>Usuario validado correctamente</h1>');
//     } catch (error) {
//         next(error);
//     }
// };
// export { validateUserController };

import getConnection from '../../db/getConnection.js';

const validateUserController = async (req, res, next) => {
    const { registrationCode } = req.params;
    let connection;
    try {
        connection = await getConnection();
        const [user] = await connection.query(
            `
        SELECT * FROM register WHERE register_code = ?
        `,
            [registrationCode]
        );
        console.log(user);
        if (user.length === 0) {
            return res.send(
                '<h1>El usuario no existe o ya ha sido validado</h1>'
            );
        }
        await connection.query(
            `
        UPDATE register SET register_code = NULL, active = true  WHERE register_id = ?
        `,
            [user[0].register_id]
        );

        return res.send('<h1>Usuario validado correctamente</h1>');
    } catch (error) {
        next(error);
    }
};
export { validateUserController };
