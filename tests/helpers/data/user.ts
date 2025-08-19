import { User } from "../../../src/core/domain/user.model";

export const sampleUserData = {
  email: "my.test.email@email.com",
  password: "somePasswordLol123+",
  name: "Test User",
  username: "test_user",
};

export const testNewUser = () =>
  User.create(
    1,
    sampleUserData.username,
    sampleUserData.name,
    sampleUserData.password,
    sampleUserData.email,
    1
  );

export const testDbUser = () => {
  const now = new Date();

  return new User(
    1,
    sampleUserData.username,
    sampleUserData.name,
    sampleUserData.password,
    sampleUserData.email,
    1,
    now,
    now,
    null,
    1
  );
};
