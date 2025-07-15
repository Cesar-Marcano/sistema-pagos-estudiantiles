import { z } from "zod";

export const AccessTokenSchema = z.object({
  refreshToken: z.jwt(),
});

export type AccessTokenDto = z.infer<typeof AccessTokenSchema>;
