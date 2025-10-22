import { z } from 'zod'

export const ConfigGeralSchema = z.object({
    diretorio: z.string()
      .min(2, {error: 'O campo deve conter uma URI.'}),
    nomeDoProjeto: z.string()
      .min(3, {error: 'O campo não pode estar vazio ou ter menos de 3 caracteres'})
  })
  .required()

export type ConfigGeralFormData = z.infer<typeof ConfigGeralSchema>