import { z } from "zod";

const PASSWORD_ERROR_MESSAGE =
  "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial";

export const registerSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .trim()
    .min(1, "Nome é obrigatório"),
  email: z.string({ message: "E-mail é obrigatório" }).email("E-mail inválido"),
  utype: z.string({ message: "Tipo de cadastro é obrigatório" }),
  password: z
    .string({ message: PASSWORD_ERROR_MESSAGE })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      PASSWORD_ERROR_MESSAGE
    ),
  passwordConfirmation: z
    .string({ message: PASSWORD_ERROR_MESSAGE })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      PASSWORD_ERROR_MESSAGE
    ),
});
