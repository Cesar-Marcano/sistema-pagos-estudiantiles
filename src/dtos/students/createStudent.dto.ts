import { z } from "zod";
import { i18n } from "../../lang/i18n";
import { StudentStatus } from "@prisma/client";

export const CreateStudentSchema = z.object({
  fullname: z
    .string()
    .min(1, i18n`errors.validation.fullname.empty`)
    .max(100, i18n`errors.validation.fullname.max(${100})`),

  birthday: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: i18n`errors.validation.birthday.invalid`,
  }),

  gradeId: z.number(),

  section: z
    .string()
    .max(50, i18n`errors.validation.section.max(${50})`)
    .optional()
    .or(z.literal("").transform(() => undefined)),

  document: z
    .string()
    .min(6, i18n`errors.validation.document.min(${6})`)
    .max(30, i18n`errors.validation.document.max(${30})`)
    .optional()
    .or(z.literal("").transform(() => undefined)),

  status: z
    .enum(StudentStatus)
    .optional()
    .default(StudentStatus.ACTIVE),

  parentId: z
    .number()
    .optional()
    .or(z.literal(null).transform(() => undefined)),
});

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>;
