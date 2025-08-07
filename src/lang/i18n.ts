import { settings } from "../config/settings";
import { englishTranslations } from "./languages/en";
import { spanishTranslations } from "./languages/sp";

const langs = {
  en: englishTranslations,
  sp: spanishTranslations,
};

function getNested(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export function i18n(strings: TemplateStringsArray, ...values: any[]): string {
  let input = "";

  for (let i = 0; i < strings.length; i++) {
    input += strings[i];
    if (i < values.length) {
      input += `__VAL_${i}__`;
    }
  }

  const match = input.match(/^([\w.]+)(?:\((.*)\))?$/);

  if (!match) {
    throw new Error("Invalid format: should be key(args)");
  }

  const key = match[1];

  let lang: keyof typeof langs = "en";

  if (Object.keys(langs).includes(settings.lang)) {
    lang = settings.lang as keyof typeof langs;
  }

  const translations = langs[lang];

  const template = getNested(translations, key);

  if (!template) {
    throw new Error(`Translation for ${key} does not exist`);
  }

  const result = template.replace(/\{(\d+)\}/g, (_: string, index: string) => {
    const i = Number(index);
    return values[i] !== undefined ? values[i] : `{${i}}`;
  });

  return result;
}
