import { PrismaClient } from "@prisma/client";
import { SettingsKeys } from "../config/settings";

export class SettingsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async setConfig(name: SettingsKeys, value: string) {
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

  public async getConfig(name: SettingsKeys, defaultValue?: string) {
    return (
      (await this.prisma.setting.findUnique({
        where: {
          name,
        },
      })) ?? defaultValue
    );
  }
}
