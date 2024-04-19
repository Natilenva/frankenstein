import { z } from 'zod';

const loginSchema = z.object({
    email: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .email('No es un email válido'),

    password: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 20 caracteres'),
});

export { loginSchema };
