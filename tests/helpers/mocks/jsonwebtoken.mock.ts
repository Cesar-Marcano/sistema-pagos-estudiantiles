import jwt from "jsonwebtoken";
import { UserPayload } from "../../../src/shared/interfaces/tokenPayload";

const mockUserPayload: UserPayload = {
  id: 1,
  jti: "mocked-jti",
  role: "ADMIN",
  username: "foo_bar123",
  name: "Foo Bar",
};

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mocked.jwt.token"),
  verify: jest.fn(() => mockUserPayload),
}));

export const jwtMock = jwt as jest.Mocked<typeof jwt>;
export { mockUserPayload };
