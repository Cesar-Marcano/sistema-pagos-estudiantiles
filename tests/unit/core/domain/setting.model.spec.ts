import { Setting } from "../../../../src/core/domain/setting.model";

describe("Setting model", () => {
  let setting: Setting;
  let settingFromDB: Setting;

  beforeEach(() => {
    setting = Setting.create("theme", "dark");
    settingFromDB = new Setting("language", "en", 1);
  });

  describe("Setting creation", () => {
    it("should create a new setting with valid properties", () => {
      expect(setting.name).toBe("theme");
      expect(setting.value).toBe("dark");
      expect(setting.id).toBeUndefined();
    });

    it("should throw an error if created with empty value", () => {
      expect(() => Setting.create("theme", "")).toThrow("Empty setting value");
      expect(() => Setting.create("theme", "   ")).toThrow(
        "Empty setting value"
      );
    });
  });

  describe("Setting from DB", () => {
    it("should have db data", () => {
      expect(settingFromDB.id).toBe(1);
      expect(settingFromDB.name).toBe("language");
      expect(settingFromDB.value).toBe("en");
    });
  });

  describe("Updating setting value", () => {
    it("should update the value when valid", () => {
      const updated = setting.updateValue("light");
      expect(updated).toBe(setting); // fluent API
      expect(setting.value).toBe("light");
    });

    it("should trim the new value", () => {
      setting.updateValue("  compact  ");
      expect(setting.value).toBe("compact");
    });

    it("should throw an error when updating to an empty value", () => {
      expect(() => setting.updateValue("")).toThrow("Empty setting value");
      expect(() => setting.updateValue("   ")).toThrow("Empty setting value");
    });
  });
});
