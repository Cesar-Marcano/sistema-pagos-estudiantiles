import { Setting } from "../../../domain/setting.model";

export interface ISettingRepository {
  upsert(setting: Setting): Promise<Setting>;

  findByName(name: string): Promise<Setting>;
}
