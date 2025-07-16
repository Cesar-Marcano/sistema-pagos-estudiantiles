import { z } from "zod";

export const CreateSuperUserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres.")
    .max(20, "El nombre de usuario no puede exceder los 20 caracteres.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "El nombre de usuario solo puede contener letras, números y guiones bajos."
    ),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(100, "La contraseña no puede exceder los 100 caracteres.")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula.")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula.")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número.")
    .regex(
      /[^a-zA-Z0-9]/,
      "La contraseña debe contener al menos un carácter especial (por ejemplo: !@#$%^&*)."
    ),
  name: z
    .string()
    .min(1, "El nombre no puede estar vacío.")
    .max(100, "El nombre no puede exceder los 100 caracteres."),
});

export type CreateSuperUserDto = z.infer<typeof CreateSuperUserSchema>;
