import { PrismaClient } from "@prisma/client";
import { SettingsService } from "../../../src/services/settings.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { sampleSetting } from "../../helpers/data/settings.data";

describe("SettingsService", () => {
  let prisma: PrismaClient;
  let settingsService: SettingsService;

  beforeEach(() => {
    prisma = createMockPrisma(["setting"], {
      setting: {
        upsert: jest.fn().mockResolvedValue(sampleSetting),
        findUnique: jest.fn().mockResolvedValue(sampleSetting),
      },
    });
    settingsService = new SettingsService(prisma);
  });

  it("should get a setting", async () => {
    const setting = await settingsService.getConfig("lang", "something");

    expect(setting).toEqual(sampleSetting.value);
  });

  it("should get a default setting", async () => {
    (prisma.setting.findUnique as jest.Mock) = jest
      .fn()
      .mockResolvedValue(null);

    const setting = await settingsService.getConfig("lang", "something");

    expect(setting).toEqual("something");
  });

  it("should set a setting", async () => {
    const setting = await settingsService.setConfig("lang", "en");

    expect(setting).toEqual(sampleSetting);
    expect(prisma.setting.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          name: "lang",
        },
        update: {
          value: "en",
        },
        create: expect.objectContaining({
          name: "lang",
          value: "en",
        }),
      })
    );
  });
});
