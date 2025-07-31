import { z } from "zod";
import { i18n } from "../../lang/i18n";

export const UpdateGradeSchema = z.object({
  name: z
    .string()
    .min(1, i18n`errors.validation.name.empty`)
    .max(100, i18n`errors.validation.name.max(${100})`)
    .optional(),

  description: z
    .string()
    .max(255, i18n`errors.validation.description.max(${255})`)
    .optional()
    .or(z.literal("").transform(() => null)),

  hasLevels: z.boolean().optional(),

  maxLevel: z
    .number()
    .int(i18n`errors.validation.maxLevel.invalid`)
    .positive(i18n`errors.validation.maxLevel.positive`)
    .optional()
    .or(z.literal(null).transform(() => null)),

  fee: z
    .number()
    .nonnegative(i18n`errors.validation.fee.nonnegative`)
    .optional(),
});

export type UpdateGradeDto = z.infer<typeof UpdateGradeSchema>;
