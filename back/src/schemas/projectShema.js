import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
const projectSchema = z.object({
    project_title: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(100, 'Máximo 100 caracteres'),

    project_description: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(500, 'Máximo 500 caracteres'),
    project_photo: z.any(),

    // .refine(
    //     (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
    //     'Solo se aceptan los formatos jpeg, jpg, png'
    // ),

    project_url: z.string().url(),
});
export { projectSchema };
