import { z } from 'zod';
const registerSchema = z.object({
    email: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .email('No es un email válido'),
    register_password: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 30 caracteres'),
});

export { registerSchema };