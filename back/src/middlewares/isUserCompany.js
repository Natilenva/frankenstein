import { generateError } from "../helpers/generateError.js";
import selectProfileByModel from "../models/profile/selectProfileByModel.js";

async function isUserCompany(req, res, next) {
  try {

    //* GET profile_role from profile 
    const profile = await selectProfileByModel(req.userId);

    // si el rol del usuario no es 'company'
    if (profile.profile_role !== 'company') {
      throw generateError('No tienes permisos para hacer esta petición.', 403);
    }

    next();
  } catch (error) {
    // Manejar errores asíncronos y enviar respuesta?
    next(error);
  }
}

export { isUserCompany };
