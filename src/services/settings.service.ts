import { PrismaClient } from "@prisma/client";
import { settings } from "../config/settings";

export class SettingsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async setConfig(name: keyof typeof settings, value: string) {
    return await this.prisma.setting.upsert({
      where: {
        name,
      },
      create: {
        name,
        value,
      },
      update: {
        value,
      },
    });
  }

  public async getConfig(name: keyof typeof settings, defaultValue: string | null = null) {
    return (
      (await this.prisma.setting.findUnique({
        where: {
          name,
        },
      }))?.value ?? defaultValue
    );
  }
}
