import { Email } from "../../../src/core/datavalues/email.datavalue";
import { Password } from "../../../src/core/datavalues/password.datavalue";
import { Username } from "../../../src/core/datavalues/username.datavalue";
import { User } from "../../../src/core/domain/user.model";
import { IHasherService } from "../../../src/core/ports/out/services/hasher.service.port";

export const sampleUserData = {
  email: new Email("test@test.com"),
  password: "somePasswordLol123+",
  name: "Test User",
  username: new Username("something"),
};

export const testNewUser = async (IHasherService: IHasherService) => {
  const password = await Password.create(
    sampleUserData.password,
    IHasherService
  );

  return User.create(
    1,
    sampleUserData.username,
    sampleUserData.name,
    password,
    sampleUserData.email,
    1
  );
};

export const testDbUser = () => {
  const now = new Date();

  return new User(
    1,
    sampleUserData.username,
    sampleUserData.name,
    Password.fromHash("hashedPassword"),
    sampleUserData.email,
    1,
    now,
    now,
    null,
    1
  );
};
