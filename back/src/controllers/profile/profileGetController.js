// import { updateRegister } from '../../models/profile/insertProfileByModel.js';
import selectProfileByModel from '../../models/profile/selectProfileByModel.js';

const profileGetController = async (req, res, next) => {
    try {
        const profile_id = req.params;
        console.log(profile_id.id);

        const profileId = await selectProfileByModel(profile_id.id);
        res.send({
            status: 'ok',
            data: profileId,
        });
        console.log(profileId);
    } catch (error) {
        next(error);
    }
};

// const acceptCompanyProfile = async (req, res, next) => {
//     try {
//         const profile_id = req.params;
//         console.log(profile_id.id);

//         const profileId = await selectProfileByModel(profile_id.id);
//         await updateRegister(id);
//         res.send({
//             status: 'ok',
//             data: profileId,
//         });
//         console.log(profileId);
//     } catch (error) {
//         next(error);
//     }
// };
export { profileGetController };
