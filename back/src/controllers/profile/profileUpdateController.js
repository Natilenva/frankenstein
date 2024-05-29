import { profileSchema } from '../../schemas/profileSchema .js';
import { updateProfileModel } from '../../models/profile/updateProfileModel.js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';
const updateProfileController = async (req, res, next) => {
    try {
        // const { register_id } = req.user;
        const {
            success,
            data: profile,
            error,
        } = profileSchema.safeParse(req.body);
        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }

        let imageFileName;
        console.log(req.files);
        if (req.files && req.files.avatar) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const uploadsDir = path.join(__dirname, '../../../uploads');
            await createPathIfNotExists(uploadsDir);
            const image = sharp(req.files.avatar.data);
            image.resize(300);
            imageFileName = `${nanoid(24)}.jpg`;
            await image.toFile(path.join(uploadsDir, imageFileName));
        }
        const {
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,

            profile_role,
            company_name,
        } = profile;

        console.log(profile);
        await updateProfileModel(
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            imageFileName,
            profile_role,
            company_name,
            req.userId
        );

        res.status(201).send({
            status: 'ok',
            message: 'update profile in db',
            data: {
                profile: {
                    profile_name,
                    profile_lastname,
                    birthdate,
                    profile_username,
                    avatar: imageFileName,
                    profile_role,
                    company_name,

                    register_id: req.userId,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
export { updateProfileController };
