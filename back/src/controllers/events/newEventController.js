import { zodErrorMap } from '../../helpers/zodError.js';
import { eventSchema } from '../../schemas/eventSchema.js';
import { insertEventModel } from '../../models/events/insertEventModel.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';

const newEventController = async (req, res, next) => {
    try {
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

        // validated fields
        const {
            event_title,
            event_description,
            place,
            event_photo,
            event_url,
        } = event;
        console.log(event);

        const id = await insertEventModel(
            event_title,
            event_description,
            place,
            imageFileName,
            event_url,
            req.userId
        );

        res.status(201).send({
            status: 'ok',
            message: 'insert event in db',
            data: {
                event: {
                    eventId: id,
                    event_title,
                    event_description,
                    place,
                    event_photo,
                    event_url,
                    userId: req.userId,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
export { newEventController };
