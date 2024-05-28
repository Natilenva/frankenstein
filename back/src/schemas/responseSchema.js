import { z } from 'zod';

const responseSchema = z.object({
    response_text: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(100000000, 'Máximo 200 caracteres'),
});
export { responseSchema };
