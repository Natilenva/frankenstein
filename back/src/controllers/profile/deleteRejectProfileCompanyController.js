import { selectProfileIdCompanyModel } from '../../models/profile/selectProfileIdCompanyModel.js';
import { deleteProfileCompanyModel } from '../../models/profile/deleteProfileCompanyModel.js';
const { PORTFRONT } = process.env;
import { sendEmail } from '../../helpers/sendEmail.js';
const deleteRejectProfileCompanyController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const [company] = await selectProfileIdCompanyModel(id);
        console.log('empresa', company);
        const { email, company_name } = company;
        await deleteProfileCompanyModel(id);

        const subject = `${company_name} ha sido rechazada!`;
        const content = `
         <h1>¡${company_name} no podrá estar en Frankenstein!</h1>
         <p>Despues de nuestro porceso de validación su empresa ha sido rechazada para estar dentro de nuestra red solcial, lo lamentamos mucho pero nuestros procesos de admisión son muy rigurosos. Podrá hacer un perfil con otro rol. 
         <p>Entra y comparte con toda la comunidad:
        <a href="${PORTFRONT}/">Disfrute de nuestra web</a></p>

        `;

        await sendEmail(email, subject, content);
        return res.send('Perfil Eliminado');
    } catch (error) {
        next(error);
    }
};

export { deleteRejectProfileCompanyController };
