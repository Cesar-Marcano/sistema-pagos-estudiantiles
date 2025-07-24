import { DEFAULT_LANG } from "../config/envVariables";
import { englishTranslations } from "./languages/en";
import { spanishTranslations } from "./languages/sp";

const langs = {
  en: englishTranslations,
  sp: spanishTranslations,
};

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
  const argString = match[2];

  const translations = langs[DEFAULT_LANG];

  const template = translations[key];

  if (!template) {
    throw new Error(`Translation for ${key} does not exist`);
  }

  const result = template.replace(/\{(\d+)\}/g, (_, index) => {
    const i = Number(index);
    return values[i] !== undefined ? values[i] : `{${i}}`;
  });

  return result;
}
