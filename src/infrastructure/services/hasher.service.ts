import bcrypt from "bcryptjs";
import { IHasherService } from "../../core/ports/out/services/hasher.service.port";

export class HasherService implements IHasherService {
  constructor(private saltRounds = 10) {}

  async hash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (e) {
      throw new Error(`HasherService.hash failed: ${e}`);
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
