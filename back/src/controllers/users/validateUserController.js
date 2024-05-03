import { selectRegisterCodeModel } from '../../models/users/selectRegisterCodeModel.js';
import { updateRegistrationCodeActiveModel } from '../../models/users/updateRegistrationCodeActiveModel.js';
const validateUserController = async (req, res, next) => {
    const { registrationCode } = req.params;
    try {
        const [user] = await selectRegisterCodeModel(registrationCode);
        await updateRegistrationCodeActiveModel(user);
        return res.send('<h1>Usuario validado correctamente</h1>');
    } catch (error) {
        next(error);
    }
};
export { validateUserController };
