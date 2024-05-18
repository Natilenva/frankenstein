import { selectRegisterCodeModel } from '../../models/users/selectRegisterCodeModel.js';
import { updateRegistrationCodeActiveModel } from '../../models/users/updateRegistrationCodeActiveModel.js';
const validateUserController = async (req, res, next) => {
    const { registrationCode } = req.params;
    try {
        const [user] = await selectRegisterCodeModel(registrationCode);
        await updateRegistrationCodeActiveModel(user);
        return res.send('Usuario validado');
    } catch (error) {
        next(error);
    }
};
export { validateUserController };
