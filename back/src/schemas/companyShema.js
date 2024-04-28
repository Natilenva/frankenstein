import { z } from 'zod';

const companySchema = z.object({
    company_name: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(2, 'Mínimo 2 caracteres')
        .max(90, 'Máximo 90 caracteres'),

});
export { companySchema };
