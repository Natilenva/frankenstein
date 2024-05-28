import { z } from 'zod';

const questionSchema = z.object({
    question_title: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(200, 'Máximo 200 caracteres'),

    question_description: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(200, 'Máximo 200 caracteres'),

    technology: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            //required_error: 'Campo requerido',
        })
        .min(0, 'Mínimo 0 caracteres')
        .max(200, 'Máximo 200 caracteres'),
});
export { questionSchema };
