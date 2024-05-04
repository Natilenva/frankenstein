import { z } from 'zod';

const skillSchema = z.object({
    skill: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido y no repitas el Skill',
        })
        .min(2, 'Mínimo 2 caracteres')
        .max(90, 'Máximo 90 caracteres'),
    description: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido y no repitas el Skill',
        })
        .min(2, 'Mínimo 2 caracteres')
        .max(90, 'Máximo 90 caracteres'),
});
export { skillSchema };
