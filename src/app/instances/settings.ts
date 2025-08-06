import { SettingsService } from "../../services/settings.service";
import { prisma } from "./prisma";

export const settings = new SettingsService(prisma);
