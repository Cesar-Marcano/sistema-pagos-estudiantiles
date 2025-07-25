import { z } from "zod";
import { i18n } from "../lang/i18n";

export const UpdateParentSchema = z.object({
  fullname: z
    .string()
    .min(1, i18n`errors.validation.fullname.empty`)
    .max(100, i18n`errors.validation.fullname.max(${100})`)
    .optional(),

  document: z
    .string()
    .min(6, i18n`errors.validation.document.min(${6})`)
    .max(30, i18n`errors.validation.document.max(${30})`)
    .optional(),

  phoneNumber: z
    .string()
    .min(7, i18n`errors.validation.phoneNumber.min(${7})`)
    .max(20, i18n`errors.validation.phoneNumber.max(${20})`)
    .optional()
    .or(z.literal("").transform(() => undefined)),

  email: z
    .email(i18n`errors.validation.email.invalid`)
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export type UpdateParentDto = z.infer<typeof UpdateParentSchema>;
