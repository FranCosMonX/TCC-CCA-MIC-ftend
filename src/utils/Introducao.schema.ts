import { z } from "zod"

export const IntroducaoSchema = z.object({
  apelido: z.string()
    .min(2, {error: 'Informe um apelido válido'})
  })
  .required()

export type IntroducaoFormData = z.infer<typeof IntroducaoSchema>