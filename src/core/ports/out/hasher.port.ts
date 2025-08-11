export interface IHasherService {
  hashPassword(password: string): Promise<string>;

  comparePassword(password: string, hash: string): Promise<boolean>;
}
