import { DEFAULT_LANG } from "../config/envVariables";
import { englishTranslations } from "./languages/en";
import { spanishTranslations } from "./languages/sp";

const langs = {
  en: englishTranslations,
  es: spanishTranslations,
};

export function i18n(strings: TemplateStringsArray, ...values: any[]): string {
  const input = strings[0].trim();

  const match = input.match(/^([\w.]+)(?:\((.*)\))?$/);

  if (!match) {
    throw new Error("Invalid format: should be key(args)");
  }

  const key = match[1];
  const argsString = match[2];

  let args: any[] = [];

  if (argsString) {
    try {
      args = new Function(`return [${argsString}];`)();
    } catch {
      throw new Error("Error while parsing args");
    }
  }

  const translations = langs[DEFAULT_LANG];

  const template = translations[key];

  if (!template) {
    throw new Error(`Translation for ${key} does not exist`);
  }

  const result = template.replace(/\{(\d+)\}/g, (_, index) => {
    const i = Number(index);
    return args[i] !== undefined ? args[i] : `{${i}}`;
  });

  return result;
}
