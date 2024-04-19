import { z } from 'zod';

const userSchema = z.object({
    name: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 10 caracteres'),
    lastname: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 20 caracteres'),
    birthdate: z.coerce.date('Formato no válido'),

    email: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .email('No es un email válido'),
    username: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 20 caracteres'),
    password: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 20 caracteres'),
});

export { userSchema };
