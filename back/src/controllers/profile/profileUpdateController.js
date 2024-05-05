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
        const { register_id } = req.user;
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
        if (req.files && req.files.avatar) {
            console.log(req.files);
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            console.log(__dirname);
            const uploadsDir = path.join(__dirname, '../uploadsAvatar');
            console.log(uploadsDir);
            await createPathIfNotExists(uploadsDir);
            const image = sharp(req.files.avatar.data);
            image.resize(500);
            imageFileName = `${nanoid(24)}.jpg`;
            console.log(imageFileName);
            await image.toFile(path.join(uploadsDir, imageFileName));
        }
        const {
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            avatar,
            profile_role,
            company_name,
        } = profile;
        console.log(profile);
        const updateProfile = await updateProfileModel(
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            imageFileName,
            profile_role,
            company_name,
            req.userId
        );
        console.log(updateProfile);
        res.status(201).send({
            status: 'ok',
            message: 'update profile in db',
            data: {
                profile: {
                    profileId: updateProfile,
                    profile_name,
                    profile_lastname,
                    birthdate,
                    profile_username,
                    avatar,
                    profile_role,
                    company_name,
                    userId: req.userId,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
export { updateProfileController };
