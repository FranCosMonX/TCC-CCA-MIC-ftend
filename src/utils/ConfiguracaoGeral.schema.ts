import { z } from 'zod'

export const ConfigGeralSchema = z.object({
    diretorio: z.string()
      .min(2, {error: 'O campo deve conter uma URI.'}),
    apiKey: z.string()
      .min(1, {error: 'O campo deve conter uma chave válida para acessar os recursos da AI selecionada.'})
  })
  .required()

export type ConfigGeralFormData = z.infer<typeof ConfigGeralSchema>