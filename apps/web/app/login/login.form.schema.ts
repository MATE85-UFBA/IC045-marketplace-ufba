import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type LoginUserFormData = z.infer<typeof loginFormSchema>;