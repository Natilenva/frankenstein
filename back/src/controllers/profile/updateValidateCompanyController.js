import { selectProfileIdCompanyModel } from '../../models/profile/selectProfileIdCompanyModel.js';
import { updateCompanyActiveModel } from '../../models/profile/updateCompanyActiveModel.js';
const updateValidateCompanyController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [company] = await selectProfileIdCompanyModel(id);
        console.log(company);
        await updateCompanyActiveModel(company);
        return res.send('Empresa validada');
    } catch (error) {
        next(error);
    }
};
export { updateValidateCompanyController };
