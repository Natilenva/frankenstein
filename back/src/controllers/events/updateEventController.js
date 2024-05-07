import { eventSchema } from '../../schemas/eventSchema.js';
import { updateEventModel } from '../../models/events/updateEventModel.js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';
const updateEventController = async (req, res, next) => {
    try {
        const { event_id } = req.params;
        const { success, data: event, error } = eventSchema.safeParse(req.body);
        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }

        let imageFileName;
        if (req.files && req.files.event_photo) {
            console.log(req.files);
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            console.log(__dirname);
            const uploadsDir = path.join(__dirname, '../../../uploads');
            console.log(uploadsDir);
            await createPathIfNotExists(uploadsDir);
            const image = sharp(req.files.event_photo.data);
            image.resize(500);
            imageFileName = `${nanoid(24)}.jpg`;
            console.log(imageFileName);
            await image.toFile(path.join(uploadsDir, imageFileName));
        }
        const {
            event_title,
            event_description,
            place,
            event_photo,
            event_url,
        } = event;

        const updateEvent = await updateEventModel(
            event_title,
            event_description,
            place,
            imageFileName,
            event_url,
            event_id
        );

        res.status(201).send({
            status: 'ok',
            message: 'update event in db',
            data: {
                event: {
                    event_title,
                    event_description,
                    place,
                    event_photo,
                    event_url,
                    event_id,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
export { updateEventController };
