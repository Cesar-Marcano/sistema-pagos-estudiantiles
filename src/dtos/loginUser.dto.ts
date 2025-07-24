import { z } from "zod";
import { i18n } from "../lang/i18n";

export const LoginUserSchema = z.object({
  username: z
    .string()
    .min(3, i18n`errors.validation.username.min(${3})`)
    .max(20, i18n`errors.validation.username.max(${20})`)
    .regex(/^[a-zA-Z0-9_]+$/, i18n`errors.validation.username.regex`),
  password: z
    .string()
    .min(8, i18n`errors.validation.password.min(${8})`)
    .max(100, i18n`errors.validation.password.max(${100})`)
    .regex(/[A-Z]/, i18n`errors.validation.password.uppercase`)
    .regex(/[a-z]/, i18n`errors.validation.password.lowercase`)
    .regex(/[0-9]/, i18n`errors.validation.password.number`)
    .regex(/[^a-zA-Z0-9]/, i18n`errors.validation.password.specialChar`),
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>;
