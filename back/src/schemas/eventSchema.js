import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
const eventSchema = z.object({
    event_title: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(100, 'Máximo 100 caracteres'),

    event_description: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(500, 'Máximo 500 caracteres'),
    place: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(500, 'Máximo 500 caracteres'),
    event_photo: z.any(),

    // .refine(
    //     (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
    //     'Solo se aceptan los formatos jpeg, jpg, png'
    // ),

    event_url: z.string().url(),
});
export { eventSchema };
