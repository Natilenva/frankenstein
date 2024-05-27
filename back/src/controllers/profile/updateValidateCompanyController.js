import { selectProfileIdCompanyModel } from '../../models/profile/selectProfileIdCompanyModel.js';
import { updateCompanyActiveModel } from '../../models/profile/updateCompanyActiveModel.js';
const { PORTFRONT } = process.env;
import { sendEmail } from '../../helpers/sendEmail.js';
const updateValidateCompanyController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const [company] = await selectProfileIdCompanyModel(id);
        console.log('empresa', company);
        const { email, company_name } = company;
        await updateCompanyActiveModel(company);

        const subject = `${company_name} ya ha sido validada!`;
        const content = `
         <h1>¡Enhorabuena ${company_name} ya está en la red social Frankenstein!</h1>
         <p>Entra y comparte con toda la comunidad:
        <a href="${PORTFRONT}/">Comencemos</a></p>

        `;

        await sendEmail(email, subject, content);
        return res.send('Empresa validada');
    } catch (error) {
        next(error);
    }
};

export { updateValidateCompanyController };
