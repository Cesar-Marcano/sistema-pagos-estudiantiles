import { settings as settingsService } from "../app/instances/settings";

let settings = {
  lang: "en",
};

export async function loadSettings() {
  settings.lang = (await settingsService.getConfig("lang", settings.lang))!;
}

export { settings };
